import { bundler, BundlerError, type Modules } from "@backtickjs/bundler";
import type { Spliceable, SplicesAs } from "@backtickjs/core";
import type { Hono, MiddlewareHandler } from "hono";
import { runtime } from "./runtime.js";

export type { Runtime } from "./runtime.js";

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

// The app's _layout and _loading routes, for the runtime to fetch only those.
function nestedRoutes(app: Hono<any, any, any> | undefined): string[] {
  return (app?.routes ?? [])
    .filter(
      ({ method, path }) =>
        method === "GET" &&
        (path.endsWith("/_layout") || path.endsWith("/_loading")),
    )
    .map(({ path }) => path);
}

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
 * `/.well-known/backtick/runtime`, with the app's `_layout` and `_loading`
 * routes, read from `app` as a request comes in. A client with a navigator of
 * its own needs neither, nor `app`.
 *
 *     const RootLayout = cs`() => <$Stack />`;
 *     app.get("/_layout", (context) => context.render(RootLayout));
 */
export function backtick(app?: Hono<any, any, any>): MiddlewareHandler {
  return async (context, next) => {
    context.setRenderer(async (input) => {
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
    });
    if (context.req.path === runtimePath) {
      return context.render(runtime(nestedRoutes(app)));
    }
    await next();
  };
}
