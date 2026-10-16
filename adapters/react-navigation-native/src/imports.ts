import { createImport } from "@backtickjs/core";
import type * as Navigation from "@react-navigation/native";

// React Navigation's API as a script splices it — `$useNavigation()`,
// `$StackActions.push(…)` — each typed with React Navigation's own
// declarations, and each required from `@react-navigation/native` by the app
// that runs the bundle. Internal: the adapter mirrors it, name for name.

// The React Navigation every name is typed against: the adapter's version, and
// its `@react-navigation/native` dependency.
const version = "7.5.0";

export const navigation = <Name extends keyof typeof Navigation>(name: Name) =>
  createImport<(typeof Navigation)[Name]>({
    name,
    from: "@react-navigation/native",
    version,
  });
