import { installedPackages } from "./modules.js";

// The part of an Expo config this plugin reads and writes: `projectRoot` is
// set by Expo as it reads the config.
type ExpoConfig = {
  extra?: Record<string, unknown>;
  _internal?: { projectRoot?: string };
};

/**
 * An Expo config plugin, as `"plugins": ["@backtickjs/builds/expo"]` in
 * app.json: puts the installed version of each of the app's dependencies in
 * the app config's `extra.backtick.packages`, which `modulesOf` reads.
 */
export default function withPackages<Config extends ExpoConfig>(
  config: Config,
): Config & { extra: Record<string, unknown> } {
  const projectRoot = config._internal?.projectRoot;
  if (projectRoot === undefined) {
    throw new Error(
      "@backtickjs/builds/expo: Expo gave the config no projectRoot.",
    );
  }
  const backtick = config.extra?.backtick as
    | Record<string, unknown>
    | undefined;
  return {
    ...config,
    extra: {
      ...config.extra,
      backtick: { ...backtick, packages: installedPackages(projectRoot) },
    },
  };
}
