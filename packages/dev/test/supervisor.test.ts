import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, it, mock } from "node:test";
import { startDevChannel } from "../dist/client.js";
import {
  type SupervisorMessage,
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
  const messages: SupervisorMessage[] = [];
  const waiting: ((message: SupervisorMessage) => void)[] = [];
  socket.onmessage = (event) => {
    const message = JSON.parse(String(event.data)) as SupervisorMessage;
    const next = waiting.shift();
    next ? next(message) : messages.push(message);
  };
  await new Promise((resolve) => (socket.onopen = resolve));
  return {
    next: () =>
      messages.length > 0
        ? Promise.resolve(messages.shift()!)
        : new Promise<SupervisorMessage>((resolve) => waiting.push(resolve)),
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

it("keeps your server's output, a line at a time, and its restarts", async () => {
  const { get, origin, save } = await project("one");
  const { next } = await app(origin);
  await get("/hello");
  save("two");
  await next();
  const logs = (await get("/__backtick/logs")).text;
  assert.match(logs, /^#1 \S+ server log Answered \/hello\.$/m);
  assert.match(logs, /^#2 \S+ backtick-dev info Restarted your server/m);
  // what came after
  assert.equal((await get("/__backtick/logs?since=2")).text, "");
});

it("keeps the app's console, and the uncaught errors it reports", async (t) => {
  const { get, origin } = await project("one");
  t.mock.method(console, "error", () => {});
  const reloads: number[] = [];
  const channel = startDevChannel(origin, { reload: () => reloads.push(1) });
  t.after(channel.stop);
  // logged before the socket opens: sent once it does
  console.error("Failed:", new Error("boom"), { id: 1 });
  channel.report(new TypeError("uncaught"));
  await waitFor(async () =>
    (await get("/__backtick/logs")).text.includes("uncaught"),
  );
  const logs = (await get("/__backtick/logs")).text;
  assert.match(logs, /^#\d+ \S+ app \S+ error Failed: Error: boom\n +at /m);
  assert.match(logs, /\{"id":1\}/);
  assert.match(logs, /^#\d+ \S+ app \S+ error Uncaught: TypeError: uncaught/m);
  assert.match((await get("/__backtick/devices")).text, /^\S+ connected \S+/);
  assert.deepEqual(reloads, []);
});

it("answers a PNG of what the newest app shows, or why there's none", async (t) => {
  const { get, origin } = await project("one");
  assert.deepEqual(await get("/__backtick/screenshot"), {
    status: 404,
    text: "No app is connected.",
  });
  const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 1, 2, 3]);
  const older = startDevChannel(origin, { reload: () => {} });
  t.after(older.stop);
  await waitFor(async () => (await get("/__backtick/devices")).text !== "");
  // the newest is asked
  const newer = startDevChannel(origin, {
    reload: () => {},
    screenshot: async () => png.toString("base64"),
  });
  t.after(newer.stop);
  await waitFor(
    async () => (await get("/__backtick/devices")).text.split("\n").length > 2,
  );
  const response = await fetch(`${origin}/__backtick/screenshot`);
  assert.equal(response.headers.get("content-type"), "image/png");
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), png);
  newer.stop();
  await waitFor(
    async () =>
      (await get("/__backtick/devices")).text.split("\n").length === 2,
  );
  assert.deepEqual(await get("/__backtick/screenshot"), {
    status: 501,
    text: "This app takes no screenshots: pass `screenshot` to startDevChannel.",
  });
  assert.equal(
    (await get("/__backtick/screenshot?device=203.0.113.9")).status,
    404,
  );
});

async function waitFor(condition: () => Promise<boolean>) {
  for (let tries = 0; !(await condition()); tries++) {
    assert.ok(tries < 100, "waited too long");
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
}
