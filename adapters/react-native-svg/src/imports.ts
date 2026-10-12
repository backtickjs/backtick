import { createImport } from "@backtickjs/core";
import type * as ReactNativeSvg from "react-native-svg";

// React Native SVG's API as a script splices it — `<$Svg>`, `<$Path>`,
// `<$SvgXml>` — each typed with its own declarations, and each required from
// `react-native-svg` by the app that runs the bundle. Internal: the adapter
// mirrors it, name for name.

// What every name needs: the react-native-svg it is typed against (the
// adapter's version, and its `react-native-svg` dependency), or a later 15.x.
const range = "^15.15.4";

export const svg = <Name extends keyof typeof ReactNativeSvg>(name: Name) =>
  createImport<(typeof ReactNativeSvg)[Name]>({
    name,
    from: "react-native-svg",
    version: range,
  });
