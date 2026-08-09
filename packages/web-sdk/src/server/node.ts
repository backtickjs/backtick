import { createServer, type Server } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CLIENT_URL } from "../toHtml.js";
import { createHandler, type Route } from "./handler.js";

// Directories and files to serve, by the URL prefix that reaches them.
export type Modules = { readonly [prefix: string]: string };

// Where the browser half sits on disk, under the URLs a page names it by.
//
// Files, not a directory: the client is bundled for the browser
// (`scripts/browser.mjs`), so nothing it loads names a package and nothing else
// has to be served. A page needs a script tag and no import map, and an app
// gives up one filename rather than a whole prefix of its own URL space.
//
// Resolved here rather than by the app: what makes up the client is the SDK's
// business, and an app that named its parts would have to change when they did.
export function browserAssets(): Modules {
  // `dist/browser`, where this file is `dist/server/node.js`.
  const browser = join(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    "browser",
  );
  // The same constant a page defaults to, so what is written and what is served
  // cannot drift apart.
  const file = CLIENT_URL.slice(1);
  return {
    [CLIENT_URL]: join(browser, file),
    // Named by the client, which carries `//# sourceMappingURL=...`.
    [`${CLIENT_URL}.map`]: join(browser, `${file}.map`),
  };
}

// Reads files out of those directories, refusing anything a `..` could reach
// outside them. For a runtime that brings its own listener — Bun serves a
// handler directly, so it wires `createHandler` and this itself.
export function readAssets(
  modules: Modules = browserAssets(),
): (path: string) => Promise<Uint8Array | null> {
  return async (path) => {
    // A module can be one file rather than a directory — the client is — and
    // then the path is the whole of it.
    const named = modules[path];
    if (named !== undefined) {
      return readFile(named).catch(() => null);
    }
    const prefix = Object.keys(modules).find(
      (each) => each.endsWith("/") && path.startsWith(each),
    );
    const root = prefix === undefined ? undefined : modules[prefix];
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
// Serves an app: the client, its routes, and whatever else it says to serve.
//
// This writes no HTML and knows of no page. A route that answers with a
// document builds that document itself, which is what `toHtml` is for, so most
// apps have no files of their own and give no `root` at all.
export function serve(
  routes: readonly Route[],
  options: { readonly root?: string } = {},
): Server {
  const handle = createHandler(routes, {
    read: readAssets(
      options.root === undefined
        ? browserAssets()
        : {
            ...browserAssets(),
            // Last, so the app's own directory is reached only by a path the
            // client did not claim.
            "/": resolve(options.root),
          },
    ),
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
