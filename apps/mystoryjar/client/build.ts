import { modulesOf } from "@backtickjs/core";
import { getBacktickExtra } from "@backtickjs/expo";
import Constants from "expo-constants";
import { moduleMap } from "./moduleMap";

// The modules this build carries, so the server bundles screens it can run:
// this app sends them as a header.
const { installedPackages } = getBacktickExtra(Constants.expoConfig);
export const modules = JSON.stringify(modulesOf(moduleMap, installedPackages));
