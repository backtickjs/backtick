import type { Bundle, Spliceable, Spliced, SplicesAs } from "@backtickjs/core";
import { buildBundle } from "./bundle/buildBundle.js";
import type { Modules } from "./modules.js";
import { printBundle } from "./print/printBundle.js";

export interface BuildOptions<T = Spliceable> {
  // What to bundle: what a splice could carry, checked as a splice checks it.
  readonly input: T;
  // The modules the client provides, by specifier, each at its package's
  // exact version: left out of the bundle, which requires them. A script's
  // import from any other, or needing a version it doesn't have, throws.
  readonly modules: Modules;
}

export interface OutputOptions {
  // `"es"`, an ES module, for a page; `"cjs"`, CommonJS, for a client that
  // hands the bundle `require` itself, as a React Native app does.
  readonly format: "es" | "cjs";
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
  generate(options: OutputOptions): OutputChunk<T>;
}

/**
 * What runs your components and hands back what they drew, shaped as Rollup
 * is: a build, then output from it.
 *
 *     const build = await bundler.build({ input: <Home />, modules });
 *     const { code, map } = build.generate({ format: "es", sourcemap: "hidden" });
 *
 * `code` is the bundle, a module whose default export is the value (CommonJS:
 * `module.exports`). A namespace rather than a bare function, so `build`
 * stays a name a caller can give what comes back.
 */
export const bundler = {
  async build<T extends [T] extends [SplicesAs<T>] ? unknown : Spliceable>({
    input,
    modules,
  }: BuildOptions<T>): Promise<Build<Spliced<T>>> {
    // Scripts come compiled for their framework when their host was built, so
    // the bundle is only put together: nothing is compiled or parsed here.
    const tree = await buildBundle(input, modules);
    return {
      generate: ({ format, sourcemap = false }) => {
        const printed = printBundle(tree, format);
        const code = printed.code as Bundle<Spliced<T>>;
        const map = printed.map;
        if (sourcemap === false) {
          return { code, map: null };
        }
        if (sourcemap === "hidden") {
          return { code, map };
        }
        const url = `data:application/json;charset=utf-8,${encodeURIComponent(map)}`;
        return {
          code: `${code}\n//# sourceMappingURL=${url}` as Bundle<Spliced<T>>,
          map,
        };
      },
    };
  },
};
