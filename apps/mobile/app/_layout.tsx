import type { Session } from "@supabase/supabase-js";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { type App, CurrentSession, OpenApp } from "../client/openApp";
import { SignIn } from "../client/SignIn";
import { supabase } from "../client/supabase";

export default function Layout() {
  const [session, setSession] = useState<Session | null | undefined>();
  const [app, open] = useState<App | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, next) =>
      setSession(next),
    );
    return () => data.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }
  if (session === null) {
    return <SignIn />;
  }
  return (
    <CurrentSession value={session}>
      <OpenApp value={{ app, open }}>
        <Stack
          screenOptions={{ contentStyle: { backgroundColor: "#f3f5f2" } }}
        />
        <StatusBar style="auto" />
      </OpenApp>
    </CurrentSession>
  );
}
