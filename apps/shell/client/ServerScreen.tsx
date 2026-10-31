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
import { useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ErrorBoundary, getErrorMessage } from "react-error-boundary";
import { followStartingLink } from "./app/+native-intent";
import { savePreview } from "./preview";
import { cancel } from "@backtickjs/router";
import { fetchScreen, useInk, usePaper } from "./screens";
import { ShellSplash } from "./ShellSplash";
import { showing } from "./shown";
import { CurrentSession } from "./session";

// `app`'s screen at `path`, from its server.
// Backtick's home is the app null.
export function ServerScreen({
  app,
  path,
  initialScreen,
}: {
  app: string | null;
  path: string;
  // When a Link fetched it first.
  initialScreen?: Promise<ReactNode>;
}) {
  const session = use(CurrentSession);
  // Held here, where nothing suspends, so the request outlives the render
  // that waits for it.
  const [screen, setScreen] = useState(
    () => initialScreen ?? fetchScreen(app, path, session),
  );
  // The current screen stays until the new one has arrived.
  const reload = useCallback(() => {
    const next = fetchScreen(app, path, session);
    startTransition(() => setScreen(next));
    return next;
  }, [app, path, session]);
  // An app's first screen, once it's had a moment to draw (a game's first
  // frame included), is its preview on the home's card. Never in the way:
  // a capture that fails is only logged.
  useEffect(() => {
    if (app === null || path !== "/" || session === null) {
      return;
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    let left = false;
    screen.then(
      () => {
        if (!left) {
          timer = setTimeout(
            () =>
              savePreview(app, session).catch((error) =>
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
  }, [app, path, session, screen]);
  // On top, it's the screen a `reload` link loads again, in place.
  useFocusEffect(
    useCallback(() => {
      void followStartingLink();
      const hide = showing(app, reload);
      // Whatever was on its way from this screen is no longer wanted: a swipe
      // back or the back button, which no Link sees.
      return () => {
        hide();
        cancel();
      };
    }, [app, reload]),
  );

  return (
    <ErrorBoundary
      resetKeys={[screen]}
      fallbackRender={({ error }) => <Failed error={error} retry={reload} />}
    >
      <Suspense
        fallback={app === null && path === "/" ? <ShellSplash /> : null}
      >
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
        onPress={retry}
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
