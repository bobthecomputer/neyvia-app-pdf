import assert from "node:assert/strict";
import process from "node:process";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

test("stdio runtime completes an MCP handshake and exposes PDF operations", async () => {
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: ["src/cli.mjs", "--stdio"],
    cwd: fileURLToPath(new URL("..", import.meta.url)),
    stderr: "pipe",
  });
  const client = new Client({
    name: "neyvia-pdf-app-test",
    version: "0.1.0",
  });

  try {
    await client.connect(transport);
    const response = await client.listTools();
    const toolNames = response.tools.map((tool) => tool.name);
    assert.ok(toolNames.includes("list_pdfs"));
    assert.ok(toolNames.includes("display_pdf"));
    assert.ok(toolNames.includes("interact"));
    assert.ok(toolNames.includes("read_pdf_bytes"));
    assert.ok(toolNames.includes("save_pdf"));
  } finally {
    await client.close();
  }
});
