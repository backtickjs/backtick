import type { Session } from "@supabase/supabase-js";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { setOpenApp } from "../openApp";
import { CurrentSession } from "../session";
import { supabase } from "../supabase";

// Nothing is drawn here: every screen, sign-in's included, comes from the
// server. A signed-out phone asks for `/` without a token, and gets sign-in.
export default function Layout() {
  const [session, setSession] = useState<Session | null | undefined>();
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((event, next) => {
      // Signed in or out, the phone starts over at Backtick's home.
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        setOpenApp(null);
      }
      setSession(next);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }
  // Drawn afresh when the user signs in or out, from Backtick's home.
  return (
    <CurrentSession value={session}>
      <Stack
        key={session?.user.id ?? "signed out"}
        screenOptions={{ contentStyle: { backgroundColor: "#f3f5f2" } }}
      />
      <StatusBar style="auto" />
    </CurrentSession>
  );
}
