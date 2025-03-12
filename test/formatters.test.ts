import express from 'express';
import { CliOptions } from '../src/cli';
import { formatResponseBody } from '../src/formatters';

describe('formatResponseBody', () => {
  let res: express.Response;

  beforeEach(() => {
    res = {
      getHeader: jest.fn(),
    } as unknown as express.Response;
  });

  test('returns raw response if cliOptions.raw is true', () => {
    const allResponseChunks = 'raw response';
    const cliOptions: CliOptions = { raw: true } as CliOptions;
    const result = formatResponseBody({ res, allResponseChunks, cliOptions });
    expect(result).toBe(allResponseChunks);
  });

  test('parses JSON response when not streamed', () => {
    (res.getHeader as jest.Mock).mockReturnValue('application/json');
    const allResponseChunks = '{"message": "Hello"}';
    const cliOptions: CliOptions = { raw: false } as CliOptions;
    const result = formatResponseBody({ res, allResponseChunks, cliOptions });
    expect(result).toBe(JSON.stringify({ message: 'Hello' }, null, 2));
  });

  test('returns raw response if JSON parsing fails', () => {
    (res.getHeader as jest.Mock).mockReturnValue('application/json');
    const allResponseChunks = 'invalid JSON';
    const cliOptions: CliOptions = { raw: false } as CliOptions;
    const result = formatResponseBody({ res, allResponseChunks, cliOptions });
    expect(result).toBe(allResponseChunks);
  });

  test('parses non-SSE chunked response', () => {
    (res.getHeader as jest.Mock).mockReturnValue('chunked');
    const allResponseChunks = 'line1\nline2\n{"message": {"content": "Hello"}}';
    const cliOptions: CliOptions = { raw: false } as CliOptions;
    const result = formatResponseBody({ res, allResponseChunks, cliOptions });
    expect(result).toBe('line1line2Hello');
  });

  test('parses SSE response and merges OpenAI chunks', () => {
    (res.getHeader as jest.Mock).mockReturnValue('text/event-stream');
    const allResponseChunks =
      'data: {"object": "chat.completion.chunk", "choices": [{"delta": {"content": "Hello"}}]}';
    const cliOptions: CliOptions = { raw: false } as CliOptions;
    const result = formatResponseBody({ res, allResponseChunks, cliOptions });
    expect(result).toBe(
      JSON.stringify({ content: 'Hello', tool_calls: [] }, null, 2),
    );
  });
});
