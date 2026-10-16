import { createImport } from "@backtickjs/core";
import type * as SafeArea from "react-native-safe-area-context";

// Safe Area Context's API as a script splices it — `$useSafeAreaInsets()`,
// `<$SafeAreaView>` — each typed with its own declarations, and each required
// from `react-native-safe-area-context` by the app that runs the bundle.
// Internal: the adapter mirrors it, name for name.

// The react-native-safe-area-context every name is typed against: the adapter's
// version, and its `react-native-safe-area-context` dependency.
const version = "5.7.0";

export const safeArea = <Name extends keyof typeof SafeArea>(name: Name) =>
  createImport<(typeof SafeArea)[Name]>({
    name,
    from: "react-native-safe-area-context",
    version,
  });
