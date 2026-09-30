import { transformSync } from "@babel/core";
import { bundler, type Plugin } from "@backtickjs/bundler";
import type { Spliceable } from "@backtickjs/core";
import solid from "babel-preset-solid";
import { modules } from "./index.js";

/**
 * Solid's compiler as a bundler plugin: the bundle's JSX as Solid's template
 * and DOM code, importing from `solid-js/web`.
 */
export const compile: Plugin = (code, id) => {
  const result = transformSync(code, {
    filename: id,
    babelrc: false,
    configFile: false,
    sourceMaps: true,
    presets: [[solid, { moduleName: "solid-js/web", generate: "dom" }]],
  })!;
  return { code: result.code!, map: JSON.stringify(result.map) };
};

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
    external: modules,
    plugins: [compile],
  });
  const { code, map } = built.generate({ format: "es" });
  return { code, map };
}
