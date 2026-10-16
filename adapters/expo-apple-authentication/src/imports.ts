import { createImport } from "@backtickjs/core";
import type * as AppleAuthentication from "expo-apple-authentication";

// Expo Apple Authentication's API as a script splices it — `$signInAsync(…)`,
// `<$AppleAuthenticationButton>` — each typed with its own declarations, and
// each required from `expo-apple-authentication` by the app that runs the
// bundle. Internal: the adapter mirrors it, name for name.

// The expo-apple-authentication every name is typed against: the adapter's
// version, and its `expo-apple-authentication` dependency.
const version = "57.0.2";

export const appleAuthentication = <
  Name extends keyof typeof AppleAuthentication,
>(
  name: Name,
) =>
  createImport<(typeof AppleAuthentication)[Name]>({
    name,
    from: "expo-apple-authentication",
    version,
  });
