import { createImport } from "@backtickjs/core";
import type * as SecureStore from "expo-secure-store";

// SecureStore's API as a script splices it — `$getItemAsync(…)` — each typed
// with its own declarations, and each required from `expo-secure-store` by
// the app that runs the bundle. Internal: the adapter mirrors it, name for
// name.

// What every name needs: the expo-secure-store it is typed against (the
// adapter's version, and its `expo-secure-store` dependency), or a later
// 57.x.
const range = "^57.0.4";

export const secureStore = <Name extends keyof typeof SecureStore>(
  name: Name,
) =>
  createImport<(typeof SecureStore)[Name]>({
    name,
    from: "expo-secure-store",
    version: range,
  });
