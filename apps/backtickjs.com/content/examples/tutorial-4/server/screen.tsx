import { fileURLToPath } from "node:url";
import { createBuilds } from "@backtickjs/builds";
import { bundler } from "@backtickjs/bundler";
import type { JSX } from "@backtickjs/jsx-react/jsx-runtime";
import type { Context } from "hono";

// Your app's builds: each sends its id, and a screen is bundled for the
// modules that build carries, from client/moduleMap.ts. A build in users' hands
// keeps working as your app moves on, once registered: see builds/.
const builds = createBuilds({
  projectRoot: fileURLToPath(new URL("..", import.meta.url)),
});

/**
 * `element` as the response to a request from your app, bundled for the
 * modules the requesting build carries.
 */
export async function screen(context: Context, element: JSX.Element) {
  const modules = builds.modulesOf(context.req.header("x-build-id") ?? null);
  const bundle = await bundler.build({ input: element, modules });
  const { code } = bundle.generate({ format: "cjs" });
  return context.body(code, 200, { "content-type": "text/javascript" });
}
