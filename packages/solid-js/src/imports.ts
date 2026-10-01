import { createImport } from "@backtickjs/core";
import type * as Solid from "solid-js";
import type * as Store from "solid-js/store";
import type * as Web from "solid-js/web";

// Solid's API as a script splices it — `$createSignal(0)` — each typed with
// Solid's own declarations, and each imported from Solid by the bundle that
// uses it. Internal: the adapter's modules mirror Solid's, name for name.

// What every name needs: the Solid it is typed against (the adapter's version,
// and its `solid-js` dependency), or a later 1.x.
const range = "^1.9.14";

export const solid = <Name extends keyof typeof Solid>(name: Name) =>
  createImport<(typeof Solid)[Name]>({
    name,
    from: "solid-js",
    version: range,
  });

export const store = <Name extends keyof typeof Store>(name: Name) =>
  createImport<(typeof Store)[Name]>({
    name,
    from: "solid-js/store",
    version: range,
  });

export const web = <Name extends keyof typeof Web>(name: Name) =>
  createImport<(typeof Web)[Name]>({
    name,
    from: "solid-js/web",
    version: range,
  });
