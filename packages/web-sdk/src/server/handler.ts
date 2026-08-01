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
  // Where the client is served, as the build named it — a name that holds a
  // hash of the file. A page served from here gets this in place of the name
  // it wrote, and this is the one path answered as immutable.
  readonly client?: string;
}

// The name a page writes for the client, and the only thing about it an app
// says out loud. What it resolves to is the build's business, which is what
// lets the file behind it be cached for a year.
export const CLIENT_URL = "/backtick.js";

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
      const read = await options.read?.(url.pathname);
      // Its own URL, and one thing to answer with — so a tag can mean it, and a
      // client that already has that one is told so rather than sent it again.
      return url.pathname === options.client && read != null
        ? kept(read, contentTypes["js"] ?? "")
        : file(url.pathname, read, options, {
            asked: request.headers.get("if-none-match"),
          });
    }
    // A route's path answers two ways: the page a browser asked for, or what to
    // draw. Both say what varies, so nothing keeps one and hands it to the other
    // — and neither carries a tag, because a browser keeps one entry per URL and
    // would send back the other representation's, which can never match.
    if ((request.headers.get("accept") ?? "").includes("text/html")) {
      const { html } = matched.route;
      return file(html, await options.read?.(html), options, {
        vary: "accept",
      });
    }
    // Rendered per request, so an edit shows on reload rather than on restart,
    // and so a route answers with what is true now. A deployment renders once
    // per path and serves the JSON as a file.
    const mounts = await matched.route.render({ params: matched.params, url });
    const drawn: Drawn[] = [];
    for (const { target, component } of mounts) {
      drawn.push({ target, bundle: await bundle(component) });
    }
    const body = new TextEncoder().encode(JSON.stringify(drawn));
    return fresh(body, "application/json; charset=utf-8", "accept");
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

// A file, read and answered under its own type. `asked` is what the client
// says it already has, and passing it at all is what says this path is one
// thing — leave it out where the path answers more than one way.
function file(
  path: string,
  contents: Uint8Array | null | undefined,
  options: HandlerOptions,
  how: { readonly asked?: string | null; readonly vary?: string },
): Response {
  if (contents == null) {
    return new Response("Not found", { status: 404 });
  }
  // A path ending in `/` is a directory, and what a directory serves is its
  // page — there is no extension to read the type from.
  const extension = path.endsWith("/") ? "html" : (path.split(".").pop() ?? "");
  const type = contentTypes[extension] ?? "application/octet-stream";
  const body =
    type === "text/html" && options.client != null
      ? built(contents, options.client)
      : contents;
  if (how.asked === undefined) {
    return fresh(body, type, how.vary);
  }
  const etag = tag(body);
  return how.asked === etag
    ? new Response(null, {
        status: 304,
        headers: { etag, "cache-control": "no-cache" },
      })
    : fresh(body, type, how.vary, etag);
}

// Where a page names the client as a URL: an attribute the browser fetches, or
// a specifier a module resolves. Quoted, because that is what tells a name from
// a mention — a page that writes `/backtick.js` in a comment or in its own
// prose said it, it didn't ask for it.
const named = new RegExp(
  `(\\bsrc\\s*=\\s*|\\bhref\\s*=\\s*|\\bfrom\\s*|\\bimport\\s*\\(?\\s*)(["'])${CLIENT_URL.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  )}\\2`,
  "g",
);

// A page as it was written, with the client resolved to the name the build gave
// it. The page keeps saying `/backtick.js`, which is readable and stays true;
// the browser is told the name that carries the hash, which is what makes the
// file behind it something it never has to ask about again.
function built(contents: Uint8Array, client: string): Uint8Array {
  const html = new TextDecoder().decode(contents);
  return new TextEncoder().encode(
    html.replace(named, (_, how: string, quote: string) =>
      [how, quote, client, quote].join(""),
    ),
  );
}

// A file whose name says what is in it: a year of cache and no revalidation at
// all. Safe only because new bytes are a new name, so nothing served this way
// can go stale — a browser that has it is done asking.
function kept(contents: Uint8Array, type: string): Response {
  return new Response(contents.slice().buffer as ArrayBuffer, {
    headers: {
      "content-type": type,
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}

// Answered whole, and asked for again next time.
//
// `no-cache` is "ask me", not "don't store". Where there is a tag the asking is
// a header and the answer is usually 304; where there isn't, the asking is the
// request itself. Everything a route answers is the second kind, which is what
// a page rendered per request needs anyway.
function fresh(
  contents: Uint8Array,
  type: string,
  vary?: string,
  etag?: string,
): Response {
  const headers: Record<string, string> = {
    "content-type": type,
    "cache-control": "no-cache",
  };
  if (vary != null) {
    headers["vary"] = vary;
  }
  if (etag != null) {
    headers["etag"] = etag;
  }
  // Copied into a plain `ArrayBuffer`: a `Uint8Array` over a `SharedArrayBuffer`
  // is not a body, and the type can't tell the two apart.
  return new Response(contents.slice().buffer as ArrayBuffer, { headers });
}

// A tag for these bytes, as FNV-1a over them. Weak because it says what was
// sent rather than what the file is: two servings of the same content share a
// tag, which is the only thing a validator has to promise.
//
// Read per request, so this is read per request too — a deployment that serves
// its own files answers this from a stat instead, and never opens them.
function tag(contents: Uint8Array): string {
  let hash = 0x811c9dc5;
  for (const byte of contents) {
    hash = Math.imul(hash ^ byte, 0x01000193);
  }
  return `W/"${(hash >>> 0).toString(36)}-${contents.byteLength.toString(36)}"`;
}
