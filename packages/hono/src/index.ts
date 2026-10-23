import { bundler, BundlerError, type Modules } from "@backtickjs/bundler";
import type { Spliceable, SplicesAs } from "@backtickjs/core";
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

/**
 * Hono's renderer for Backtick screens: under it, `context.render(input)`
 * answers with `input` bundled for the modules the client sent in
 * `x-backtick-modules`, so each route is a screen.
 *
 *     app.use(backtick());
 *     app.get("/", (context) => context.render(<Home />));
 *
 * A client without a module the screen needs gets a 426, and any other
 * refusal of the bundler's a 400, each with `{ name, message }`.
 */
export function backtick(): MiddlewareHandler {
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
        return context.body(code, 200, { "content-type": "text/javascript" });
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
    await next();
  };
}
