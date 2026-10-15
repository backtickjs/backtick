import { type ChildProcess, spawn } from "node:child_process";
import { once } from "node:events";
import { watch } from "node:fs";
import { type AddressInfo, connect, createServer } from "node:net";
import { Readable } from "node:stream";
import { setTimeout as sleep } from "node:timers/promises";
import { serve, upgradeWebSocket } from "@hono/node-server";
import { Hono } from "hono";
import { proxy } from "hono/proxy";
import type { WSContext } from "hono/ws";
import { type Dispatcher, request } from "undici";
import { WebSocketServer } from "ws";

/** What the supervisor tells the dev client, on `/__backtick`. */
export type Message =
  | { type: "reload" }
  | { type: "server-error"; message: string };

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
 */
export async function supervise(
  options: SupervisorOptions,
): Promise<Supervisor> {
  const sockets = new Set<WSContext>();
  const send = (message: Message) => {
    for (const socket of sockets) {
      socket.send(JSON.stringify(message));
    }
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
      stdio: ["ignore", "inherit", "pipe"],
      env: { ...process.env, ...options.env, PORT: String(port) },
    });
    child = started;
    let output = "";
    started.stderr!.on("data", (chunk: Buffer) => {
      process.stderr.write(chunk);
      output = (output + chunk).slice(-8000);
    });
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
      () => announce && upstream === current && send({ type: "reload" }),
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
    upgradeWebSocket(() => ({
      onOpen: (_event, socket) => void sockets.add(socket),
      onClose: (_event, socket) => void sockets.delete(socket),
    })),
  );
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
      for (const socket of sockets) {
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
