import { createImport } from "@backtickjs/core";
import type * as ExpoCrypto from "expo-crypto";

// Expo Crypto's API as a script splices it — `$digestStringAsync(…)`,
// `$randomUUID()` — each typed with its own declarations, and each required
// from `expo-crypto` by the app that runs the bundle. Internal: the adapter
// mirrors it, name for name.

// The expo-crypto every name is typed against: the adapter's version, and its
// `expo-crypto` dependency.
const version = "57.0.4";

export const crypto = <Name extends keyof typeof ExpoCrypto>(name: Name) =>
  createImport<(typeof ExpoCrypto)[Name]>({
    name,
    from: "expo-crypto",
    version,
  });
