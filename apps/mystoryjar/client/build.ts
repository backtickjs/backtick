import { modulesOf } from "@backtickjs/core";
import Constants from "expo-constants";
import { moduleMap } from "./moduleMap";

// The modules this build carries, so the server bundles screens it can run:
// this app sends them as a header.
export const modules = JSON.stringify(
  modulesOf(
    moduleMap,
    Constants.expoConfig?.extra?.backtick?.installedPackages,
  ),
);
