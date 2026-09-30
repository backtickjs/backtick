import { transformSync } from "@babel/core";
import type { Plugin } from "@backtickjs/bundler";
import preset from "babel-preset-solid";

/**
 * Solid's compiler as a bundler plugin: the bundle's JSX as Solid's template
 * and DOM code, importing from `solid-js/web`.
 */
export function solid(): Plugin {
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
