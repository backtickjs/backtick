// A screen's frame, as Next.js nests a page: inside the layouts of its path
// and its parents' (`_layout` routes), and, with a `_loading` route, inside a
// Suspense showing it, around a `Route` fetching the page. Composed on the
// server, from what those routes render, into the screen's one bundle.
import { type Client, cs, type Spliceable } from "@backtickjs/core";
import type { Context, Hono } from "hono";
import { type ComponentType, type ReactNode, Suspense } from "react" with {
  backtick: "client",
};
import { Route } from "./route.js";

// The requests backtick() makes in-process: for a nested route, what it
// renders, rather than its bundle; for a route alone (`/_page`), nothing.
const captures = new WeakMap<Request, { input?: unknown }>();
const alone = new WeakSet<Request>();

// The same request, in-process, for `path`, with the phone's headers.
function within(context: Context, path: string): Request {
  return new Request(new URL(path, context.req.url), {
    headers: context.req.raw.headers,
  });
}

/**
 * For a request backtick() makes in-process for a nested route: keeps what
 * a `_layout` or `_loading` route renders, rather than bundling it. Any
 * other route (a catch-all, say) renders nothing.
 */
export function capture(
  context: Context,
  input: unknown,
): Response | undefined {
  const sink = captures.get(context.req.raw);
  if (sink === undefined) {
    return undefined;
  }
  const route = context.req.routePath;
  if (route.endsWith("/_layout") || route.endsWith("/_loading")) {
    sink.input = input;
  }
  return context.body(null);
}

/**
 * A nested route's input, or undefined without one. Any answer but a 404 or
 * a 200 is an error.
 */
export async function nested(
  app: Hono<any, any, any>,
  context: Context,
  path: string,
): Promise<unknown> {
  const request = within(context, path);
  const sink: { input?: unknown } = {};
  captures.set(request, sink);
  const response = await app.request(request, undefined, context.env);
  if (response.status !== 200 && response.status !== 404) {
    throw new Error(`The screen's ${path} answered ${response.status}.`);
  }
  return sink.input;
}

/** The route at `path` alone, without its layouts and loading state. */
export async function page(
  app: Hono<any, any, any>,
  context: Context,
  path: string,
): Promise<Response> {
  const request = within(context, path + new URL(context.req.url).search);
  alone.add(request);
  return app.request(request, undefined, context.env);
}

export interface Frame {
  // Outermost first.
  layouts: Client<ComponentType<{ children: ReactNode }>>[];
  loading?: Client<ComponentType>;
}

/**
 * The frame of a screen request, or undefined for one that has none: a
 * nested route's own, or an in-process one. The root's `/_layout` is the
 * app's root layout, not a frame.
 */
export async function frameOf(
  app: Hono<any, any, any>,
  context: Context,
): Promise<Frame | undefined> {
  const path = context.req.path;
  if (
    context.req.method !== "GET" ||
    captures.has(context.req.raw) ||
    alone.has(context.req.raw) ||
    path.endsWith("/_layout") ||
    path.endsWith("/_loading")
  ) {
    return undefined;
  }
  const segments = path.split("/").filter((segment) => segment !== "");
  const parents = segments.map(
    (_, index) => "/" + segments.slice(0, index + 1).join("/"),
  );
  const [loading, ...layouts] = await Promise.all([
    nested(app, context, (path === "/" ? "" : path) + "/_loading"),
    ...parents.map((parent) => nested(app, context, parent + "/_layout")),
  ]);
  return {
    layouts: layouts.filter(
      (layout) => layout !== undefined,
    ) as Frame["layouts"],
    loading: loading as Frame["loading"],
  };
}

/** `inner` inside the frame's layouts. */
export function framed(frame: Frame, inner: Spliceable): Spliceable {
  let framed = inner;
  for (const Layout of [...frame.layouts].reverse()) {
    const children = framed;
    framed = cs`<$Layout>{$children as ReactNode}</$Layout>`;
  }
  return framed;
}

/** The frame answered at once: its loading state until the page is in. */
export function loadingFrame(
  frame: Frame & { loading: Client<ComponentType> },
  href: string,
): Spliceable {
  const Loading = frame.loading;
  return framed(
    frame,
    cs`<$Suspense fallback={<$Loading />}>{${(<Route href={href} />)}}</$Suspense>`,
  );
}
