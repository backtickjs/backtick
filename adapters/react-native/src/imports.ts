import { createImport } from "@backtickjs/core";
import type * as ReactNative from "react-native";

// React Native's API as a script splices it — `<$View>` — each typed with
// React Native's own declarations, and each required from React Native by the
// app that runs the bundle. Internal: the adapter mirrors `react-native`, name
// for name.

// What every name needs: the React Native it is typed against (the adapter's
// version, and its `react-native` dependency), or a later 0.86.x.
const range = "^0.86.3";

export const reactNative = <Name extends keyof typeof ReactNative>(
  name: Name,
) =>
  createImport<(typeof ReactNative)[Name]>({
    name,
    from: "react-native",
    version: range,
  });
