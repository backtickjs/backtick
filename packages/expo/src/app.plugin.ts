import { installedPackages } from "@backtickjs/core/node";

// The part of an Expo config this plugin reads and writes: `projectRoot` is
// set by Expo as it reads the config.
type ExpoConfig = {
  extra?: Record<string, unknown>;
  _internal?: { projectRoot?: string };
};

/**
 * The config plugin, as `"plugins": ["@backtickjs/expo"]` in app.json: puts
 * the installed version of each of the app's dependencies in the config,
 * `extra.backtick.installedPackages`, which `getBacktickExtra` reads.
 */
export default function withBacktickExtra<Config extends ExpoConfig>(
  config: Config,
): Config & { extra: Record<string, unknown> } {
  const projectRoot = config._internal?.projectRoot;
  if (projectRoot === undefined) {
    throw new Error("@backtickjs/expo: Expo gave the config no projectRoot.");
  }
  const backtick = config.extra?.backtick as
    | Record<string, unknown>
    | undefined;
  return {
    ...config,
    extra: {
      ...config.extra,
      backtick: {
        ...backtick,
        installedPackages: installedPackages(projectRoot),
      },
    },
  };
}
