import { cancel, router } from "@backtickjs/router";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { useManifest } from "./manifest";
import { screenUrl, useAppPaper } from "./screens";
import { showing } from "./shown";
import { SplashView } from "./SplashView";

// An app's splash, while its first screen is fetched. That
// screen then replaces it like any Link's, so what it sets as it mounts, like
// its header, is there from its first frame. From the manifest the phone kept:
// on a first open, the shell's paper alone.
export function AppSplash({ app, path }: { app: string; path: string }) {
  const manifest = useManifest(app);
  const paper = useAppPaper(manifest);
  useFocusEffect(
    useCallback(() => {
      const hide = showing(app, () => Promise.resolve());
      router.replace(path);
      return () => {
        hide();
        cancel();
      };
    }, [app, path]),
  );
  const icon = manifest?.icons?.[0]?.src;
  return (
    <SplashView
      paper={paper}
      name={manifest?.name}
      icon={
        icon === undefined
          ? undefined
          : { uri: new URL(icon, screenUrl(app, "/")).href }
      }
    />
  );
}
