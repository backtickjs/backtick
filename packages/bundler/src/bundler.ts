import type { Bundle } from "@backtickjs/platform-sdk";
import { buildBundle } from "./bundle/buildBundle.js";
import { type CodeTransform, printBundle } from "./print/printBundle.js";
import type { ClientUnknown, Spliceable } from "@backtickjs/platform-sdk";

/** How a bundle is made. */
export interface BundleOptions {
  /** The adapter's, which compiles the bundle. */
  readonly transform: CodeTransform;
  /**
   * Ends the bundle with its source map, inline, into the host files its
   * scripts were written in. Off by default: it is about as large again as
   * the bundle.
   */
  readonly sourceMap?: boolean;
}

/**
 * What runs your components and hands back what they drew.
 *
 *     import { transform } from "@backtickjs/solid-js/transform";
 *     const bundle = await bundler.run(<Home />, { transform });
 *
 * A namespace rather than a bare function, so `bundle` stays a name a caller
 * can give what comes back. The bundle is a module, whose default export draws
 * what the value drew.
 */
export const bundler = {
  async run<T extends ClientUnknown>(
    value: Spliceable<T>,
    options: BundleOptions,
  ): Promise<Bundle<T>> {
    return printBundle(
      await buildBundle(value),
      options.transform,
      options.sourceMap ?? false,
    );
  },
};
