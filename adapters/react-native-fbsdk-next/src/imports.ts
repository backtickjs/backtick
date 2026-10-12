import { createImport } from "@backtickjs/core";
import type * as Fbsdk from "react-native-fbsdk-next";

// React Native FBSDK Next's API as a script splices it —
// `$LoginManager.logInWithPermissions(…)`, `$AccessToken` — each typed with its
// own declarations, and each required from `react-native-fbsdk-next` by the app
// that runs the bundle. Internal: the adapter mirrors it, name for name.

// What every name needs: the react-native-fbsdk-next it is typed against (the
// adapter's version, and its `react-native-fbsdk-next` dependency), or a later
// 13.x.
const range = "^13.4.3";

export const fbsdk = <Name extends keyof typeof Fbsdk>(name: Name) =>
  createImport<(typeof Fbsdk)[Name]>({
    name,
    from: "react-native-fbsdk-next",
    version: range,
  });
