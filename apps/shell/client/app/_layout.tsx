import type { Session } from "@supabase/supabase-js";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CurrentSession } from "../session";
import { supabase } from "../supabase";

// Nothing is drawn here: every screen, sign-in's included, comes from the
// server. A signed-out phone asks for `/` without a token, and gets sign-in.
export default function Layout() {
  // backtickjs.com's paper, behind every screen (server/look.ts).
  const paper = useColorScheme() === "dark" ? "#0a0a0c" : "#ffffff";
  const [session, setSession] = useState<Session | null | undefined>();
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_, next) => {
      setSession(next);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return <ActivityIndicator style={{ flex: 1, backgroundColor: paper }} />;
  }
  // Drawn afresh when the user signs in or out, from Backtick's home. Inside
  // gesture-handler's root, as an Expo Router app's root layout puts it.
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CurrentSession value={session}>
        <Stack
          key={session?.user.id ?? "signed out"}
          screenOptions={{
            // An app shows a header by asking: `<Stack.Screen options={{ headerShown: true }} />`.
            headerShown: false,
            contentStyle: { backgroundColor: paper },
          }}
        />
        <StatusBar style="auto" />
      </CurrentSession>
    </GestureHandlerRootView>
  );
}
