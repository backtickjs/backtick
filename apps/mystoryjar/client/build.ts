import { buildIdFrom } from "@backtickjs/builds/client";
import Constants from "expo-constants";
import { Platform } from "react-native";

// This build's id, which names the modules it carries on this platform, so
// the server bundles screens it can run: this app sends it as a header.
export const buildId = buildIdFrom(Constants.expoConfig?.extra, Platform.OS);
