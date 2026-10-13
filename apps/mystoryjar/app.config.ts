import { buildIds } from "@backtickjs/builds";
import type { ConfigContext, ExpoConfig } from "expo/config";

// app.json, with this build's id on each platform, which names the packages
// it carries there: the app sends its own, and the server bundles screens
// for them.
export default ({ config, projectRoot }: ConfigContext): ExpoConfig =>
  ({
    ...config,
    extra: { ...config.extra, buildIds: buildIds(projectRoot) },
  }) as ExpoConfig;
