import { transformSync } from "@babel/core";
import preset from "babel-preset-solid";

/**
 * Solid's compiler as a build's compile step: a script's module, its JSX as
 * Solid's template and DOM code, importing from `solid-js/web`. Typed by its
 * shape, which is the compiler's `Plugin`, so the adapter needn't depend on the
 * compiler.
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

// What a project names to compile its scripts for Solid, in its `package.json`:
// `"backtick": { "plugins": ["@backtickjs/solid-js/plugin"] }`.
export default solid;
