import { fileURLToPath } from "node:url";
import { createBuilds, DeprecatedBuild } from "@backtickjs/builds";
import { bundler } from "@backtickjs/bundler";
import type { JSX } from "@backtickjs/react/jsx-runtime";
import type { Context } from "hono";
import { AppUpdateRequired } from "./AppUpdateRequired.js";

// Your app's builds: each sends its id, and a screen is bundled for the
// modules that build carries, from moduleMap.ts. A build in users' hands
// keeps working as your app moves on, once registered: see builds/.
const builds = createBuilds({
  projectRoot: fileURLToPath(new URL("..", import.meta.url)),
});

/**
 * `element` as the response to a request from your app: bundled for the
 * modules the requesting build carries, or, for a build you retired, a
 * screen asking to update, bundled for what it has.
 */
export async function screen(context: Context, element: JSX.Element) {
  let input = element;
  let modules;
  try {
    modules = builds.modulesOf(context.req.header("x-build-id") || null);
  } catch (error) {
    if (!(error instanceof DeprecatedBuild)) throw error;
    input = <AppUpdateRequired />;
    modules = error.modules;
  }
  const bundle = await bundler.build({ input, modules });
  const { code } = bundle.generate({ format: "cjs" });
  return context.body(code, 200, { "content-type": "text/javascript" });
}
