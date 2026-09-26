import { transformSync } from "@babel/core";
import type { JsxModule } from "@backtickjs/bundler";
import solid from "babel-preset-solid";

/**
 * Code compiled by Solid's own compiler: its JSX as template and DOM code, and
 * its map — into the code it was given, or through `inputSourceMap` into what
 * that code's own map leads to. The map carries no `sourcesContent`.
 */
export function transform(code: string, id: string, inputSourceMap?: string) {
  const result = transformSync(code, {
    filename: id,
    babelrc: false,
    configFile: false,
    sourceMaps: true,
    inputSourceMap:
      inputSourceMap === undefined ? undefined : JSON.parse(inputSourceMap),
    presets: [[solid, { moduleName: "solid-js/web", generate: "dom" }]],
  });
  const { sourcesContent: _, ...map } = result!.map!;
  return { code: result!.code!, map: JSON.stringify(map) };
}

/**
 * A bundle of what the bundler answered, compiled by Solid's compiler, and its
 * map into the host files its scripts were written in.
 */
export function compile(module: JsxModule): { code: string; map: string } {
  return transform(module.code, "bundle.jsx", module.map);
}
