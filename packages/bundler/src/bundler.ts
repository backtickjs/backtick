import { lowerSpliceable } from "./ast/lowerSpliceable.js";
import type { Bundle } from "./bundle/Bundle.js";
import { buildBundle } from "./bundle/buildBundle.js";
import type { Spliceable } from "@backtickjs/boundary";

/**
 * What is being tried rather than offered: a feature here is one whose premise
 * nothing has demonstrated yet, and a bundle built with one is not a bundle
 * every client reads.
 *
 * Reached through {@link bundler.runWithExperimentalFeatures} and nowhere
 * else, so what uses one says so on the line that uses it.
 */
export interface ExperimentalFeatures {
  /**
   * Names a `functions` entry the same way in every response that carries the
   * script, rather than for where it landed in this one's table.
   *
   * A table position follows the order a composition reached things, so it says
   * nothing across responses; a name that holds is one a client could recognize
   * in an entry it kept from an earlier response. Could: no client keeps them,
   * so what this buys is unmeasured, and what it costs is bytes — the name is
   * `<fileHash>:<line>:<char>` where the other is a number. That is the
   * experiment.
   */
  readonly stableFunctionLabels?: boolean;
}

/**
 * What runs your components and hands back what they drew.
 *
 *     const bundle = await bundler.run(<Home />);
 *
 * A namespace rather than a bare function, so `bundle` stays a name a caller
 * can give what comes back. The bundle is plain data; serialize it with
 * `JSON.stringify`.
 */
export const bundler = {
  async run(value: Spliceable): Promise<Bundle> {
    return await bundler.runWithExperimentalFeatures(value, {});
  },

  /**
   * As {@link bundler.run}, with features that are being tried.
   *
   *     await bundler.runWithExperimentalFeatures(<Home />, {
   *       stableFunctionLabels: true,
   *     });
   *
   * Named at length on purpose: what it admits may change or go, and a call
   * site is where that is worth reading. Everything settled is `run`.
   */
  async runWithExperimentalFeatures(
    value: Spliceable,
    features: ExperimentalFeatures,
  ): Promise<Bundle> {
    const ast = await lowerSpliceable(value);
    return buildBundle(ast, features);
  },
};
