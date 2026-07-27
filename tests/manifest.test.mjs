import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const manifestUrl = new URL("../.neyvia/app.json", import.meta.url);

test("manifest preserves the shared app boundary", async () => {
  const manifest = JSON.parse(await readFile(manifestUrl, "utf8"));

  assert.equal(manifest.kind, "app");
  assert.equal(manifest.audience, "shared");
  assert.match(manifest.sourceUrl, /^https:\/\/github\.com\//);
  assert.equal(manifest.standard, "mcp-apps/2026-01-26");
  assert.ok(manifest.surfaces.length > 0);
  assert.deepEqual(
    manifest.operations.map((operation) => operation.id),
    [
      "list_pdfs",
      "display_pdf",
      "interact",
      "read_pdf_bytes",
      "save_pdf",
    ],
  );
});
