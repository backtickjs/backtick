import { installedModules, type Platform } from "@backtickjs/builds";
import { type Modules, supports } from "@backtickjs/bundler";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));

/** The modules the build this code makes for `platform` carries. */
export function installed(platform: Platform): Modules {
  return installedModules(projectRoot, platform);
}

/**
 * Whether a build is too old for its screens: its users are only asked to
 * update. Raise the range to retire builds.
 */
export function updateRequired(modules: Modules): boolean {
  return !supports(modules, "react-native", ">=0.86");
}
