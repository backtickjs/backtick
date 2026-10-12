import { createImport } from "@backtickjs/core";
import type * as Fiber from "@react-three/fiber";
import type * as FiberNative from "@react-three/fiber/native";

// React Three Fiber's API as a script splices it — `<$Canvas>`,
// `$useFrame(…)` — each typed with R3F's own declarations, and each required
// by the app that runs the bundle: from `@react-three/fiber` on the web, from
// its native build in React Native. Internal: the adapter mirrors both, name
// for name.

// What every name needs: the R3F it is typed against (the adapter's version,
// and its `@react-three/fiber` dependency), or a later 9.x.
const range = "^9.8.1";

export const fiber = <Name extends keyof typeof Fiber>(name: Name) =>
  createImport<(typeof Fiber)[Name]>({
    name,
    from: "@react-three/fiber",
    version: range,
  });

export const fiberNative = <Name extends keyof typeof FiberNative>(
  name: Name,
) =>
  createImport<(typeof FiberNative)[Name]>({
    name,
    from: "@react-three/fiber/native",
    version: range,
  });
