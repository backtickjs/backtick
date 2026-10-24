import {
  type ReactNode,
  startTransition,
  Suspense,
  use,
  useCallback,
  useState,
} from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
} from "react-native";
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

// In backtickjs.com's colours (server/look.ts): ink and paper, and its red.
function Failed({ error, retry }: { error: unknown; retry: () => void }) {
  const dark = useColorScheme() === "dark";
  const ink = dark ? "#fafafa" : "#0e0e10";
  const paper = dark ? "#0a0a0c" : "#ffffff";
  return (
    <SafeAreaView style={styles.failed}>
      <Text style={[styles.error, { color: dark ? "#f87171" : "#dc2626" }]}>
        {getErrorMessage(error) ?? String(error)}
      </Text>
      <Pressable
        style={[styles.button, { backgroundColor: ink }]}
        onPress={retry}
      >
        <Text style={[styles.label, { color: paper }]}>Retry</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  failed: { margin: 24, gap: 20 },
  error: { fontSize: 16, lineHeight: 24 },
  button: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 22,
    paddingVertical: 13,
  },
  label: { fontSize: 15, fontWeight: "600" },
});
