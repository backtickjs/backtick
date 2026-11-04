import { useRoute } from "expo-router";
import { AppLayout } from "../../AppLayout";
import { AppSplash } from "../../AppSplash";
import { useManifest } from "../../manifest";
import { appPaper } from "../../screens";

// A navigator for each app opened, so what's open closes with it. The app is
// its route's one `__backtick` param, which the shell sets as it opens it.
export default function AppNavigator() {
  const app = (useRoute().params as { __backtick: string }).__backtick;
  const manifest = useManifest(app);
  const paper = appPaper(manifest);
  return (
    <AppLayout
      app={app}
      splash={<AppSplash app={app} />}
      screenOptions={{
        // Empty until a screen titles itself: the route's name is ours.
        title: "",
        // An app's screens show a header unless they say not.
        headerShown: true,
        // Opaque, so a screen's content starts below it.
        headerStyle: { backgroundColor: paper },
        headerShadowVisible: false,
        headerTintColor: manifest?.theme_color,
        contentStyle: { backgroundColor: paper },
      }}
    />
  );
}
