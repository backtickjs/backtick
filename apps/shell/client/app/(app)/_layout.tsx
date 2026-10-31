import { Stack, useRoute } from "expo-router";
import { useManifest } from "../../manifest";
import { readRouteParam } from "../../routeParam";
import { OpenApp, useAppPaper } from "../../screens";

// A navigator for each app opened, so what's open closes with it.
export default function AppLayout() {
  const { backtick } = useRoute().params as { backtick: string };
  const app = readRouteParam(backtick).app!;
  const manifest = useManifest(app);
  const paper = useAppPaper(manifest);
  return (
    <OpenApp value={app}>
      <Stack
        screenOptions={({ navigation, route }) => ({
          // Empty until a screen titles itself: the route's name is ours.
          title: "",
          headerShown:
            manifest?.display === "minimal-ui" ||
            manifest?.display === "browser",
          headerTintColor: manifest?.theme_color,
          contentStyle: { backgroundColor: paper },
          // The first screen, in the splash's place.
          animation:
            navigation.getState().routes[0]?.key === route.key
              ? "fade"
              : undefined,
        })}
      />
    </OpenApp>
  );
}
