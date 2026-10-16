import { createImport } from "@backtickjs/core";
import type * as FileSystem from "expo-file-system";

// Expo FileSystem's API as a script splices it — `new $File(uri)`,
// `$Paths.document` — each typed with its own declarations, and each required
// from `expo-file-system` by the app that runs the bundle. Internal: the
// adapter mirrors it, name for name.

// The expo-file-system every name is typed against: the adapter's version, and
// its `expo-file-system` dependency.
const version = "57.0.7";

export const fileSystem = <Name extends keyof typeof FileSystem>(name: Name) =>
  createImport<(typeof FileSystem)[Name]>({
    name,
    from: "expo-file-system",
    version,
  });
