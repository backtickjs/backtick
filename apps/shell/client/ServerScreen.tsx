import {
  type ReactNode,
  startTransition,
  Suspense,
  use,
  useCallback,
  useState,
} from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ErrorBoundary, getErrorMessage } from "react-error-boundary";
import { currentApp, setOpenApp } from "./openApp";
import { fetchScreen } from "./screens";
import { CurrentSession } from "./session";

// The open app's screen at `path`, from its server, with a spinner until it
// arrives. It stays the app's, made the open one again when it's back on
// top.
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
  useFocusEffect(useCallback(() => setOpenApp(app), [app]));

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
    <SafeAreaView style={styles.failed}>
      <Text style={styles.error}>
        {getErrorMessage(error) ?? String(error)}
      </Text>
      <Pressable style={styles.button} onPress={retry}>
        <Text style={styles.label}>Retry</Text>
      </Pressable>
    </SafeAreaView>
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
