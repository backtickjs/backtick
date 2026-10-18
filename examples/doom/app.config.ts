import { installedPackages } from "@backtickjs/core/node";
import type { ConfigContext, ExpoConfig } from "expo/config";

// app.json, with the installed version of each of the app's dependencies,
// which the app reads to tell its server the modules it carries.
export default ({ config, projectRoot }: ConfigContext): ExpoConfig => ({
  ...(config as ExpoConfig),
  extra: {
    ...config.extra,
    backtick: { packages: installedPackages(projectRoot) },
  },
});
