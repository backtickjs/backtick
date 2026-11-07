import { bundler, BundlerError, type Modules } from "@backtickjs/bundler";
import type { Client, Spliceable, SplicesAs } from "@backtickjs/core";
import type { ComponentType } from "react";
import type { Context, Hono, MiddlewareHandler } from "hono";
import { clientRuntime } from "./runtime.js";

export type { Runtime } from "./runtime.js";

declare module "hono" {
  // What `context.render` takes under `backtickRenderer()`, as
  // `jsxRenderer()` types its own.
  interface ContextRenderer {
    <T extends [T] extends [SplicesAs<T>] ? unknown : Spliceable>(
      input: T,
    ): Promise<Response>;
  }
}

/**
 * Hono's renderer for Backtick screens: under it, `context.render(input)`
 * answers with `input` bundled for the modules the client sent in
 * `x-backtick-modules`, so each route is a screen.
 *
 *     app.use(backtickRenderer());
 *     app.get("/", (context) => context.render(<Home />));
 *
 * The status is the context's, so `context.status(404)` makes a not-found
 * screen, and screens are `no-store`, kept out of HTTP caches: a reload or
 * a new open always gets the latest copy. (The Backtick app reuses a screen
 * it has, in memory, for 30 seconds, as Next.js's router does.) A client
 * without a module the screen needs gets a 426, and any other refusal of the
 * bundler's a 400, each with `{ name, message }`. An app the Backtick app
 * opens uses `backtickApp(app, RootLayout)` instead.
 */
export function backtickRenderer(): MiddlewareHandler {
  return async (context, next) => {
    context.setRenderer(async (input) => bundled(context, input as Spliceable));
    await next();
  };
}

/**
 * Hono's renderer for an app the Backtick app opens, as `backtickRenderer()`,
 * which also answers the runtime the Backtick app fetches when it opens
 * `app`: the client code that fetches, keeps and shows its screens, around
 * its root layout, a client component that draws its `Stack`.
 *
 *     const RootLayout = cs`() => <$Stack />`;
 *     app.use(backtickApp(app, RootLayout));
 *     app.get("/", (context) => context.render(<Home />));
 *
 * Every route answers with what it draws. As in Next.js, a route with a
 * `_loading` route (`/city/:id/_loading`, rendered for the path, so it can
 * show the city's name) pushes as soon as that's in, at once if it was
 * prefetched, and shows it until the route's answer is in; a navigation to
 * one without holds the current screen until its answer is in. The runtime
 * asks only for the loading states `app` has routes for. One with a layout
 * route (a screen has none: what screens share is a component they draw), or
 * with a loading route written with a trailing slash, doesn't open.
 */
export function backtickApp(
  app: Hono<any, any, any>,
  RootLayout: Client<ComponentType>,
): MiddlewareHandler {
  const renderer = backtickRenderer();
  return async (context, next) => {
    if (context.req.method !== "GET" || context.req.path !== runtimePath) {
      return renderer(context, next);
    }
    const misplaced = app.routes.find(
      ({ path }) => path.endsWith("/_loading/") || /\/_layout\/?$/.test(path),
    );
    if (misplaced !== undefined) {
      throw new Error(
        misplaced.path.endsWith("/_loading/")
          ? `The app's ${misplaced.path} route ends with a slash: write it ${misplaced.path.slice(0, -1)}.`
          : `The app's ${misplaced.path} route is a layout, which a screen doesn't have: the root layout is backtickApp(app, RootLayout)'s, and what screens share is a component they draw.`,
      );
    }
    // The app's loading states, by pattern.
    const loadings = app.routes
      .filter(
        ({ method, path }) => method === "GET" && path.endsWith("/_loading"),
      )
      .map(({ path }) => path);
    return bundled(
      context,
      clientRuntime(
        new URL(context.req.url).origin,
        context.req.header("x-backtick-modules") ?? "{}",
        RootLayout,
        [...new Set(loadings)],
      ),
    );
  };
}

// Where the Backtick app fetches the runtime it opens an app with.
const runtimePath = "/.well-known/backtick/runtime";

// `input` bundled for the modules the client sent, as the answer.
async function bundled(context: Context, input: Spliceable): Promise<Response> {
  let modules: Modules;
  try {
    modules = JSON.parse(context.req.header("x-backtick-modules") ?? "{}");
  } catch (error) {
    const { name, message } = error as SyntaxError;
    return context.json(
      { name, message: `x-backtick-modules isn't JSON: ${message}` },
      400,
    );
  }
  try {
    const build = await bundler.build({ input, modules });
    const { code } = build.generate({ format: "cjs" });
    context.header("content-type", "text/javascript");
    context.header("cache-control", "no-store");
    return context.body(code);
  } catch (error) {
    if (error instanceof BundlerError) {
      return context.json(
        { name: error.name, message: error.message },
        error.name === "ClientVersionMismatch" ? 426 : 400,
      );
    }
    throw error;
  }
}
