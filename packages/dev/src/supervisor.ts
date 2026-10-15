import { type ChildProcess, spawn } from "node:child_process";
import { once } from "node:events";
import { watch } from "node:fs";
import { type AddressInfo, connect, createServer } from "node:net";
import { Readable } from "node:stream";
import { setTimeout as sleep } from "node:timers/promises";
import { serve, upgradeWebSocket } from "@hono/node-server";
import { getConnInfo } from "@hono/node-server/conninfo";
import { Hono } from "hono";
import { proxy } from "hono/proxy";
import type { WSContext } from "hono/ws";
import { type Dispatcher, request } from "undici";
import { WebSocketServer } from "ws";

/** What the supervisor tells the app, on `/__backtick`. */
export type SupervisorMessage =
  | { type: "reload" }
  | { type: "server-error"; message: string };

/** What the app tells the supervisor. */
export type AppMessage = { type: "log"; level: Level; message: string };

export type Level = "debug" | "log" | "info" | "warn" | "error";

/** One entry of `/__backtick/logs`, numbered in the order it came. */
export interface LogEntry {
  readonly number: number;
  readonly time: Date;
  // Your server's output, the app's console, or the supervisor's own news.
  readonly source: "server" | "app" | "backtick-dev";
  // The app's address, for an entry it sent.
  readonly device?: string;
  readonly level: Level;
  readonly message: string;
}

// As many entries as `/__backtick/logs` keeps: the oldest go first.
const kept = 5000;

export interface SupervisorOptions {
  // What runs your server, which listens on `process.env.PORT`.
  readonly command: readonly [string, ...string[]];
  // The folder whose changes restart it.
  readonly watch: string;
  // Where the app reaches your server, and the dev client the supervisor.
  readonly port: number;
  readonly env?: NodeJS.ProcessEnv;
}

export interface Supervisor {
  readonly port: number;
  close(): Promise<void>;
}

/**
 * Runs your server behind `port`, restarting it when a file under `watch`
 * changes, and tells each app connected to `/__backtick` to reload once the
 * new one listens. A request that arrives during a restart waits for it.
 * Your server's output and each app's console are kept, for
 * `/__backtick/logs`.
 */
