import { createServer, type Server } from "node:http";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHandler, type Route } from "./handler.js";

export interface BrowserAssets {
  // The module a page imports to draw a payload, as a URL it can reach. A page
  // names this itself, in its own import map — see `serve`.
  readonly client: string;
  // Bare specifiers a browser can't resolve, as an app writes them into that
  // map. A workspace package imported by name needs an entry here.
  readonly imports: { readonly [specifier: string]: string };
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
  // The bundle format is in the browser's graph because the interpreter
  // imports it, so it is resolved the way the interpreter resolves it. This
  // package doesn't depend on the bundler and has no business naming it as
  // one of its own.
  const interpreter = createRequire(
    require.resolve("@backtickjs/js-interpreter"),
  );
  return {
    client: `${prefix}client/index.js`,
    modules: {
      // The client is this package's own: `dist/client`, where this file is
      // `dist/server/node.js`.
      [`${prefix}client/`]: join(
        dirname(fileURLToPath(import.meta.url)),
        "..",
        "client",
      ),
      [`${prefix}interpreter/`]: at("@backtickjs/js-interpreter"),
      [`${prefix}format/`]: dirname(
        interpreter.resolve("@backtickjs/jit-bundler/format"),
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
// in, and the client is served under the prefix `browserAssets` names, which is
// what a page's own import map points at:
//
//     <script type="importmap">
//       { "imports": { "@backtickjs/web-sdk": "/_backtick/client/index.js" } }
//     </script>
//
// The page then asks its own path for the targets it should draw, which is the
// same request a phone makes.
export function serve(
  routes: readonly Route[],
  options: { readonly root?: string } = {},
): Server {
  const assets = browserAssets();
  const handle = createHandler(routes, {
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
