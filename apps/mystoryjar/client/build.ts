import { modulesFrom } from "@backtickjs/builds/client";
import Constants from "expo-constants";
import { Platform } from "react-native";

// The modules this build carries on this platform, so the server bundles
// screens it can run: this app sends them as a header.
export const modules = modulesFrom(Constants.expoConfig?.extra, Platform.OS);
