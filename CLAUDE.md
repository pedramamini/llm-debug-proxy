# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LLM Debug Proxy is a Node.js proxy server for debugging OpenAI-compatible chat completions requests. It forwards requests to LLM providers (OpenAI, Llama, etc.), logs full request/response bodies including streaming responses and tool calls, and displays debugging information.

**Important**: This is a debugging/development tool only, not optimized for production use.

## Common Commands

```bash
# Start the development server
npm start

# Run tests
npm test

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## Architecture

### Core Components

- **src/index.ts**: Entry point that initializes CLI options and starts the server
- **src/api.ts**: Express server implementation with proxy logic
- **src/cli.ts**: CLI argument parsing using yargs
- **src/formatters.ts**: Request/response formatting utilities

### Key Features

- **Proxy Server**: Runs on port 3000, forwards requests to target URLs via `target_url` query parameter
- **Request Logging**: Captures and formats both request and response bodies
- **Streaming Support**: Handles streaming responses from LLM providers
- **CLI Options**: 
  - `--raw`: Output raw response data instead of formatting
  - `--tools`: Control tool information display (none/name/all)

### Request Flow

1. Client sends POST request to `http://localhost:3000?target_url=<encoded_llm_url>`
2. Proxy extracts target URL from query parameter
3. Forwards request to target LLM provider
4. Captures both request and response data
5. Logs formatted debugging information to console
6. Streams response back to client

## Technology Stack

- **Runtime**: Node.js with TypeScript
- **Web Framework**: Express.js
- **HTTP Handling**: Native Node.js http/https modules
- **CLI**: yargs for argument parsing
- **Testing**: Jest with ts-jest
- **Linting**: ESLint with TypeScript support

## Development Notes

- Uses URL encoding for target URLs in query parameters
- Supports both HTTP and HTTPS target endpoints
- Handles streaming responses via PassThrough streams
- Console output includes target URL, status codes, and formatted request/response bodies