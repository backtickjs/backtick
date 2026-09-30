import { type PluginObj, transformSync, types as t } from "@babel/core";
import { bundler } from "@backtickjs/bundler";
import type { Spliceable } from "@backtickjs/core";
import solid from "babel-preset-solid";

/**
 * A value as a bundle a page or a test runs: what the bundler answers,
 * compiled by Solid's own compiler — its JSX as template and DOM code — with
 * its map through the bundler's into the host files its scripts were written
 * in. The map carries no `sourcesContent`.
 *
 * The module's default export is the value itself, as it was bundled: to draw
 * with Solid's `render`, bundle a function that draws (`() => <App />`), as
 * `render` takes one.
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
    plugins: [exportValue],
    presets: [[solid, { moduleName: "solid-js/web", generate: "dom" }]],
  });
  const { sourcesContent: _, ...map } = result!.map!;
  return { code: result!.code!, map: JSON.stringify(map) };
}

// The bundler writes the value as the module's last statement; a page imports
// it as the default export.
const exportValue: PluginObj = {
  visitor: {
    Program(path) {
      const last = path.get("body").at(-1);
      if (last === undefined || !last.isExpressionStatement()) {
        throw new Error("A bundle ends with the value it bundled.");
      }
      last.replaceWith(t.exportDefaultDeclaration(last.node.expression));
    },
  },
};
