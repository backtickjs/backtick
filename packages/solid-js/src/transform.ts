import { transformSync } from "@babel/core";
import solid from "babel-preset-solid";

/**
 * A script's module compiled by Solid's own compiler (see backtick's
 * `CodeTransform`): its JSX as template and DOM code, its map into the code
 * it was given.
 */
export function transform(code: string, id: string) {
  const result = transformSync(code, {
    filename: id,
    babelrc: false,
    configFile: false,
    sourceMaps: true,
    presets: [[solid, { moduleName: "solid-js/web", generate: "dom" }]],
  });
  return { code: result!.code!, map: JSON.stringify(result!.map) };
}
