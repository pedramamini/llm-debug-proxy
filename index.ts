import express, { Request, Response } from 'express';
import { request as httpsRequest } from 'https';
import { request as httpRequest } from 'http';
import { URL } from 'url';
import { PassThrough } from 'stream';
import type OpenAI from 'openai';
import { omit } from 'lodash';

const app = express();
const PORT = 3000;

app.post('/', (req: Request, res: Response) => {
  const targetUrlParam = req.query.target_url as string;
  const targetUrl = parseTargetUrl(targetUrlParam);
  if (!targetUrl) {
    res.status(400).send('Invalid target_url query parameter');
    return;
  }

  // Setup options for the outbound request
  const options = {
    method: req.method,
    headers: { ...req.headers, host: targetUrl.host },
  };

  // Create the outbound HTTPS request
  const request = targetUrl.protocol === 'https:' ? httpsRequest : httpRequest;
  const proxyReq = request(targetUrl, options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);

    let allResponseChunks = '';
    const responsePassThrough = new PassThrough();
    responsePassThrough.on('data', (chunk: Buffer) => {
      allResponseChunks += chunk.toString()
    });

    responsePassThrough.on('end', () => {
      console.log(`────────────────────────────────────────────────────
🌍  Target URL: ${targetUrl}
────────────────────────────────────────────────────\n`)
      const interceptorName = res.getHeader('Elastic-Interceptor')
      if (interceptorName) {
        console.log(`🚀  Interceptor: ${interceptorName || 'N/A'}`)
      }

      const { statusCode, statusMessage } = proxyRes;
      const statusIcon = statusCode !== 200 ? '❌️' : '✅️';
      console.log(`${statusIcon} ${statusCode} ${statusMessage}`);

      console.log(''); // Add a newline for readability
      console.log('===== Request Body =====');
      console.log(formatRequestBody(requestData), '\n');

      console.log(`===== Response Body =====`);
      console.log(formatResponseBody(res, allResponseChunks));
    });

    proxyRes.pipe(responsePassThrough).pipe(res);
  });

  proxyReq.on('error', (error) => {
    console.error('Proxy request error:', error);
    res.status(500).send('Error forwarding the request');
  });

  // Capture the request data
  const requestPassThrough = new PassThrough();
  let requestData = '';
  requestPassThrough.on('data', (chunk) => {
    requestData += chunk.toString();
  });

  req.pipe(requestPassThrough).pipe(proxyReq);
});

app.all('*', (req: Request, res: Response) => {
  console.log(`Hitting catch all route: ${req.method} ${req.path}`);
  res.send('Noting to see here. Try POST /chat/completions')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

interface UnvalidatedMessage {
  content: string;
  tool_calls: NonNullable<OpenAI.ChatCompletionChunk['choices'][0]['delta']['tool_calls']>;
}

type Delta = OpenAI.ChatCompletionChunk['choices'][0]['delta'];
export const mergeOpenAIChunks = (chunks: OpenAI.ChatCompletionChunk[]) => {
  const message = chunks.reduce<UnvalidatedMessage>(
    (prev, chunk) => {
      const delta = chunk.choices[0]?.delta ?? {};

      prev.content += delta?.content ?? '';
      delta.tool_calls?.forEach((toolCall) => {
        let prevToolCall = prev.tool_calls[toolCall.index];
        if (!prevToolCall) {
          prev.tool_calls[toolCall.index] = {
            function: {
              name: '',
              arguments: '',
            },
            index: 0,
            id: '',
          };

          prevToolCall = prev.tool_calls[toolCall.index];
        }

        // @ts-expect-error
        prevToolCall.function.name += toolCall.function.name ?? '';
        // @ts-expect-error
        prevToolCall.function.arguments += toolCall.function.arguments ?? '';
        prevToolCall.index += toolCall.index ?? '';
        prevToolCall.id += toolCall.id ?? '';
      });

      return prev;
    },
    { content: '', tool_calls: [] }
  );

  return message;
};

function parseTargetUrl(targetUrlParam: string | undefined) {
  if (!targetUrlParam) {
    console.log('target_url query parameter is required');    
    return;
  }

  const decodedUrl = decodeURIComponent(targetUrlParam);
  try {
    return new URL(decodedUrl);
  } catch (err) {
    console.log(`target_url query parameter is invalid: "${decodedUrl}"`);
    return;
  }
}

function formatResponseBody(res: express.Response, allResponseChunks: string) {
  const isStreamedResponse = res.getHeader('content-type') === 'text/event-stream' || res.getHeader('transfer-encoding') === 'chunked'
  if (!isStreamedResponse) {
    try {
      return JSON.stringify(JSON.parse(allResponseChunks), null, 2)
    } catch (e) {
      return allResponseChunks;
    }
  }

  const parsedChunks = allResponseChunks
    .split(/\r?\n/) // Handle both \n and \r\n
    .map(line => line.trim())
    .filter(line => line.startsWith('data:') && line !== 'data: [DONE]') // Filter out non-data and [DONE]
    .map(line => JSON.parse(line.slice(5).trim()));

  const isOpenAIChunk = parsedChunks.some(chunk => chunk.object === 'chat.completion.chunk' && chunk.choices)
  if (!isOpenAIChunk) {
    return JSON.stringify(parsedChunks, null, 2);
  }

  const mergedMessage = mergeOpenAIChunks(parsedChunks);
  return JSON.stringify(mergedMessage, null, 2);
}

function formatRequestBody(requestData: string) {
  const parsed = JSON.parse(requestData);
  return JSON.stringify(parsed, null, 2);
  // return JSON.stringify(omit(parsed, 'tools'), null, 2);
}