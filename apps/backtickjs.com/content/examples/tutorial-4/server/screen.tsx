import { bundler } from "@backtickjs/bundler";
import type { JSX } from "@backtickjs/jsx-react/jsx-runtime";
import type { Context } from "hono";

/**
 * `element` as the response to a request from your app, bundled for the
 * modules the requesting build carries, as client/moduleMap.ts offers them
 * at its packages' versions.
 */
export async function screen(context: Context, element: JSX.Element) {
  const modules = JSON.parse(context.req.header("x-backtick-modules") ?? "{}");
  const bundle = await bundler.build({ input: element, modules });
  const { code } = bundle.generate({ format: "cjs" });
  return context.body(code, 200, { "content-type": "text/javascript" });
}
