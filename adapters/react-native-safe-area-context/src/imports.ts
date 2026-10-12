import { createImport } from "@backtickjs/core";
import type * as SafeArea from "react-native-safe-area-context";

// Safe Area Context's API as a script splices it — `$useSafeAreaInsets()`,
// `<$SafeAreaView>` — each typed with its own declarations, and each required
// from `react-native-safe-area-context` by the app that runs the bundle.
// Internal: the adapter mirrors it, name for name.

// What every name needs: the react-native-safe-area-context it is typed
// against (the adapter's version, and its `react-native-safe-area-context`
// dependency), or a later 5.x.
const range = "^5.7.0";

export const safeArea = <Name extends keyof typeof SafeArea>(name: Name) =>
  createImport<(typeof SafeArea)[Name]>({
    name,
    from: "react-native-safe-area-context",
    version: range,
  });
