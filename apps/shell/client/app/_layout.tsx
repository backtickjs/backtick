import { router, Stack, useNavigationContainerRef } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { onSessionChange } from "../../modules/backtick-session/src";
import { Progress } from "../Progress";
import { usePaper } from "../screens";
import { followRoot } from "./+native-intent";

// Nothing is drawn here: every screen, sign-in's included, comes from the
// server. A signed-out phone asks for `/` without a token, and gets sign-in.
export default function Layout() {
  const paper = usePaper();
  // Each sign-in or sign-out, counted, so the screens are drawn afresh.
  const [sessions, setSessions] = useState(0);
  followRoot(useNavigationContainerRef());
  // Every navigation a transition, not only preloads: an app's layout holds
  // the screen on top while the next one is fetched (AppLayout.tsx).
  useEffect(() => router.setTransitionMode("always"), []);
  useEffect(() => {
    const subscription = onSessionChange(() => setSessions((n) => n + 1));
    return () => subscription.remove();
  }, []);

  // Inside gesture-handler's root, as an Expo Router app's root layout puts
  // it.
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        key={sessions}
        screenOptions={{
          title: "",
          headerShown: false,
          contentStyle: { backgroundColor: paper },
        }}
      />
      <Progress />
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
