import { bundler, BundlerError, type Modules } from "@backtickjs/bundler";
import type { Client, Spliceable, SplicesAs } from "@backtickjs/core";
import type { ComponentType } from "react";
import type { Hono, MiddlewareHandler } from "hono";
import { capture, nested } from "./frame.js";
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
 * The Backtick app opens an app from one answer, which `backtick(app)` sends
 * from `/.well-known/backtick/runtime`: the client code that fetches, keeps
 * and shows its screens, around the app's root layout, its `/_layout` route,
 * a client component that renders the app's `Stack`. A client with a
 * navigator of its own needs neither, nor `app`.
 *
 *     const RootLayout = cs`() => <$Stack />`;
 *     app.get("/_layout", (context) => context.render(RootLayout));
 *
 * Every route answers alone, and the runtime composes a screen as Next.js
 * nests a page: inside the layouts of its path and its parents', the client
 * components their `_layout` routes render, which take the screen as
 * `children`; and, with a `_loading` route, a client component without props,
 * inside a Suspense showing it. The runtime queries each by its path, in
 * parallel, asking only for those the app has routes for, which it's sent
 * when it opens. A navigation to a route with a
 * `_loading` shows once its layouts and loading state are in, and to one
 * without, once its page is; the current screen stays meanwhile.
 */
export function backtick(app?: Hono<any, any, any>): MiddlewareHandler {
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
    const path = context.req.path;
    if (app !== undefined && path === runtimePath) {
      // The runtime asks for a layout or a loading state without a trailing
      // slash, which a strict app doesn't answer.
      const slashed = app.routes.find(({ path }) =>
        /\/_(layout|loading)\/$/.test(path),
      );
      if (slashed !== undefined) {
        throw new Error(
          `The app's ${slashed.path} route ends with a slash: write it ${slashed.path.slice(0, -1)}.`,
        );
      }
      const RootLayout = await nested(app, context, "/_layout");
      if (RootLayout === undefined) {
        throw new Error(
          "The app has no /_layout route, its root layout, which renders its Stack.",
        );
      }
      // The app's other layouts and loading states, by pattern.
      const routes = new Set(
        app.routes
          .filter(
            ({ method, path }) =>
              (method === "GET" || method === "ALL") &&
              /\/_(layout|loading)$/.test(path) &&
              path !== "/_layout",
          )
          .map(({ path }) => path),
      );
      return context.render(
        runtime(
          new URL(context.req.url).origin,
          context.req.header("x-backtick-modules") ?? "{}",
          RootLayout as Client<ComponentType>,
          [...routes],
        ),
      );
    }
    await next();
  };
}
