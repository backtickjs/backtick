import type { SiteBuiltins } from "@backtickjs.com/schema";
import { compile, evalAndBundle } from "./compile.js";

/**
 * What this site answers for, beside what the web does.
 *
 * `SiteBuiltins` and not `Builtins`, which is every name in scope: a name added
 * to this site's schema stops this file compiling until it is answered.
 */
export const builtins: SiteBuiltins = { compile, evalAndBundle };
