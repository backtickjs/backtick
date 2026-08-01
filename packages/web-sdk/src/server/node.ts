import { createServer, type Server } from "node:http";
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CLIENT_URL, createHandler, type Route } from "./handler.js";

export interface BrowserAssets {
  // The URL the client is served at, as the build named it.
  readonly client: string;
  // Directories to serve, by the URL prefix that reaches them.
  readonly modules: { readonly [prefix: string]: string };
}

// Where the browser half sits on disk, and what a page needs to reach it.
//
// Files, not a directory: the client is bundled for the browser
// (`scripts/browser.mjs`), so nothing it loads names a package and nothing else
// has to be served. A page needs a script tag and no import map, and an app
// gives up one filename rather than a whole prefix of its own URL space.
//
// The build names the file for what is in it and writes that name down; this
// reads it rather than guessing, so the URL changes exactly when the bytes do.
// Resolved here rather than by the app: what makes up the client is the SDK's
// business, and an app that named its parts would have to change when they did.
export function browserAssets(): BrowserAssets {
  // `dist/browser`, where this file is `dist/server/node.js`.
  const browser = join(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    "browser",
  );
  const { client } = JSON.parse(
    readFileSync(join(browser, "manifest.json"), "utf8"),
  ) as { client: string };
  return {
    client: `/${client}`,
    modules: {
      [`/${client}`]: join(browser, client),
      // Named by the client, which carries `//# sourceMappingURL=...`.
      [`/${client}.map`]: join(browser, `${client}.map`),
      // What a page writes, for anything that asks for it under that name
      // rather than being handed the built one by a page this served.
      [CLIENT_URL]: join(browser, client),
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
    // A module can be one file rather than a directory — the client is — and
    // then the path is the whole of it.
    const named = assets.modules[path];
    if (named !== undefined) {
      return readFile(named).catch(() => null);
    }
    const prefix = Object.keys(assets.modules).find(
      (each) => each.endsWith("/") && path.startsWith(each),
    );
    const root = prefix === undefined ? undefined : assets.modules[prefix];
    if (prefix === undefined || root === undefined) {
      return null;
    }
    // `normalize` first, so a `..` in the request can't climb out of `root`.
    // A path ending in `/` is a directory, and a directory means its page —
    // note that `normalize("")` is `"."`, so the test is on what was asked for.
    const asked = normalize(path.slice(prefix.length));
    const file = join(root, path.endsWith("/") ? `${asked}/index.html` : asked);
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
// Serves an app: its own files — its pages among them — and its routes.
//
// This writes no HTML. `root` is the directory a page and whatever it loads sit
// in, and a page reaches the client by the name it writes:
//
//     <script type="module" src="/backtick.js"></script>
//
// The page then asks its own path for the targets it should draw, which is the
// same request a phone makes.
export function serve(
  routes: readonly Route[],
  options: { readonly root?: string } = {},
): Server {
  const assets = browserAssets();
  const handle = createHandler(routes, {
    client: assets.client,
    read: readAssets({
      ...assets,
      modules: {
        ...assets.modules,
        // Last, so the app's own directory is reached only by a path the
        // client did not claim.
        "/": resolve(options.root ?? "."),
      },
    }),
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
