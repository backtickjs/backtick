import { parseModules } from "@backtickjs/builds";
import { bundler } from "@backtickjs/bundler";
import type { Spliceable } from "@backtickjs/core";
import type { Context } from "hono";

/**
 * `value` as the response to a request from your app, bundled for the
 * modules the requesting build carries, as client/moduleMap.ts offers them
 * at its packages' versions: here, a client component.
 */
export async function screen(context: Context, value: Spliceable) {
  const modules = parseModules(context.req.header("x-backtick-modules"));
  const bundle = await bundler.build({ input: value, modules });
  const { code } = bundle.generate({ format: "cjs" });
  return context.body(code, 200, { "content-type": "text/javascript" });
}
