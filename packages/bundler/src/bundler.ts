import remapping from "@jridgewell/remapping";
import { encodedMap, FlattenMap } from "@jridgewell/trace-mapping";
import type { Spliceable } from "@backtickjs/core";
import { buildBundle } from "./bundle/buildBundle.js";
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
) => { code: string; map: string } | Promise<{ code: string; map: string }>;

export interface BuildOptions {
  // What to bundle.
  readonly input: Spliceable;
  // The packages the client provides, each at its exact version. A script's
  // import from any other, or needing a version it doesn't have, throws.
  readonly external: Readonly<Record<string, string>>;
  // Run in order over the bundle's module.
  readonly plugins?: readonly Plugin[];
}

export interface OutputOptions {
  readonly format: "es";
  // A map into the host files, as Rollup's: `"inline"` appends the map to the
  // code as a `data:` URL, and `"hidden"` answers it alone. None by default.
  // It carries host files' names and lines, not their content, which stays
  // the server's.
  readonly sourcemap?: false | "inline" | "hidden";
}

/** What `generate` writes: the code, and its map where one was asked for. */
export interface OutputChunk {
  readonly code: string;
  readonly map: string | null;
}

/** A built bundle, written out by `generate`. */
export interface Bundle {
  generate(options: OutputOptions): OutputChunk;
}

// What a plugin is told the bundle is.
const ID = "bundle.jsx";

/**
 * What runs your components and hands back what they drew, shaped as Rollup
 * is: a build, then output from it.
 *
 *     const bundle = await bundler.build({ input: <Home />, external, plugins });
 *     const { code, map } = bundle.generate({ format: "es", sourcemap: "hidden" });
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
    // Latest first, as `remapping` reads a chain of maps. The bundle's own is
    // an index map, which `remapping` reads flattened.
    const maps =
      plugins.length === 0
        ? [printed.map]
        : [JSON.stringify(encodedMap(new FlattenMap(printed.map)))];
    for (const plugin of plugins) {
      const result = await plugin(code, ID);
      code = result.code;
      maps.unshift(result.map);
    }
    return {
      generate: ({ sourcemap = false }) => {
        if (sourcemap === false) {
          return { code, map: null };
        }
        const map =
          maps.length === 1
            ? maps[0]!
            : remapping(maps, () => null, { excludeContent: true }).toString();
        if (sourcemap === "hidden") {
          return { code, map };
        }
        const url = `data:application/json;charset=utf-8,${encodeURIComponent(map)}`;
        return { code: `${code}\n//# sourceMappingURL=${url}`, map };
      },
    };
  },
};
