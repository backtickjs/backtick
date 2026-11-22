import type { Bundle, Client } from "@backtickjs/core";
import { buildBundle } from "./bundle/buildBundle.js";
import { BundlerError } from "./errors.js";
import { buildingFor } from "./supports.js";
import { isModules, type Modules } from "./modules.js";
import { printBundle } from "./print/printBundle.js";

export interface BuildOptions<T = unknown> {
  // What to bundle: a value the client computes as a `T`, an element or a
  // script. Plain data goes in a script: cs`${value}`.
  readonly input: Client<T>;
  // The modules the client provides, by specifier, each at its package's
  // exact version: left out of the bundle, which requires them. A script's
  // import from any other, or needing a version it doesn't have, throws.
  readonly modules: Modules;
}

export interface OutputOptions {
  // A map into the host files, as Rollup's: `"inline"` appends the map to the
  // code as a `data:` URL, and `"hidden"` answers it alone. None by default.
  // It carries host files' names and lines, not their content, which stays
  // the server's.
  readonly sourcemap?: false | "inline" | "hidden";
}

/**
 * What `generate` writes: the bundle, which runs to a `T`, and its map where
 * one was asked for.
 */
export interface OutputChunk<T = unknown> {
  readonly code: Bundle<T>;
  readonly map: string | null;
}

/** What `build` makes of a value that is a `T` on the client, written out by
 * `generate`. */
export interface Build<T = unknown> {
  generate(options?: OutputOptions): OutputChunk<T>;
}

/**
 * What runs your components and hands back what they drew, shaped as Rollup
 * is: a build, then output from it.
 *
 *     const build = await bundler.build({ input: <Home />, modules });
 *     const { code, map } = build.generate({ sourcemap: "hidden" });
 *
 * `code` is the bundle, the body of a function of `module`, `exports` and
 * `require`, whose `module.exports` is the value. A namespace rather than a bare function, so `build`
 * stays a name a caller can give what comes back.
 */
export const bundler = {
  async build<T>({ input, modules }: BuildOptions<T>): Promise<Build<T>> {
    if (!isModules(modules)) {
      throw new BundlerError(
        `The modules aren't { specifier: version }: ${JSON.stringify(modules)?.slice(0, 80)}`,
      );
    }
    // Scripts come compiled for their framework when their host was built, so
    // the bundle is only put together: nothing is compiled or parsed here.
    const tree = await buildingFor(modules, () => buildBundle(input, modules));
    return {
      generate: ({ sourcemap = false } = {}) => {
        const printed = printBundle(tree);
        const code = printed.code as Bundle<T>;
        const map = printed.map;
        if (sourcemap === false) {
          return { code, map: null };
        }
        if (sourcemap === "hidden") {
          return { code, map };
        }
        const url = `data:application/json;charset=utf-8,${encodeURIComponent(map)}`;
        return {
          code: `${code}\n//# sourceMappingURL=${url}` as Bundle<T>,
          map,
        };
      },
    };
  },
};
