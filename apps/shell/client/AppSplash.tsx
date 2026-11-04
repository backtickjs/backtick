import { useManifest } from "./manifest";
import { appPaper, screenUrl } from "./screens";
import { SplashView } from "./SplashView";

// An app's splash, while its first screen is fetched. From the manifest the
// phone kept: on a first open, the shell's paper alone.
export function AppSplash({ app }: { app: string }) {
  const manifest = useManifest(app);
  const icon = manifest?.icons?.[0]?.src;
  return (
    <SplashView
      paper={appPaper(manifest)}
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
