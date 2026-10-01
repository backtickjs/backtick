import remapping from "@jridgewell/remapping";
import type { Spliceable } from "@backtickjs/core";
import { buildBundle } from "./bundle/buildBundle.js";
import type { JsxModule } from "./JsxModule.js";
import { printBundle } from "./print/printBundle.js";

/**
 * A step of the build: the bundle's code in, code and its map out, the map
 * into the code it was given. A framework's compile step is one (Solid's runs
 * `babel-preset-solid`). `id` names the bundle, and ends in `.jsx`, as its
 * code is JSX.
 */
export type Plugin = (
  code: string,
  id: string,
) => JsxModule | Promise<JsxModule>;

export interface BuildOptions {
  // What to bundle.
  readonly input: Spliceable;
  // The packages the client provides, each at its exact version. A script's
  // import from any other, or needing a version it doesn't have, throws.
  readonly external: Readonly<Record<string, string>>;
  // Run in order over the bundle's module.
  readonly plugins?: readonly Plugin[];
}

/** A built bundle, written out by `generate`. */
export interface Bundle {
  generate(options: { readonly format: "es" }): JsxModule;
}

// What a plugin is told the bundle is.
const ID = "bundle.jsx";

/**
 * What runs your components and hands back what they drew, shaped as Rollup
 * is: a build, then output from it.
 *
 *     const bundle = await bundler.build({ input: <Home />, external, plugins });
 *     const { code, map } = bundle.generate({ format: "es" });
 *
 * The module's default export is the value. A namespace rather than a bare
 * function, so `bundle` stays a name a caller can give what comes back.
 */
export const bundler = {
  async build({
    input,
    external,
    plugins = [],
  }: BuildOptions): Promise<Bundle> {
    const printed = printBundle(await buildBundle(input, external));
    let code = printed.code;
    // Latest first, as `remapping` reads a chain of maps.
    const maps = [printed.map];
    for (const plugin of plugins) {
      const result = await plugin(code, ID);
      code = result.code;
      maps.unshift(result.map);
    }
    const map = remapping(maps, () => null, {
      excludeContent: true,
    }).toString();
    return { generate: () => ({ code, map }) };
  },
};
