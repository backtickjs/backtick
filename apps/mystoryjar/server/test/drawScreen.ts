import { bundler } from "@backtickjs/bundler";
import type { Spliceable } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/cjs";
import { CommonActions, StackActions } from "@react-navigation/routers";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNativeWeb from "react-native-web";
import type { moduleMap } from "../../moduleMap.web.ts";
import { builds } from "../builds.js";

// What the app's web build provides, as its module map says, with React
// Native's web build standing in for React Native, a navigator that records
// what screens ask of it, a SecureStore in memory, fonts that are loaded at
// once, an SVG drawn as its markup, and a phone without a notch.

/** The navigation actions screens dispatched, in order. */
export const navigated: unknown[] = [];

/** The paths screens drew out of sight, to show at once later. */
export const preloaded: string[] = [];

const navigation = {
  dispatch: (action: unknown) => navigated.push(action),
  goBack: () => navigated.push({ type: "GO_BACK" }),
  // a test's screen is the stack's only one, unless it says otherwise
  canGoBack: () => canGoBack,
  setParams: (params: object) => navigated.push({ type: "SET_PARAMS", params }),
  preload: (_name: string, params: { path: string }) =>
    preloaded.push(params.path),
  getState: () => ({
    preloadedRoutes: preloaded.map((path) => ({ params: { path } })),
  }),
};

/** What screens kept in SecureStore. */
export const secureStore = new Map<string, string>();

const modules: Record<keyof typeof moduleMap, unknown> = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNativeWeb,
  "@react-navigation/native": {
    CommonActions,
    StackActions,
    useNavigation: () => navigation,
    // every screen a test draws is the one shown
    useIsFocused: () => true,
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
    Svg: (props: { children?: React.ReactNode }) =>
      React.createElement("svg", null, props.children),
    Circle: (props: { stroke?: string }) =>
      React.createElement("circle", { "data-stroke": props.stroke }),
  },

  "react-native-safe-area-context": {
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  },
  // As on the web: no Apple.
  "expo-apple-authentication": { isAvailableAsync: async () => false },
  "expo-crypto": {},
  // a picker that answers what a test asked it to
  "expo-image-picker": {
    launchImageLibraryAsync: async () => picked,
  },
  // an upload as the app's web build sends one
  "expo-file-system": await import("../../fileSystem.web.js"),
};

type Picked =
  | { canceled: true; assets: null }
  | { canceled: false; assets: { uri: string; mimeType?: string }[] };

let picked: Picked = { canceled: true, assets: null };

/** What the photo picker answers when a screen opens it, from now on. */
export function pickPhoto(answer: Picked) {
  picked = answer;
}

// A screen, bundled as your server bundles it and run as your app runs it,
// for Testing Library to draw.
export async function drawScreen<T extends Spliceable>(input: T) {
  navigated.length = 0;
  preloaded.length = 0;
  canGoBack = false;
  secureStore.clear();
  const bundle = await bundler.build({
    input,
    modules: builds.installed("web"),
  });
  const { code } = bundle.generate({ format: "cjs" });
  return execRoot(code, modules);
}

let canGoBack = false;

/** Whether the screen a test draws has one under it, from now on. */
export function stackBelow(below: boolean) {
  canGoBack = below;
}
