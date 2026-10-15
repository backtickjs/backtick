import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, it } from "node:test";
import {
  type Message,
  type Supervisor,
  supervise,
} from "../dist/supervisor.js";

const fixture = new URL("fixtures/server.mjs", import.meta.url).pathname;

let supervisor: Supervisor | undefined;
afterEach(() => supervisor?.close());

// A project whose server answers `answer`, supervised on a free port.
async function project(answer: string) {
  const dir = mkdtempSync(join(tmpdir(), "backtick-dev-"));
  writeFileSync(join(dir, "answer.txt"), answer);
  // macOS reports a change made just before watching starts.
  await new Promise((resolve) => setTimeout(resolve, 300));
  supervisor = await supervise({
    command: ["node", fixture],
    watch: dir,
    port: 0,
    env: { DIR: dir },
  });
  const origin = `http://localhost:${supervisor.port}`;
  return {
    origin,
    save: (answer: string) => writeFileSync(join(dir, "answer.txt"), answer),
    get: async (path: string) => {
      const response = await fetch(`${origin}${path}`);
      return { status: response.status, text: await response.text() };
    },
  };
}

// An app connected to the channel, and what it's told.
async function app(origin: string) {
  const socket = new WebSocket(`${origin.replace("http", "ws")}/__backtick`);
  const messages: Message[] = [];
  const waiting: ((message: Message) => void)[] = [];
  socket.onmessage = (event) => {
    const message = JSON.parse(String(event.data)) as Message;
    const next = waiting.shift();
    next ? next(message) : messages.push(message);
  };
  await new Promise((resolve) => (socket.onopen = resolve));
  return {
    next: () =>
      messages.length > 0
        ? Promise.resolve(messages.shift()!)
        : new Promise<Message>((resolve) => waiting.push(resolve)),
  };
}

it("answers as your server does, with the host and path the app sent", async () => {
  const { get, origin } = await project("one");
  assert.deepEqual(await get("/items/1?page=2"), {
    status: 200,
    text: `one ${new URL(origin).host} /items/1?page=2`,
  });
});

it("restarts your server on a change, then tells the app to reload", async () => {
  const { get, origin, save } = await project("one");
  const { next } = await app(origin);
  save("two");
  assert.deepEqual(await next(), { type: "reload" });
  assert.match((await get("/")).text, /^two /);
});

it("holds a request made during a restart until the new server answers", async () => {
  const { get, origin, save } = await project("one");
  const { next } = await app(origin);
  save("two");
  // The watcher waits 100 ms for more changes, then restarts.
  await new Promise((resolve) => setTimeout(resolve, 150));
  assert.match((await get("/")).text, /^two /);
  assert.deepEqual(await next(), { type: "reload" });
});

it("says why your server failed to start, to the app and to requests", async () => {
  const { get, origin, save } = await project("one");
  const { next } = await app(origin);
  save("fail");
  assert.deepEqual(await next(), {
    type: "server-error",
    message: "Failed to start.\n",
  });
  assert.deepEqual(await get("/"), { status: 502, text: "Failed to start.\n" });
  save("fixed");
  assert.deepEqual(await next(), { type: "reload" });
  assert.match((await get("/")).text, /^fixed /);
});

it("says why your server crashed once up", async () => {
  const { get, origin } = await project("one");
  const { next } = await app(origin);
  assert.equal((await get("/crash")).status, 502);
  assert.deepEqual(await next(), {
    type: "server-error",
    message: "Crashed.\n",
  });
  assert.deepEqual(await get("/"), { status: 502, text: "Crashed.\n" });
});
