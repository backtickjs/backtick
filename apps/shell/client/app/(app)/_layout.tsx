import { Stack, useRoute } from "expo-router";
import { OpenApp, roots, usePaper } from "../../screens";

// A navigator for each app opened: the app's own, from its `/_layout`.
export default function AppLayout() {
  const paper = usePaper();
  const { backtickApp } = useRoute().params as { backtickApp: string };
  return (
    <OpenApp value={backtickApp}>
      {roots.get(backtickApp)?.layout ?? (
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: paper },
          }}
        />
      )}
    </OpenApp>
  );
}
