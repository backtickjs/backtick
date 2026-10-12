import { createImport } from "@backtickjs/core";
import type * as Font from "expo-font";

// Expo Font's API as a script splices it — `$useFonts(…)` — each typed with
// its own declarations, and each required from `expo-font` by the app that
// runs the bundle. Internal: the adapter mirrors it, name for name.

// What every name needs: the expo-font it is typed against (the adapter's
// version, and its `expo-font` dependency), or a later 57.x.
const range = "^57.0.4";

export const font = <Name extends keyof typeof Font>(name: Name) =>
  createImport<(typeof Font)[Name]>({
    name,
    from: "expo-font",
    version: range,
  });
