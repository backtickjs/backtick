import { createServer, type Server } from "node:http";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join, normalize } from "node:path";
import {
  createHandler,
  type DocumentOptions,
  type Routes,
} from "@backtickjs/web-server";

export interface BrowserAssets extends DocumentOptions {
  // Directories to serve, by the URL prefix that reaches them.
  readonly modules: { readonly [prefix: string]: string };
}

// Where the browser half sits on disk, and what a page needs to reach it.
//
// Resolved here rather than by the app: which packages make up the client is
// the SDK's business, and an app that named them would have to change when that
// changed. It is also what lets an app depend on the SDK alone.
export function browserAssets(prefix = "/_backtick/"): BrowserAssets {
  const require = createRequire(import.meta.url);
  const at = (name: string): string => dirname(require.resolve(name));
  return {
    client: `${prefix}client/index.js`,
    modules: {
      [`${prefix}client/`]: at("@backtickjs/web-client"),
      [`${prefix}interpreter/`]: at("@backtickjs/js-interpreter"),
      [`${prefix}format/`]: dirname(
        require.resolve("@backtickjs/jit-bundler/format"),
      ),
    },
    // A browser resolves a relative import on its own but not a bare one, so
    // the specifiers the client imports by name are mapped here.
    imports: {
      "@backtickjs/js-interpreter": `${prefix}interpreter/index.js`,
      "@backtickjs/jit-bundler/format": `${prefix}format/Bundle.js`,
    },
  };
}

// Reads files out of those directories, refusing anything a `..` could reach
// outside them. For a runtime that brings its own listener — Bun serves a
// handler directly, so it wires `createHandler` and this itself.
export function readAssets(
  assets: BrowserAssets = browserAssets(),
): (path: string) => Promise<Uint8Array | null> {
  return async (path) => {
    const prefix = Object.keys(assets.modules).find((each) =>
      path.startsWith(each),
    );
    const root = prefix === undefined ? undefined : assets.modules[prefix];
    if (prefix === undefined || root === undefined) {
      return null;
    }
    // `normalize` first, so a `..` in the request can't climb out of `root`.
    const file = join(root, normalize(path.slice(prefix.length)));
    if (!file.startsWith(root)) {
      return null;
    }
    return readFile(file).catch(() => null);
  };
}

// Node's half of what a runtime spells its own way: `node:http` predates
// `Request`/`Response`, so the handler needs the two translated. Bun needs none
// of this — `Bun.serve({ fetch })` takes the handler as it is.
//
// The assets default to the SDK's own, so an app says only what is its own —
// its screen, and its title.
export function serve(
  routes: Routes,
  options: Partial<BrowserAssets> & { readonly title?: string } = {},
): Server {
  const assets = { ...browserAssets(), ...options };
  const handle = createHandler(routes, {
    ...assets,
    read: readAssets(assets),
  });
  return createServer((incoming, outgoing) => {
    const request = new Request(
      new URL(incoming.url ?? "/", "http://localhost"),
      { headers: incoming.headers as Record<string, string> },
    );
    void handle(request).then(
      async (response) => {
        outgoing.writeHead(
          response.status,
          Object.fromEntries(response.headers),
        );
        outgoing.end(Buffer.from(await response.arrayBuffer()));
      },
      (error: unknown) => {
        outgoing.writeHead(500, { "content-type": "text/plain" });
        outgoing.end(String(error));
      },
    );
  });
}
