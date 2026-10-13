import { buildIds } from "@backtickjs/builds";
import type { ConfigContext, ExpoConfig } from "expo/config";

// app.json, with this build's id on each platform: it names the modules the
// build carries, which the app sends and the server bundles screens for.
export default ({ config, projectRoot }: ConfigContext): ExpoConfig =>
  ({
    ...config,
    extra: { ...config.extra, buildIds: buildIds(projectRoot) },
  }) as ExpoConfig;
