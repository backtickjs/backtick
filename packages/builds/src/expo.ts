import { platforms } from "./moduleMap.js";
import { installedModules } from "./modules.js";

// The part of an Expo config this plugin reads and writes: `projectRoot` is
// set by Expo as it reads the config.
type ExpoConfig = {
  extra?: Record<string, unknown>;
  _internal?: { projectRoot?: string };
};

/**
 * An Expo config plugin, as `"plugins": ["@backtickjs/builds/expo"]` in
 * app.json: puts the modules this build carries on each platform in the app
 * config's `extra.backtick.modules`, where `modulesFrom` reads them.
 */
export default function withModules<Config extends ExpoConfig>(
  config: Config,
): Config & { extra: Record<string, unknown> } {
  const projectRoot = config._internal?.projectRoot;
  if (projectRoot === undefined) {
    throw new Error(
      "@backtickjs/builds/expo: Expo gave the config no projectRoot.",
    );
  }
  const modules = Object.fromEntries(
    platforms.map((platform) => [
      platform,
      installedModules(projectRoot, platform),
    ]),
  );
  const backtick = config.extra?.backtick as
    | Record<string, unknown>
    | undefined;
  return {
    ...config,
    extra: { ...config.extra, backtick: { ...backtick, modules } },
  };
}
