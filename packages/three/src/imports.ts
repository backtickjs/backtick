import { createImport } from "@backtickjs/core";
import type * as Three from "three";

// three's API as a script splices it — `new $Vector3(…)` — each typed with
// three's own declarations, and each required from three by the app that runs
// the bundle. Internal: the adapter mirrors `three`, name for name.

// What every name needs: the three it is typed against (the adapter's
// version, and its `three` dependency), or a later 0.182.x: three breaks at
// each minor.
const range = "^0.182.0";

export const three = <Name extends keyof typeof Three>(name: Name) =>
  createImport<(typeof Three)[Name]>({
    name,
    from: "three",
    version: range,
  });
