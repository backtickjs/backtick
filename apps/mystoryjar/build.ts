import Constants from "expo-constants";
import { Platform } from "react-native";

/**
 * This build's id, which names the packages it carries on this platform, so
 * the server bundles screens it can run. Send it however the app reaches its
 * server: this app sends a header; a GraphQL app, a variable.
 */
export const buildId: string =
  Constants.expoConfig?.extra?.buildIds?.[Platform.OS] ?? "";
