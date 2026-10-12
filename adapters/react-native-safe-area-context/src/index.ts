// `react-native-safe-area-context`, name for name, in alphabetical order: a
// value where it both exports and declares it, with the instance type of each
// class it names; a type for everything else it declares.
import type { Client } from "@backtickjs/core";
import type * as SafeArea from "react-native-safe-area-context";
import { safeArea } from "./imports.js";

export const SafeAreaConsumer: Client<typeof SafeArea.SafeAreaConsumer> =
  safeArea("SafeAreaConsumer");
export const SafeAreaContext: Client<typeof SafeArea.SafeAreaContext> =
  safeArea("SafeAreaContext");
export const SafeAreaFrameContext: Client<
  typeof SafeArea.SafeAreaFrameContext
> = safeArea("SafeAreaFrameContext");
export const SafeAreaInsetsContext: Client<
  typeof SafeArea.SafeAreaInsetsContext
> = safeArea("SafeAreaInsetsContext");
export const SafeAreaListener: Client<typeof SafeArea.SafeAreaListener> =
  safeArea("SafeAreaListener");
export const SafeAreaProvider: Client<typeof SafeArea.SafeAreaProvider> =
  safeArea("SafeAreaProvider");
export const SafeAreaView: Client<typeof SafeArea.SafeAreaView> =
  safeArea("SafeAreaView");
export const initialWindowMetrics: Client<
  typeof SafeArea.initialWindowMetrics
> = safeArea("initialWindowMetrics");
export const initialWindowSafeAreaInsets: Client<
  typeof SafeArea.initialWindowSafeAreaInsets
> = safeArea("initialWindowSafeAreaInsets");
export const useSafeArea: Client<typeof SafeArea.useSafeArea> =
  safeArea("useSafeArea");
export const useSafeAreaFrame: Client<typeof SafeArea.useSafeAreaFrame> =
  safeArea("useSafeAreaFrame");
export const useSafeAreaInsets: Client<typeof SafeArea.useSafeAreaInsets> =
  safeArea("useSafeAreaInsets");
export const withSafeAreaInsets: Client<typeof SafeArea.withSafeAreaInsets> =
  safeArea("withSafeAreaInsets");

export type {
  Edge,
  EdgeInsets,
  EdgeMode,
  EdgeRecord,
  Edges,
  InsetChangeNativeCallback,
  InsetChangedEvent,
  Metrics,
  NativeSafeAreaProviderProps,
  NativeSafeAreaViewInstance,
  NativeSafeAreaViewProps,
  Rect,
  SafeAreaListenerProps,
  SafeAreaProviderProps,
  SafeAreaViewProps,
  WithSafeAreaInsetsProps,
} from "react-native-safe-area-context";
