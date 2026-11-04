import {
  type ReactNode,
  startTransition,
  Suspense,
  use,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Pressable, StyleSheet, Text, useColorScheme } from "react-native";
import { useFocusEffect, useUnstableGlobalHref } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ErrorBoundary, getErrorMessage } from "react-error-boundary";
import { followStartingLink } from "./app/+native-intent";
import { hrefOf, LoadedScreens } from "./AppLayout";
import { savePreview } from "./preview";
import { fetchScreen, useInk, usePaper } from "./screens";
import { showing } from "./shown";
import { isSignedIn } from "../modules/backtick-session/src";

// A route's screen: the one its app's layout fetched as it was navigated to,
// or, when none was (the same path pushed again), its own.
export function Document() {
  const { app, loads, showing: shows } = use(LoadedScreens);
  // What was on top as the route arrived is the route's own, for good.
  const globalHref = useUnstableGlobalHref();
  const [path] = useState(() => hrefOf(globalHref));
  // Held here, where nothing suspends, so the request outlives the render
  // that waits for it.
  const [screen, setScreen] = useState(
    () => loads.get(path) ?? fetchScreen(app, path),
  );
  useEffect(() => shows(path), [shows, path]);
  // The current screen stays until the new one has arrived.
  const reload = useCallback(
    (signal?: AbortSignal) => {
      const next = fetchScreen(app, path, signal);
      startTransition(() => setScreen(next));
      return next;
    },
    [app, path],
  );
  // An app's first screen, once it's had a moment to draw (a game's first
  // frame included), is its preview on the home's card. Never in the way:
  // a capture that fails is only logged.
  useEffect(() => {
    if (app === null || path !== "/" || !isSignedIn()) {
      return;
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    let left = false;
    screen.then(
      () => {
        if (!left) {
          timer = setTimeout(
            () =>
              savePreview(app).catch((error) =>
                console.warn("Saving the preview failed:", error),
              ),
            2000,
          );
        }
      },
      () => {},
    );
    return () => {
      left = true;
      clearTimeout(timer);
    };
  }, [app, path, screen]);
  // On top, it's the screen a `reload` link loads again, in place.
  useFocusEffect(
    useCallback(() => {
      void followStartingLink();
      return showing(app, reload);
    }, [app, reload]),
  );

  return (
    <ErrorBoundary
      resetKeys={[screen]}
      fallbackRender={({ error }) => <Failed error={error} retry={reload} />}
    >
      <Suspense fallback={null}>
        <Screen screen={screen} />
      </Suspense>
    </ErrorBoundary>
  );
}

function Screen({ screen }: { screen: Promise<ReactNode> }) {
  return use(screen);
}

// In backtickjs.com's colours (server/look.tsx): ink and paper, and its red.
function Failed({ error, retry }: { error: unknown; retry: () => void }) {
  const dark = useColorScheme() === "dark";
  const ink = useInk();
  const paper = usePaper();
  return (
    <SafeAreaView style={styles.failed}>
      <Text style={[styles.error, { color: dark ? "#f87171" : "#dc2626" }]}>
        {getErrorMessage(error) ?? String(error)}
      </Text>
      <Pressable
        style={[styles.button, { backgroundColor: ink }]}
        // Not `onPress={retry}`: that passes the press event to `reload`
        // as its signal, and fetch throws calling its addEventListener.
        onPress={() => retry()}
      >
        <Text style={[styles.label, { color: paper }]}>Retry</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
