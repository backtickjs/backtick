import type { Spliceable } from "@backtickjs/core";
import { buildBundle } from "./bundle/buildBundle.js";
import { printBundle } from "./print/printBundle.js";

export interface BuildOptions {
  // What to bundle.
  readonly input: Spliceable;
  // The packages the client provides, each at its exact version. A script's
  // import from any other, or needing a version it doesn't have, throws.
  readonly external: Readonly<Record<string, string>>;
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

/**
 * What runs your components and hands back what they drew, shaped as Rollup
 * is: a build, then output from it.
 *
 *     const bundle = await bundler.build({ input: <Home />, external });
 *     const { code, map } = bundle.generate({ format: "es", sourcemap: "hidden" });
 *
 * The module's default export is the value. A namespace rather than a bare
 * function, so `bundle` stays a name a caller can give what comes back.
 */
export const bundler = {
  async build({ input, external }: BuildOptions): Promise<Bundle> {
    // Scripts come compiled for their framework when their host was built, so
    // the bundle is only put together: nothing is compiled or parsed here.
    const { code, map } = printBundle(await buildBundle(input, external));
    return {
      generate: ({ sourcemap = false }) => {
        if (sourcemap === false) {
          return { code, map: null };
        }
        if (sourcemap === "hidden") {
          return { code, map };
        }
        const url = `data:application/json;charset=utf-8,${encodeURIComponent(map)}`;
        return { code: `${code}\n//# sourceMappingURL=${url}`, map };
      },
    };
  },
};
