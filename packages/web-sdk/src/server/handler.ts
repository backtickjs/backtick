// What a path gives a route to answer from.
export interface RouteContext {
  // What the route's own `:name` segments matched, decoded.
  readonly params: { readonly [name: string]: string };
  readonly url: URL;
  readonly request: Request;
}

// A path, and what answers for it.
//
// `respond` runs when the path is asked for, which is what makes a route answer
// with today's data rather than the day it started. What it hands back is a
// `Response` and nothing here reads it — a page with a bundle already in it, a
// bundle as JSON, an image.
export interface Route {
  // The path this answers for, with `:name` where a segment is a parameter:
  // `/todos/:id`.
  readonly path: string;
  readonly respond: (context: RouteContext) => Response | Promise<Response>;
}

export interface HandlerOptions {
  // How to read a served file. Supplied as a reader rather than a path,
  // because reaching a filesystem is the one thing this can't do and stay
  // runtime-neutral.
  readonly read?: (path: string) => Promise<Uint8Array | null>;
}

const contentTypes: { readonly [ext: string]: string } = {
  html: "text/html",
  js: "text/javascript",
  map: "application/json",
  css: "text/css",
  json: "application/json",
};

// The type a path's name implies, or bytes where it implies nothing.
export function contentType(path: string): string {
  // A path ending in `/` is a directory, and what a directory serves is its
  // page — there is no extension to read the type from.
  const extension = path.endsWith("/") ? "html" : (path.split(".").pop() ?? "");
  return contentTypes[extension] ?? "application/octet-stream";
}

// What was built, under a type, asked for again next time.
//
// Text or bytes: a route that built a page has a string and a file that was
// read has neither the encoding nor the need to become one.
//
// `no-cache` is "ask me", not "don't store" — which is what a page rendered per
// request needs, and what a dev server wants of everything else.
export function respond(contents: Uint8Array | string, type: string): Response {
  const body =
    typeof contents === "string"
      ? new TextEncoder().encode(contents)
      : // Copied into a plain `ArrayBuffer`: a `Uint8Array` over a
        // `SharedArrayBuffer` is not a body, and the type can't tell them apart.
        contents.slice();
  return new Response(body.buffer as ArrayBuffer, {
    headers: { "content-type": type, "cache-control": "no-cache" },
  });
}

// A URL that belongs to a route is that route's to answer. Everything else is a
// file, read by whatever reader was given.
//
// Routes are tried in order and the first that matches answers: `/todos/new`
// before `/todos/:id` is the difference between a page and a parameter, and the
// order they are written in is what says which was meant.
//
// A `Request` in and a `Response` out, and nothing else — no runtime APIs, so
// this runs wherever those two types do. Bun serves it directly; Node needs the
// adapter in `@backtickjs/web-sdk/server/node`, which is also where reading a
// file off disk lives.
export function createHandler(
  routes: readonly Route[],
  options: HandlerOptions = {},
): (request: Request) => Promise<Response> {
  return async (request) => {
    const url = new URL(request.url);
    for (const route of routes) {
      const params = match(route.path, url.pathname);
      if (params !== null) {
        return route.respond({ params, url, request });
      }
    }
    const read = await options.read?.(url.pathname);
    return read == null
      ? new Response("Not found", { status: 404 })
      : respond(read, contentType(url.pathname));
  };
}

// What a route's `:name` segments matched, or null where the path is not this
// route's. Segment by segment, so `/todos/:id` takes `/todos/42` and neither
// `/todos` nor `/todos/42/edit`.
function match(
  path: string,
  pathname: string,
): { [name: string]: string } | null {
  const wanted = path.split("/");
  const asked = pathname.split("/");
  if (wanted.length !== asked.length) {
    return null;
  }
  const params: { [name: string]: string } = {};
  for (const [at, segment] of wanted.entries()) {
    const given = asked[at] ?? "";
    if (segment.startsWith(":")) {
      params[segment.slice(1)] = decodeURIComponent(given);
    } else if (segment !== given) {
      return null;
    }
  }
  return params;
}
