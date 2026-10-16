import { buildIds, register } from "./builds.js";

// The part of an Expo config this plugin reads and writes: `projectRoot` is
// set by Expo as it reads the config.
type ExpoConfig = {
  extra?: Record<string, unknown>;
  _internal?: { projectRoot?: string };
};

/**
 * An Expo config plugin, as `"plugins": ["@backtickjs/builds/expo"]` in
 * app.json: puts this build's id on each platform in the app config's
 * `extra.buildIds`, where `buildIdFrom` reads it. In development, as
 * `expo start` reads the config, it also registers them, for your server to
 * draw this code's builds.
 */
export default function withBuildIds<Config extends ExpoConfig>(
  config: Config,
): Config {
  const projectRoot = config._internal?.projectRoot;
  if (projectRoot === undefined) {
    throw new Error(
      "@backtickjs/builds/expo: Expo gave the config no projectRoot.",
    );
  }
  // A build that ships is registered on purpose, and checked by
  // backtick-builds check: `eas build` reads the config outside development.
  if (process.env.NODE_ENV === "development") register(projectRoot);
  return {
    ...config,
    extra: { ...config.extra, buildIds: buildIds(projectRoot) },
  };
}
