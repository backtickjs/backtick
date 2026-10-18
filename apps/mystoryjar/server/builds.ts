import { type Modules, supports } from "@backtickjs/bundler";

/**
 * Whether a build is too old for its screens: its users are only asked to
 * update. Raise the range to retire builds.
 */
export function updateRequired(modules: Modules): boolean {
  return !supports(modules, "react-native", ">=0.86");
}
