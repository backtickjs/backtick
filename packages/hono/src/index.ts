import { bundler, BundlerError, type Modules } from "@backtickjs/bundler";
import type { Client, Spliceable, SplicesAs } from "@backtickjs/core";
import type { MiddlewareHandler } from "hono";

declare module "hono" {
  // What `context.render` takes under `backtick()`, as
  // `jsxRenderer()` types its own.
  interface ContextRenderer {
    <T extends [T] extends [SplicesAs<T>] ? unknown : Spliceable>(
      input: T,
    ): Promise<Response>;
  }
}

/** What the phone passes an app's root layout. */
export interface RootLayoutProps {
  /**
   * The screen a navigation is loading, until it arrives: `use()` it to keep
   * the current screen up meanwhile, as a transition does. Undefined when
   * nothing is loading.
   */
  navigating?: Promise<void>;
}

/**
 * Hono's renderer for Backtick screens: under it, `context.render(input)`
 * answers with `input` bundled for the modules the client sent in
 * `x-backtick-modules`, so each route is a screen.
 *
 *     app.use(backtick({ rootLayout: RootLayout }));
 *     app.get("/", (context) => context.render(<Home />));
 *
 * The status is the context's, so `context.status(404)` makes a not-found
 * screen, and screens are `no-store`: each opens as its latest copy. A client
 * without a module the screen needs gets a 426, and any other refusal of the
 * bundler's a 400, each with `{ name, message }`.
 *
 * `rootLayout` is the app's root layout, as expo-router's `app/_layout.tsx`
 * is one: a client component rendered once as the app opens and mounted while
 * its screens change. It renders the app's `Stack`, with its options, and
 * anything that outlives a screen; while a navigation's screen loads, it gets
 * `navigating`, which it `use()`s inside its own `Suspense` to keep the
 * current screen until the next arrives. The phone fetches it at
 * `/.well-known/backtick/root-layout`, outside the app's own paths. A client
 * with a navigator of its own never fetches it.
 *
 *     const RootLayout = cs`(props: RootLayoutProps) => (
 *       <$Suspense fallback={null}>
 *         <$HoldScreen navigating={props.navigating}><$Stack /></$HoldScreen>
 *       </$Suspense>
 *     )`;
 *     app.use(backtick({ rootLayout: RootLayout }));
 */
export function backtick(options: {
  rootLayout: Client<(props: RootLayoutProps) => unknown>;
}): MiddlewareHandler {
  const { rootLayout } = options;
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
    if (context.req.path === rootLayoutPath) {
      return context.render(rootLayout);
    }
    await next();
  };
}

// Where the phone fetches an app's root layout.
const rootLayoutPath = "/.well-known/backtick/root-layout";
