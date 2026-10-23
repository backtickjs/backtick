import {
  type ReactNode,
  startTransition,
  Suspense,
  use,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { ErrorBoundary, getErrorMessage } from "react-error-boundary";
import { currentApp, setOpenApp } from "./openApp";
import { fetchScreen } from "./screens";
import { offerReload } from "./updates";
import { CurrentSession } from "./session";
import { supabase } from "./supabase";

// The open app's screen at `path`, from its server, with a spinner until it
// arrives. It stays the app's, made the open one again when it's back on
// top. When the app gets a new version, the layout's snackbar offers it: the
// screen never changes under the user's hand, and nothing is drawn in it.
export function ServerScreen({ path }: { path: string }) {
  const session = use(CurrentSession);
  const [app] = useState(currentApp);
  // Held here, where nothing suspends, so the request outlives the render
  // that waits for it.
  const [screen, setScreen] = useState(() => fetchScreen(app, path, session));
  // The current screen stays until the new one has arrived.
  const reload = useCallback(
    () => startTransition(() => setScreen(fetchScreen(app, path, session))),
    [app, path, session],
  );
  const [updated, setUpdated] = useState(false);
  useFocusEffect(
    useCallback(() => {
      setOpenApp(app);
      if (!updated) {
        return;
      }
      offerReload(() => {
        setUpdated(false);
        reload();
      });
      return () => offerReload(null);
    }, [app, updated, reload]),
  );

  useEffect(() => {
    if (app === null) {
      return;
    }
    const channel = supabase
      .channel(`versions:${app}:${path}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "versions",
          filter: `app_id=eq.${app}`,
        },
        () => setUpdated(true),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [app, path]);

  return (
    <ErrorBoundary
      resetKeys={[screen]}
      fallbackRender={({ error }) => <Failed error={error} retry={reload} />}
    >
      <Suspense fallback={<ActivityIndicator style={styles.fill} />}>
        <Screen screen={screen} />
      </Suspense>
    </ErrorBoundary>
  );
}

function Screen({ screen }: { screen: Promise<ReactNode> }) {
  return use(screen);
}

function Failed({ error, retry }: { error: unknown; retry: () => void }) {
  return (
    <View style={styles.failed}>
      <Text style={styles.error}>
        {getErrorMessage(error) ?? String(error)}
      </Text>
      <Pressable style={styles.button} onPress={retry}>
        <Text style={styles.label}>Retry</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  failed: { margin: 24, gap: 16 },
  error: { color: "#b91c1c" },
  button: {
    alignSelf: "flex-start",
    backgroundColor: "#1f7a55",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  label: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
