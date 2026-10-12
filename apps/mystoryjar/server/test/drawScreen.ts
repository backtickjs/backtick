import { createRequire } from "node:module";
import { bundler } from "@backtickjs/bundler";
import type { Spliceable } from "@backtickjs/core";
import { evaluate } from "@backtickjs/react-native-client";
import { CommonActions, StackActions } from "@react-navigation/routers";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNativeWeb from "react-native-web";

// What the app provides, as `server/index.tsx` and `App.tsx` say, with React
// Native's web build standing in for React Native, a navigator that records
// what screens ask of it, a SecureStore in memory, fonts that are loaded at
// once, an SVG drawn as its markup, and a phone without a notch.
const require = createRequire(import.meta.url);
const packageVersions = {
  react: require("react/package.json").version,
  "react-native": require("react-native/package.json").version,
  "@react-navigation/native": require("@react-navigation/native/package.json")
    .version,
  "expo-secure-store": require("expo-secure-store/package.json").version,
  "expo-font": require("expo-font/package.json").version,
  "react-native-svg": require("react-native-svg/package.json").version,
  "react-native-safe-area-context":
    require("react-native-safe-area-context/package.json").version,
  "expo-apple-authentication": require("expo-apple-authentication/package.json")
    .version,
  "expo-crypto": require("expo-crypto/package.json").version,
  "@react-native-google-signin/google-signin":
    require("@react-native-google-signin/google-signin/package.json").version,
  "react-native-fbsdk-next": require("react-native-fbsdk-next/package.json")
    .version,
};

/** The navigation actions screens dispatched, in order. */
export const navigated: unknown[] = [];

const navigation = {
  dispatch: (action: unknown) => navigated.push(action),
  goBack: () => navigated.push({ type: "GO_BACK" }),
};

/** What screens kept in SecureStore. */
export const secureStore = new Map<string, string>();

const modules = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNativeWeb,
  "@react-navigation/native": {
    CommonActions,
    StackActions,
    useNavigation: () => navigation,
  },
  "expo-secure-store": {
    getItemAsync: async (key: string) => secureStore.get(key) ?? null,
    setItemAsync: async (key: string, value: string) =>
      void secureStore.set(key, value),
    deleteItemAsync: async (key: string) => void secureStore.delete(key),
  },
  "expo-font": { useFonts: () => [true, null] },
  "react-native-svg": {
    SvgXml: (props: { xml: string; color?: string }) =>
      React.createElement("svg", {
        "data-color": props.color,
        dangerouslySetInnerHTML: { __html: props.xml },
      }),
  },
  "react-native-safe-area-context": {
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  },
  // As on the web and in Expo Go: no native sign-in SDKs, and no Apple.
  "expo-apple-authentication": { isAvailableAsync: async () => false },
  "expo-crypto": {},
  "@react-native-google-signin/google-signin": {},
  "react-native-fbsdk-next": {},
};

// A screen, bundled as your server bundles it and run as your app runs it,
// for Testing Library to draw.
export async function drawScreen(input: Spliceable): Promise<React.ReactNode> {
  navigated.length = 0;
  secureStore.clear();
  const bundle = await bundler.build({ input, packageVersions });
  const { code } = bundle.generate({ format: "cjs" });
  return evaluate(code, modules) as React.ReactNode;
}
