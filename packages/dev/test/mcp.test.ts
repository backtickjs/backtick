import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { it } from "node:test";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { startDevChannel } from "../dist/client.js";
import { supervise } from "../dist/supervisor.js";

const mcp = new URL("../dist/mcp.js", import.meta.url).pathname;
const fixture = new URL("fixtures/server.mjs", import.meta.url).pathname;

// An agent's client, starting `backtick-dev-mcp` as `.mcp.json` would.
async function agent(
  t: { after: (fn: () => unknown) => void },
  origin: string,
) {
  const client = new Client({ name: "test", version: "1.0.0" });
  await client.connect(
    new StdioClientTransport({
      command: process.execPath,
      args: [mcp],
      env: { ...process.env, BACKTICK_DEV_ORIGIN: origin } as Record<
        string,
        string
      >,
    }),
  );
  t.after(() => client.close());
  return client;
}

const text = (result: Awaited<ReturnType<Client["callTool"]>>) =>
  (result.content as { type: string; text: string }[])[0]!.text;

it("lists the tools, which say what to do when backtick-dev isn't running", async (t) => {
  const client = await agent(t, "http://127.0.0.1:9");
  const { tools } = await client.listTools();
  assert.deepEqual(tools.map((tool) => tool.name).sort(), [
    "devices",
    "inspect",
    "logs",
    "press",
    "screenshot",
    "scroll",
    "type",
  ]);
  const result = await client.callTool({ name: "logs", arguments: {} });
  assert.equal(result.isError, true);
  assert.match(
    text(result),
    /^Nothing answers at http:\/\/127\.0\.0\.1:9: start .*npm start/,
  );
});

it("answers the logs, the devices, and a screenshot as an image", async (t) => {
  const dir = mkdtempSync(join(tmpdir(), "backtick-dev-mcp-"));
  writeFileSync(join(dir, "answer.txt"), "one");
  const supervisor = await supervise({
    command: ["node", fixture],
    watch: [dir],
    port: 0,
    env: { DIR: dir },
  });
  t.after(() => supervisor.close());
  const origin = `http://localhost:${supervisor.port}`;
  const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 1, 2, 3]);
  t.mock.method(console, "log", () => {});
  const channel = startDevChannel(origin, {
    reload: () => {},
    screenshot: async () => png.toString("base64"),
  });
  t.after(channel.stop);
  console.log("Hello from the app.");

  const client = await agent(t, origin);
  for (let tries = 0; ; tries++) {
    const logs = text(await client.callTool({ name: "logs", arguments: {} }));
    if (logs.includes("Hello from the app.")) {
      assert.match(logs, /^#1 \S+ app \S+ log Hello from the app\.$/m);
      break;
    }
    assert.ok(tries < 100, "waited too long");
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  assert.equal(
    text(await client.callTool({ name: "logs", arguments: { since: 1 } })),
    "Nothing new.",
  );
  assert.match(
    text(await client.callTool({ name: "devices", arguments: {} })),
    /^\S+ connected \S+/,
  );
  const screenshot = await client.callTool({
    name: "screenshot",
    arguments: {},
  });
  assert.deepEqual(screenshot.content, [
    { type: "image", data: png.toString("base64"), mimeType: "image/png" },
  ]);
  const elsewhere = await client.callTool({
    name: "screenshot",
    arguments: { device: "203.0.113.9" },
  });
  assert.equal(elsewhere.isError, true);
  assert.equal(text(elsewhere), "No app is connected from 203.0.113.9.");
});
