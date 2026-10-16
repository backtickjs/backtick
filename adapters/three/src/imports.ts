import { createImport } from "@backtickjs/core";
import type * as Three from "three";

// three's API as a script splices it — `new $Vector3(…)` — each typed with
// three's own declarations, and each required from three by the app that runs
// the bundle. Internal: the adapter mirrors `three`, name for name.

// The three every name is typed against: the adapter's version, and its `three`
// dependency.
const version = "0.182.0";

export const three = <Name extends keyof typeof Three>(name: Name) =>
  createImport<(typeof Three)[Name]>({
    name,
    from: "three",
    version,
  });
