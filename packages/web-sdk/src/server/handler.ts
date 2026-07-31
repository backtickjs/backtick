import { bundle, type Spliceable } from "@backtickjs/core";
import type { Drawn } from "../Drawn.js";

// What a path gives a render to work from.
export interface RouteContext {
  // What the route's own `:name` segments matched, decoded.
  readonly params: { readonly [name: string]: string };
  readonly url: URL;
}

// Where one screen goes, and what goes there. The target is a selector — the
// name the page already has for the element it means to fill — and the
// component is what fills it, usually an element written as `<Home />`.
export interface Mount {
  readonly target: string;
  readonly component: Spliceable;
}

// A path, the page a browser opens at it, and what that page draws.
//
// `render` runs when the path is asked for, which is what makes a route answer
// with today's data rather than the day it started. It returns every mount the
// page holds, so a document with a body and a sidebar reads them from one
// place — and so the work behind them happens once, not once per target.
export interface Route {
  // The path this answers for, with `:name` where a segment is a parameter:
  // `/todos/:id`.
  readonly path: string;
  // Where the document is, as a path the reader resolves — `/index.html` being
  // a file in whatever directory the app serves. Said rather than assumed: a
  // route that opens a page names it, and a reader of the table can see which
  // document each path answers with.
  readonly html: string;
  readonly render: (
    context: RouteContext,
  ) => readonly Mount[] | Promise<readonly Mount[]>;
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

// One handler for every client, and it writes no HTML.
//
// A browser asks for `text/html` and gets the app's own page. Everything else —
// a phone, an MCU, and the page itself once it is running — asks for the same
// path and gets what to draw where.
//
// `text/html` has to be asked for. A client sending nothing, or `*/*`, is not a
// browser navigating, so the data is the safer read.
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
    const matched = routes
      .map((route) => ({ route, params: match(route.path, url.pathname) }))
      .find((candidate) => candidate.params !== null);

    if (matched?.params == null) {
      return file(url.pathname, await options.read?.(url.pathname));
    }
    if ((request.headers.get("accept") ?? "").includes("text/html")) {
      const { html } = matched.route;
      return file(html, await options.read?.(html));
    }
    // Rendered per request, so an edit shows on reload rather than on restart,
    // and so a route answers with what is true now. A deployment renders once
    // per path and serves the JSON as a file.
    const mounts = await matched.route.render({ params: matched.params, url });
    const drawn: Drawn[] = [];
    for (const { target, component } of mounts) {
      drawn.push({ target, bundle: await bundle(component) });
    }
    return new Response(JSON.stringify(drawn), {
      headers: { "content-type": "application/json; charset=utf-8" },
    });
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

function file(path: string, contents: Uint8Array | null | undefined): Response {
  if (contents == null) {
    return new Response("Not found", { status: 404 });
  }
  // A path ending in `/` is a directory, and what a directory serves is its
  // page — there is no extension to read the type from.
  const extension = path.endsWith("/") ? "html" : (path.split(".").pop() ?? "");
  // Copied into a plain `ArrayBuffer`: a `Uint8Array` over a `SharedArrayBuffer`
  // is not a body, and the type can't tell the two apart.
  return new Response(contents.slice().buffer as ArrayBuffer, {
    headers: {
      "content-type": contentTypes[extension] ?? "application/octet-stream",
    },
  });
}
