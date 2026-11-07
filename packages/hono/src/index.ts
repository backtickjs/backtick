import { bundler, BundlerError, type Modules } from "@backtickjs/bundler";
import type { Spliceable, SplicesAs } from "@backtickjs/core";
import type { Hono, MiddlewareHandler } from "hono";
import { contextStorage } from "hono/context-storage";
import { capture, framed, frameOf, loadingFrame } from "./frame.js";
import { runtime } from "./runtime.js";

export { Route } from "./route.js";
export type { Runtime, RuntimeOptions } from "./runtime.js";

declare module "hono" {
  // What `context.render` takes under `backtick()`, as
  // `jsxRenderer()` types its own.
  interface ContextRenderer {
    <T extends [T] extends [SplicesAs<T>] ? unknown : Spliceable>(
      input: T,
    ): Promise<Response>;
  }
}

// Where the phone fetches the runtime it runs an app with.
const runtimePath = "/.well-known/backtick/runtime";

/**
 * Hono's renderer for Backtick screens: under it, `context.render(input)`
 * answers with `input` bundled for the modules the client sent in
 * `x-backtick-modules`, so each route is a screen.
 *
 *     app.use(backtick(app));
 *     app.get("/", (context) => context.render(<Home />));
 *
 * The status is the context's, so `context.status(404)` makes a not-found
 * screen, and screens are `no-store`: each opens as its latest copy. A client
 * without a module the screen needs gets a 426, and any other refusal of the
 * bundler's a 400, each with `{ name, message }`.
 *
 * The Backtick app opens an app with two answers, fetched together: the
 * app's `/_layout` route, its root layout, a client component around every
 * screen that renders the app's `Stack`; and the client code that fetches,
 * keeps and shows its screens, which `backtick()` sends from
 * `/.well-known/backtick/runtime`. A client with a navigator of its own needs
 * neither.
 *
 *     const RootLayout = cs`() => <$Stack />`;
 *     app.get("/_layout", (context) => context.render(RootLayout));
 *
 * As in Next.js, a screen is drawn inside the layouts of its path and its
 * parents', the client components their `_layout` routes render, which take
 * the screen as `children`. A route with a `_loading` route, a client
 * component without props, answers at once, with its layouts and the
 * loading state, and the phone then fetches the screen itself; a navigation
 * to a route without one holds the current screen until the next is in. Unlike
 * Next.js's, layouts are drawn again for each screen pushed. `backtick()`
 * asks `app` for these routes, in-process, as a screen is requested.
 */
export function backtick(app?: Hono<any, any, any>): MiddlewareHandler {
  // The request, for a Route among the screen's server components.
  const storage = contextStorage();
  return async (context, next) => {
    const bundle = async (input: Spliceable) => {
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
        context.header(
          "vary",
          "x-backtick-modules, x-backtick-origin, x-backtick-route",
        );
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
    };
    context.setRenderer(
      async (input) => capture(context, input) ?? bundle(input as Spliceable),
    );
    if (context.req.path === runtimePath) {
      return context.render(runtime);
    }
    let response: Response | undefined;
    await storage(context, async () => {
      const frame = app === undefined ? undefined : await frameOf(app, context);
      if (frame?.loading !== undefined) {
        const { pathname, search } = new URL(context.req.url);
        response = await bundle(
          loadingFrame({ ...frame, loading: frame.loading }, pathname + search),
        );
        return;
      }
      if (frame !== undefined && frame.layouts.length > 0) {
        context.setRenderer(
          async (input) =>
            capture(context, input) ??
            bundle(framed(frame, input as Spliceable)),
        );
      }
      await next();
    });
    return response;
  };
}
