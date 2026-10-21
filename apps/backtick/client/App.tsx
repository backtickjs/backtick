import { type Bundle, modulesOf } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/cjs";
import { getBacktickExtra } from "@backtickjs/expo";
import type { Session } from "@supabase/supabase-js";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { type ReactNode, Suspense, use, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  ErrorBoundary,
  type FallbackProps,
  getErrorMessage,
} from "react-error-boundary";
import { moduleMap } from "./moduleMap";
import { server, signInWithGoogle, supabase } from "./supabase";

// The modules this build carries, at the versions app.json's plugin records.
const { installedPackages } = getBacktickExtra(Constants.expoConfig);
const modules = JSON.stringify(modulesOf(moduleMap, installedPackages));

type App = { id: string; title: string };

export default function Root() {
  const [session, setSession] = useState<Session | null | undefined>();
  const [open, setOpen] = useState<App | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, next) =>
      setSession(next),
    );
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <View style={styles.screen}>
      {session === undefined ? (
        <ActivityIndicator style={styles.fill} />
      ) : session === null ? (
        <SignIn />
      ) : open === null ? (
        <Apps onOpen={setOpen} />
      ) : (
        <Viewer app={open} session={session} onBack={() => setOpen(null)} />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

function SignIn() {
  const [error, setError] = useState<string>();
  return (
    <View style={styles.centered}>
      <Text style={styles.title}>Backtick</Text>
      <Text style={styles.muted}>
        The apps your assistant makes for you, on your phone.
      </Text>
      <Pressable
        style={styles.button}
        onPress={() =>
          signInWithGoogle().catch((caught: Error) => setError(caught.message))
        }
      >
        <Text style={styles.buttonLabel}>Sign in with Google</Text>
      </Pressable>
      {error === undefined ? null : <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

// The user's apps with at least one saved version: an app still at its
// starter isn't one yet.
function Apps({ onOpen }: { onOpen: (app: App) => void }) {
  const [apps, setApps] = useState<App[]>();
  const [error, setError] = useState<string>();
  useEffect(() => {
    supabase
      .from("apps")
      .select("id, title, versions!inner(version)")
      .order("created_at", { ascending: false })
      .then(({ data, error }) =>
        error ? setError(error.message) : setApps(data),
      );
  }, []);

  return (
    <View style={styles.fill}>
      <View style={styles.header}>
        <Text style={styles.title}>Your apps</Text>
        <Pressable onPress={() => supabase.auth.signOut()}>
          <Text style={styles.link}>Sign out</Text>
        </Pressable>
      </View>
      {error !== undefined ? (
        <Text style={styles.error}>{error}</Text>
      ) : apps === undefined ? (
        <ActivityIndicator style={styles.fill} />
      ) : (
        <FlatList
          data={apps}
          keyExtractor={(app) => app.id}
          ListEmptyComponent={
            <Text style={styles.muted}>
              Ask Claude for an app for your phone, and it appears here.
            </Text>
          }
          renderItem={({ item }) => (
            <Pressable style={styles.row} onPress={() => onOpen(item)}>
              <Text style={styles.rowLabel}>{item.title}</Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

// An app's latest version, bundled by the server for this phone's modules.
async function fetchApp(id: string, session: Session): Promise<ReactNode> {
  const response = await fetch(`${server}/apps/${id}`, {
    headers: {
      authorization: `Bearer ${session.access_token}`,
      "x-backtick-modules": modules,
    },
  });
  if (response.status === 426) {
    throw new Error(
      "This app needs a newer version of Backtick. Update it from the Play Store.",
    );
  }
  if (!response.ok) {
    throw new Error(`The app couldn't be opened (${response.status}).`);
  }
  const bundle = (await response.text()) as Bundle<ReactNode>;
  return execRoot(bundle, moduleMap);
}

function Viewer({
  app,
  session,
  onBack,
}: {
  app: App;
  session: Session;
  onBack: () => void;
}) {
  // Held here, which doesn't suspend, so the request outlives the render
  // that waits for it.
  const [screen] = useState(() => fetchApp(app.id, session));
  return (
    <View style={styles.fill}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.link}>‹ Apps</Text>
        </Pressable>
        <Text style={styles.headerTitle}>{app.title}</Text>
      </View>
      <ErrorBoundary FallbackComponent={Failed}>
        <Suspense fallback={<ActivityIndicator style={styles.fill} />}>
          <Screen screen={screen} />
        </Suspense>
      </ErrorBoundary>
    </View>
  );
}

// What the server sent, once it has: suspending until then, and throwing,
// for the boundary, an app that couldn't be fetched or run.
function Screen({ screen }: { screen: Promise<ReactNode> }) {
  return use(screen);
}

function Failed({ error }: FallbackProps) {
  return (
    <Text style={styles.error}>{getErrorMessage(error) ?? String(error)}</Text>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingTop: 48, backgroundColor: "#f3f5f2" },
  fill: { flex: 1 },
  centered: { flex: 1, justifyContent: "center", padding: 24, gap: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  title: { fontSize: 28, fontWeight: "700", color: "#17201b" },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: "600", color: "#17201b" },
  muted: { fontSize: 16, color: "#64706a", paddingHorizontal: 16 },
  button: {
    backgroundColor: "#1f7a55",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },
  buttonLabel: { color: "#fff", fontSize: 16, fontWeight: "600" },
  link: { color: "#1f7a55", fontSize: 16 },
  row: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
  },
  rowLabel: { fontSize: 17, color: "#17201b" },
  error: { margin: 24, color: "#b91c1c" },
});
