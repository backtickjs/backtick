import { Stack, useRoute } from "expo-router";
import { OpenApp, usePaper } from "../../screens";

// A navigator for each app opened, so what's open closes with it.
export default function AppLayout() {
  const paper = usePaper();
  const { backtickApp } = useRoute().params as { backtickApp: string };
  return (
    <OpenApp value={backtickApp}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: paper },
        }}
      />
    </OpenApp>
  );
}
