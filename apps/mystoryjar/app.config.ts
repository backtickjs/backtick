import type { ConfigContext, ExpoConfig } from "expo/config";
import {
  installedPackages,
  packagesHash,
  platforms,
} from "./server/packages.ts";

// app.json, with this build's id on each platform: the hash of the packages
// it carries there, which the app sends the server however it reaches it,
// and the server bundles screens for.
export default ({ config, projectRoot }: ConfigContext): ExpoConfig =>
  ({
    ...config,
    extra: {
      ...config.extra,
      buildIds: Object.fromEntries(
        platforms.map((platform) => [
          platform,
          packagesHash(installedPackages(projectRoot, platform)),
        ]),
      ),
    },
  }) as ExpoConfig;
