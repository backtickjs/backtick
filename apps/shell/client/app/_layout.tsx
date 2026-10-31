import type { Session } from "@supabase/supabase-js";
import { Stack, useNavigationContainerRef } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../navigator";
import { Progress } from "../Progress";
import { usePaper } from "../screens";
import { ShellSplash } from "../ShellSplash";
import { CurrentSession } from "../session";
import { followRoot } from "./+native-intent";
import { supabase } from "../supabase";

// Nothing is drawn here: every screen, sign-in's included, comes from the
// server. A signed-out phone asks for `/` without a token, and gets sign-in.
export default function Layout() {
  const paper = usePaper();
  const [session, setSession] = useState<Session | null | undefined>();
  followRoot(useNavigationContainerRef());
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_, next) => {
      setSession(next);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return <ShellSplash />;
  }
  // Drawn afresh when the user signs in or out, from Backtick's home. Inside
  // gesture-handler's root, as an Expo Router app's root layout puts it.
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CurrentSession value={session}>
        <Stack
          key={session?.user.id ?? "signed out"}
          screenOptions={{
            title: "",
            headerShown: false,
            contentStyle: { backgroundColor: paper },
          }}
        />
        <Progress />
        <StatusBar style="auto" />
      </CurrentSession>
    </GestureHandlerRootView>
  );
}
