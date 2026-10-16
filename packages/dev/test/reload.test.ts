import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import type { AddressInfo } from "node:net";
import { it } from "node:test";
import { WebSocketServer } from "ws";

const reload = new URL("../dist/reload.js", import.meta.url).href;

// A server that listens, then exits, run with the preload, with Expo's
// message socket at `port`.
function serve(port: number) {
  const server = spawn(
    process.execPath,
    [
      "--import",
      reload,
      "--input-type=module",
      "--eval",
      `import { createServer } from "node:http";
       const server = createServer().listen(0, () => setTimeout(() => server.close(), 500));`,
    ],
    { env: { ...process.env, RCT_METRO_PORT: String(port) }, stdio: "inherit" },
  );
  return once(server, "exit");
}

it("asks Expo to reload once the server listens", async () => {
  const metro = new WebSocketServer({ port: 0 });
  await once(metro, "listening");
  const messages: unknown[] = [];
  metro.on("connection", (socket) =>
    socket.on("message", (data) => messages.push(JSON.parse(String(data)))),
  );
  const [code] = await serve((metro.address() as AddressInfo).port);
  metro.close();
  assert.equal(code, 0);
  assert.deepEqual(messages, [{ version: 2, method: "reload" }]);
});

it("does nothing without Expo", async () => {
  const unused = new WebSocketServer({ port: 0 });
  await once(unused, "listening");
  const { port } = unused.address() as AddressInfo;
  unused.close();
  const [code] = await serve(port);
  assert.equal(code, 0);
});