export async function supervise(
  options: SupervisorOptions,
): Promise<Supervisor> {
  // Each app connected, by its socket: where it connects from, and when.
  const devices = new Map<
    WSContext,
    { address: string; userAgent: string; connected: Date }
  >();
  const send = (message: SupervisorMessage) => {
    for (const socket of devices.keys()) {
      socket.send(JSON.stringify(message));
    }
  };

  const entries: LogEntry[] = [];
  let numbered = 0;
  const record = (entry: Omit<LogEntry, "number" | "time">) => {
    entries.push({ number: ++numbered, time: new Date(), ...entry });
    entries.splice(0, entries.length - kept);
  };

  // Servers this stopped, whose exit isn't a failure.
  const stopped = new WeakSet<ChildProcess>();
  let child: ChildProcess | undefined;
  // Your server's origin once it listens; rejected with what it wrote to
  // stderr if it exits instead.
  let upstream: Promise<string>;

  const start = async (): Promise<string> => {
    const port = await freePort();
    const [command, ...args] = options.command;
    const started = spawn(command, args, {
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, ...options.env, PORT: String(port) },
    });
    child = started;
    // In this terminal, as before, and in the log, a line at a time.
    let output = "";
    started.stdout!.on("data", (chunk: Buffer) => process.stdout.write(chunk));
    started.stderr!.on("data", (chunk: Buffer) => {
      process.stderr.write(chunk);
      output = (output + chunk).slice(-8000);
    });
    eachLine(started.stdout!, (message) =>
      record({ source: "server", level: "log", message }),
    );
    eachLine(started.stderr!, (message) =>
      record({ source: "server", level: "error", message }),
    );
    const failure = () =>
      new Error(output || `Your server exited with code ${started.exitCode}.`);
    let listening = false;
    // Crashed once up: requests fail with why, until a change restarts it.
    started.on("exit", () => {
      if (listening && !stopped.has(started) && child === started) {
        upstream = Promise.reject(failure());
        upstream.catch(() => {});
        send({ type: "server-error", message: failure().message });
      }
    });
    while (!(await listens(port))) {
      if (started.exitCode !== null || started.signalCode !== null) {
        throw failure();
      }
      await sleep(50);
    }
    listening = true;
    return `http://127.0.0.1:${port}`;
  };

  // `announce`: tell apps to reload, which the first start doesn't.
  const restart = (announce: boolean) => {
    const previous = child;
    const current = (async () => {
      if (previous?.exitCode === null && previous.signalCode === null) {
        stopped.add(previous);
        previous.kill();
        await once(previous, "exit");
      }
      return start();
    })();
    upstream = current;
    // Only the latest restart speaks: one a save interrupted fails quietly.
    current.then(
      () => {
        if (announce && upstream === current) {
          record({
            source: "backtick-dev",
            level: "info",
            message: "Restarted your server after a change.",
          });
          send({ type: "reload" });
        }
      },
      (error: Error) =>
        upstream === current &&
        send({ type: "server-error", message: error.message }),
    );
  };

  // The latest server's origin, past restarts that a newer one replaced.
  const origin = async (): Promise<string> => {
    for (;;) {
      const current = upstream;
      try {
        return await current;
      } catch (error) {
        if (current === upstream) throw error;
      }
    }
  };

  const app = new Hono();
  app.get(
    "/__backtick",
    upgradeWebSocket((context) => {
      // An IPv4 address, as Node names it on a socket that also takes IPv6.
      const address = (
        getConnInfo(context).remote.address ?? "unknown"
      ).replace(/^::ffff:/, "");
      const userAgent = context.req.header("user-agent") ?? "";
      return {
        onOpen: (_event, socket) =>
          void devices.set(socket, {
            address,
            userAgent,
            connected: new Date(),
          }),
        onClose: (_event, socket) => void devices.delete(socket),
        onMessage: (event) => {
          const message = JSON.parse(String(event.data)) as AppMessage;
          if (message.type === "log") {
            const { level, message: text } = message;
            record({ source: "app", device: address, level, message: text });
          }
        },
      };
    }),
  );
  // For an agent, or you, as text: `curl localhost:3000/__backtick/logs`.
  app.get("/__backtick/devices", (context) =>
    context.text(
      [...devices.values()]
        .map(
          ({ address, userAgent, connected }) =>
            `${address} connected ${connected.toISOString()} ${userAgent}\n`,
        )
        .join(""),
    ),
  );
  // What came after entry `since`, which a reader passes to read on.
  app.get("/__backtick/logs", (context) => {
    const since = Number(context.req.query("since") ?? 0);
    return context.text(
      entries
        .filter((entry) => entry.number > since)
        .map(formatEntry)
        .join(""),
    );
  });
  app.all("*", async (context) => {
    const target = await origin();
    const url = new URL(context.req.url);
    return proxy(`${target}${url.pathname}${url.search}`, {
      ...context.req,
      // As the app sent it, so your server's URLs name where the app reached
      // it. `fetch` would send the target's instead.
      headers: { ...context.req.header(), host: url.host },
      customFetch: forward,
    });
  });
  // Your server down, or failing to start: why, for the app to show.
  app.onError((error, context) => context.text(error.message, 502));

  restart(false);
  let timer: ReturnType<typeof setTimeout> | undefined;
  const watcher = watch(options.watch, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => restart(true), 100);
  });
  const server = serve({
    fetch: app.fetch,
    port: options.port,
    websocket: { server: new WebSocketServer({ noServer: true }) },
  });
  await once(server, "listening");

  return {
    port: (server.address() as AddressInfo).port,
    async close() {
      clearTimeout(timer);
      watcher.close();
      for (const socket of devices.keys()) {
        socket.close();
      }
      server.close();
      if (child?.exitCode === null && child.signalCode === null) {
        stopped.add(child);
        child.kill();
        await once(child, "exit");
      }
    },
  };
}

// `#12 2026-10-15T20:31:00.123Z app 192.168.0.123 error …`, a stack's lines
// indented under it.
function formatEntry(entry: LogEntry): string {
  const { number, time, source, device, level, message } = entry;
  const where = device === undefined ? source : `${source} ${device}`;
  const body = message.replaceAll("\n", "\n    ");
  return `#${number} ${time.toISOString()} ${where} ${level} ${body}\n`;
}

// Calls `line` for each line `stream` writes, the last one included.
function eachLine(stream: Readable, line: (text: string) => void): void {
  let rest = "";
  stream.on("data", (chunk: Buffer) => {
    const lines = (rest + chunk).split("\n");
    rest = lines.pop()!;
    lines.forEach(line);
  });
  stream.on("end", () => rest && line(rest));
}

// `request` as `fetch` takes it and answers, but with its `Host` header kept.
async function forward(input: Request): Promise<Response> {
  const { statusCode, headers, body } = await request(input.url, {
    method: input.method as Dispatcher.HttpMethod,
    headers: Object.fromEntries(input.headers),
    body: input.body ? Readable.fromWeb(input.body as never) : null,
  });
  const response = new Headers();
  for (const [name, value] of Object.entries(headers)) {
    for (const each of [value ?? []].flat()) {
      response.append(name, each);
    }
  }
  // What can't have a body: answers without content, and to `HEAD`.
  const empty =
    [101, 204, 205, 304].includes(statusCode) || input.method === "HEAD";
  return new Response(empty ? null : (Readable.toWeb(body) as ReadableStream), {
    status: statusCode,
    headers: response,
  });
}

async function freePort(): Promise<number> {
  const server = createServer().listen(0, "127.0.0.1");
  await once(server, "listening");
  const { port } = server.address() as AddressInfo;
  server.close();
  await once(server, "close");
  return port;
}

function listens(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = connect(port, "127.0.0.1");
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("error", () => resolve(false));
  });
}
