import { bundler } from "@backtickjs/bundler";
import type { Spliceable } from "@backtickjs/core";
import { importMap } from "./importMap.js";
import { solid } from "./plugin.js";

/**
 * A value as a module a page imports: built with Solid's compiler, against
 * the modules a Solid client provides, its default export the value itself.
 * To draw with Solid's `render`, bundle a function that draws
 * (`() => <App />`), as `render` takes one.
 */
export async function bundle(
  value: Spliceable,
): Promise<{ code: string; map: string }> {
  const built = await bundler.build({
    input: value,
    external: Object.keys(importMap.imports),
    plugins: [solid()],
  });
  const { code, map } = built.generate({ format: "es" });
  return { code, map };
}
