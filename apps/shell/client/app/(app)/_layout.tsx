import { Stack, useRoute } from "expo-router";
import { useManifest } from "../../manifest";
import { readRouteParam } from "../../routeParam";
import { OpenApp, useAppPaper } from "../../screens";

// A navigator for each app opened, so what's open closes with it.
export default function AppLayout() {
  const { __backtick } = useRoute().params as { __backtick: string };
  const app = readRouteParam(__backtick).app!;
  const manifest = useManifest(app);
  const paper = useAppPaper(manifest);
  return (
    <OpenApp value={app}>
      <Stack
        screenOptions={({ navigation, route }) => ({
          // Empty until a screen titles itself: the route's name is ours.
          title: "",
          headerShown: false,
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
