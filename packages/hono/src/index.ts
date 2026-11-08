import { bundler, BundlerError, type Modules } from "@backtickjs/bundler";
import type { Spliceable, SplicesAs } from "@backtickjs/core";
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
 * a new open always gets the latest copy. (The Backtick app fetches a page anew
 * for each navigation, as Next.js's router does.) A client
 * without a module the screen needs gets a 426, and any other refusal of the
 * bundler's a 400, each with `{ name, message }`. An app the Backtick app
 * opens uses `backtickApp(app)` instead.
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
 * `app`: the client code that fetches, keeps and shows its screens.
 *
 *     app.use(backtickApp(app));
 *     app.get("/_layout", (context) => context.render(cs`() => <$Stack />`));
 *     app.get("/", (context) => context.render(<Home />));
 *
 * Routes nest as Next.js's folders. `/_layout` is the root layout, a client
 * component drawing the navigator; an app without one doesn't open. A screen
 * is each segment's `_layout` (`/city/:id/_layout`, rendered for its path,
 * answering a client component given `children`), around its `_loading`
 * while what's under it loads, around the page. A loading state takes no
 * params, as in Next.js: it's fetched once for its pattern, and reading a
 * param throws. A navigation pushes once its layouts down to its first
 * loading state, and that loading state, are in; with none, once all of it
 * is. Layout and loading routes written with a trailing slash are refused.
 */
export function backtickApp(app: Hono<any, any, any>): MiddlewareHandler {
  const renderer = backtickRenderer();
  return async (context, next) => {
    if (context.req.path.endsWith("/_loading")) {
      context.req.param = () => {
        throw new Error(
          `${context.req.routePath} reads a param: a loading state takes none, as in Next.js. What depends on the path goes in a _layout.`,
        );
      };
    }
    if (context.req.method !== "GET" || context.req.path !== runtimePath) {
      return renderer(context, next);
    }
    const patterns = (name: string) => [
      ...new Set(
        app.routes
          .filter(({ method, path }) => method === "GET" && path.endsWith(name))
          .map(({ path }) => path),
      ),
    ];
    const misplaced = app.routes.find(
      ({ path }) => path.endsWith("/_layout/") || path.endsWith("/_loading/"),
    );
    if (misplaced !== undefined) {
      throw new Error(
        `The app's ${misplaced.path} route ends with a slash: write it ${misplaced.path.slice(0, -1)}.`,
      );
    }
    if (!patterns("/_layout").includes("/_layout")) {
      throw new Error(
        "The app has no /_layout route: it's the root layout, a client component drawing the navigator, as cs`() => <$Stack />`.",
      );
    }
    return bundled(
      context,
      clientRuntime(
        new URL(context.req.url).origin,
        context.req.header("x-backtick-modules") ?? "{}",
        { layouts: patterns("/_layout"), loadings: patterns("/_loading") },
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
