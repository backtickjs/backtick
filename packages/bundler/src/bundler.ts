import { buildBundle } from "./bundle/buildBundle.js";
import type { JsxModule } from "./JsxModule.js";
import { printBundle } from "./print/printBundle.js";
import type { Spliceable } from "@backtickjs/platform-sdk";

/**
 * What runs your components and hands back what they drew.
 *
 *     const module = await bundler.run(<Home />);
 *
 * A namespace rather than a bare function, so `bundle` stays a name a caller
 * can give what comes back. What comes back is a JSX module, and its source
 * map, for the framework's compiler to make a bundle of.
 */
export const bundler = {
  async run<T>(
    value: Spliceable<T>,
  ): Promise<JsxModule<T>> {
    return printBundle(await buildBundle(value));
  },
};
