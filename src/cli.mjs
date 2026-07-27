#!/usr/bin/env node

import { spawn } from "node:child_process";
import process from "node:process";
import { fileURLToPath } from "node:url";

const upstreamModule = import.meta.resolve("@modelcontextprotocol/server-pdf");
const upstreamEntry = fileURLToPath(new URL("./index.js", upstreamModule));
const requestedArguments = process.argv.slice(2);
const hasTransport = requestedArguments.some(
  (argument) =>
    argument === "--stdio" ||
    argument === "--http" ||
    argument.startsWith("--port"),
);
const forwardedArguments = hasTransport
  ? requestedArguments
  : ["--stdio", ...requestedArguments];

const child = spawn(process.execPath, [upstreamEntry, ...forwardedArguments], {
  env: process.env,
  stdio: "inherit",
  windowsHide: true,
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    if (!child.killed) {
      child.kill(signal);
    }
  });
}

child.once("error", (error) => {
  console.error(`[neyvia-pdf-app] ${error.message}`);
  process.exitCode = 1;
});

child.once("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exitCode = code ?? 1;
});
