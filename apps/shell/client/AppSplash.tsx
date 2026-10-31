import { leftScreen, router } from "@backtickjs/router";
import { useFocusEffect, useRoute } from "expo-router";
import { useCallback, useEffect } from "react";
import { useManifest } from "./manifest";
import { appPaper, screenUrl } from "./screens";
import { showing } from "./shown";
import { SplashView } from "./SplashView";

// An app's splash, while its first screen is fetched. That
// screen then replaces it like any Link's, so what it sets as it mounts, like
// its header, is there from its first frame. From the manifest the phone kept:
// on a first open, the shell's paper alone.
export function AppSplash({ app, path }: { app: string; path: string }) {
  const { key } = useRoute();
  const manifest = useManifest(app);
  const paper = appPaper(manifest);
  useFocusEffect(
    useCallback(() => {
      const hide = showing(key, app, path, () => Promise.resolve());
      router.replace(path);
      return hide;
    }, [key, app, path]),
  );
  useEffect(() => () => leftScreen(key), [key]);
  const icon = manifest?.icons?.[0]?.src;
  return (
    <SplashView
      paper={paper}
      ink={manifest?.theme_color}
      name={manifest?.name}
      icon={
        icon === undefined
          ? undefined
          : { uri: new URL(icon, screenUrl(app, "/")).href }
      }
    />
  );
}
