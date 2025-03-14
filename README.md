# LLM Debug Proxy

**LLM Debug Proxy** is a proxy designed for debugging LLM requests. It forwards requests to your LLM of choice (OpenAI, Llama), logs full request and response bodies (including streaming responses and tool calls), and displays useful debugging information.

> **Note:** This project is intended for debugging and development only. It is not optimized for production use.

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed, then install dependencies:

```sh
npm install
```

### Starting the Server

To start the server with default settings:

```sh
npm start
```

It will now be available for requests on http://localhost:3000. You can send requests to `http://localhost:3000?target_url=<LLM chat completion url>`

### Command-Line Options

You can modify the server behavior using the following options:

| Option         | Type    | Default | Description                                         |
|---------------|--------|---------|-----------------------------------------------------|
| `--raw`       | Boolean | `false` | Output raw response data instead of formatting it. |
| `--omit-tools` | Boolean | `false` | Omit the `tools` property from the request output. |

### Example Usage

Start the server and output raw response data:

```sh
npm start -- --raw
```

Start the server and omit the `tools` property from the request output:

```sh
npm start -- --omit-tools
```

### Send requests to the proxy

The proxy listens on port 3000 by default. To forward a request to an LLM, include the [URL-encoded](https://www.urlencoder.io/) target URL as a query parameter `target_url`

```sh
curl http://localhost:3000?target_url=http%3A%2F%2Flocalhost%3A11434%2Fv1%2Fchat%2Fcompletions -d '{
  "model": "llama3.2",
  "messages": [
    {
      "role": "user",
      "content": "Why is the sky blue?"
    }
  ],
  "stream": true
}'
```


