import { buildIds } from "./builds.js";

// The part of an Expo config this plugin reads and writes: `projectRoot` is
// set by Expo as it reads the config.
type ExpoConfig = {
  extra?: Record<string, unknown>;
  _internal?: { projectRoot?: string };
};

/**
 * An Expo config plugin, as `"plugins": ["@backtickjs/builds"]` in app.json:
 * puts this build's id on each platform in the app config's `extra.buildIds`,
 * where `buildIdFrom` reads it.
 */
export default function withBuildIds<Config extends ExpoConfig>(
  config: Config,
): Config {
  const projectRoot = config._internal?.projectRoot;
  if (projectRoot === undefined) {
    throw new Error("@backtickjs/builds: Expo gave the config no projectRoot.");
  }
  return {
    ...config,
    extra: { ...config.extra, buildIds: buildIds(projectRoot) },
  };
}
