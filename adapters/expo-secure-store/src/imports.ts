import { createImport } from "@backtickjs/core";
import type * as SecureStore from "expo-secure-store";

// SecureStore's API as a script splices it — `$getItemAsync(…)` — each typed
// with its own declarations, and each required from `expo-secure-store` by
// the app that runs the bundle. Internal: the adapter mirrors it, name for
// name.

// The expo-secure-store every name is typed against: the adapter's version, and
// its `expo-secure-store` dependency.
const version = "57.0.4";

export const secureStore = <Name extends keyof typeof SecureStore>(
  name: Name,
) =>
  createImport<(typeof SecureStore)[Name]>({
    name,
    from: "expo-secure-store",
    version,
  });
