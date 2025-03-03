# LLM Debug Proxy

**LLM Debug Proxy** is a proxy designed for debugging LLM requests. It forwards requests to your LLM of choice (OpenAI, Llama), logs full request and response bodies (including streaming responses and tool calls), and displays useful debugging information.

> **Note:** This project is intended for debugging and development only. It is not optimized for production use.

## Installation

1. **Clone the repository:**

```sh
git clone https://github.com/elastic/llm-debug-proxy.git
cd llm-debug-proxy
npm install
```

## Usage

### Start proxy

```sh
npm start
```

Use `raw` argument to see raw responses:
```
npm start -- --raw
```

### Send requests to the proxy

The proxy listens on port 3000 by default. To forward a request to a target endpoint, include the URL-encoded target URL as a query parameter `target_url`

```sh
curl http://localhost:3000?target_url=http%3A%2F%2Flocalhost%3A11434%2Fapi%2Fchat -d '{
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
