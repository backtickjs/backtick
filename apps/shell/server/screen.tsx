import { bundler, BundlerError } from "@backtickjs/bundler";
import type { JSX } from "@backtickjs/jsx-react/jsx-runtime";
import type { Context } from "hono";

/**
 * `element` as the response to a request from the app, bundled for the
 * modules the requesting build carries, as client/moduleMap.ts offers them
 * at its packages' versions. A build without a module the screen needs gets
 * a 426, which the app answers with its update screen.
 */
export async function screen(context: Context, element: JSX.Element) {
  const modules = JSON.parse(context.req.header("x-backtick-modules") ?? "{}");
  try {
    const bundle = await bundler.build({ input: element, modules });
    const { code } = bundle.generate({ format: "cjs" });
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
}
