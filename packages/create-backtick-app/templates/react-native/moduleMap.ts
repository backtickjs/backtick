import type { ModuleMap } from "@backtickjs/react-native-client";

// What a screen may require, and where each comes from: the packages this
// app is built with. Add one when a screen uses another package. A table and
// nothing else: the server reads it, without running it, to know what each
// build of your app carries. A platform that differs gets its own file, as
// Metro picks files: moduleMap.web.ts, moduleMap.ios.ts.
export const moduleMap = {
  react: () => require("react"),
  "react/jsx-runtime": () => require("react/jsx-runtime"),
  "react-native": () => require("react-native"),
} satisfies ModuleMap;
