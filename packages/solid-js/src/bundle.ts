import { transformSync } from "@babel/core";
import { bundler } from "@backtickjs/bundler";
import type { Spliceable } from "@backtickjs/core";
import solid from "babel-preset-solid";

/**
 * A value as a bundle a page or a test runs: what the bundler answers,
 * compiled by Solid's own compiler — its JSX as template and DOM code — with
 * its map through the bundler's into the host files its scripts were written
 * in. The map carries no `sourcesContent`.
 */
export async function bundle(
  value: Spliceable,
): Promise<{ code: string; map: string }> {
  const module = await bundler.run(value);
  const result = transformSync(module.code, {
    filename: "bundle.jsx",
    babelrc: false,
    configFile: false,
    sourceMaps: true,
    inputSourceMap: JSON.parse(module.map),
    presets: [[solid, { moduleName: "solid-js/web", generate: "dom" }]],
  });
  const { sourcesContent: _, ...map } = result!.map!;
  return { code: result!.code!, map: JSON.stringify(map) };
}
