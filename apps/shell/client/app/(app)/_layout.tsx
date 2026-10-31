import { Stack, useRoute } from "expo-router";
import { useState } from "react";
import { OpenApp } from "../../OpenApp";
import { usePaper } from "../../paper";
import { appRoots } from "../../screens";

// A navigator for each app opened: the app's own, from its `/_layout`.
export default function AppLayout() {
  const paper = usePaper();
  const params = useRoute().params as { backtickApp: string };
  const [app] = useState(params.backtickApp);
  return (
    <OpenApp value={app}>
      {appRoots(app)?.layout ?? (
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
