import { transformSync } from "@babel/core";
import preset from "babel-preset-solid";

/**
 * Solid's compiler as a bundler plugin: the bundle's JSX as Solid's template
 * and DOM code, importing from `solid-js/web`. Typed by its shape, which is the
 * bundler's `Plugin`, so the adapter needn't depend on the bundler.
 */
export function solid(): (
  code: string,
  id: string,
) => { code: string; map: string } {
  return (code, id) => {
    const result = transformSync(code, {
      filename: id,
      babelrc: false,
      configFile: false,
      sourceMaps: true,
      presets: [[preset, { moduleName: "solid-js/web", generate: "dom" }]],
    })!;
    return { code: result.code!, map: JSON.stringify(result.map) };
  };
}

// What a build names to compile scripts for Solid: `@backtickjs/solid-js/plugin`
// in the `tspatch` plugin's `plugins`, or imported by a Bun preload.
export default solid;
