# Neyvia PDF Studio

Neyvia PDF Studio is an interactive PDF workspace shared by a human operator
and an AI agent. It is packaged as an independent
[MCP App](https://modelcontextprotocol.io/extensions/apps/overview), so the
viewer can render inside compatible hosts while structured operations remain
available to agents.

This repository deliberately packages the maintained official MCP Apps PDF
server instead of forking its viewer. Neyvia owns the product manifest,
version pin, runtime entry point, tests, and Marketplace lifecycle; the PDF
rendering and annotation engine stays aligned with the upstream implementation.

## Capabilities

- Interactive PDF.js viewer with host theme and fullscreen support.
- Agent navigation, search, text extraction, screenshots, annotations,
  form filling, and save actions.
- Chunked PDF transfer for hosts with tool-response size limits.
- Local access bounded to explicit client roots.
- Writes bounded to a writable mounted root and an explicit save action.
- No credential requirement.

## Run

Node 22.22.3 or newer is required.

```bash
npm install
npx neyvia-pdf-app --stdio
```

Neyvia Marketplace reads [`.neyvia/app.json`](.neyvia/app.json). Other MCP
clients can launch the same stdio command:

```json
{
  "mcpServers": {
    "neyvia-pdf": {
      "command": "npx",
      "args": ["-y", "neyvia-app-pdf", "--stdio"]
    }
  }
}
```

## Verify

```bash
npm ci
npm test
npm run pack:check
```

The integration test starts the real server, completes an MCP handshake, and
checks the five PDF operations. It does not substitute a mock server.

## Upstream

The runtime is pinned to
[`@modelcontextprotocol/server-pdf@1.7.5`](https://www.npmjs.com/package/@modelcontextprotocol/server-pdf),
from the official
[`modelcontextprotocol/ext-apps`](https://github.com/modelcontextprotocol/ext-apps/tree/main/examples/pdf-server)
repository. See [NOTICE.md](NOTICE.md) for attribution.
