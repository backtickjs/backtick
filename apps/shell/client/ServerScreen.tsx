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
  useColorScheme,
} from "react-native";
import { Stack, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ErrorBoundary, getErrorMessage } from "react-error-boundary";
import { followStartingLink } from "./app/+native-intent";
import { savePreview } from "./preview";
import { fetchScreen, roots } from "./screens";
import { showing } from "./shown";
import { CurrentSession } from "./session";

// `app`'s screen at `path`, from its server, with a spinner until it arrives.
// Backtick's home is the app null.
export function ServerScreen({
  app,
  path,
}: {
  app: string | null;
  path: string;
}) {
  const session = use(CurrentSession);
  // Held here, where nothing suspends, so the request outlives the render
  // that waits for it.
  const [screen, setScreen] = useState(() => fetchScreen(app, path, session));
  // The current screen stays until the new one has arrived.
  const reload = useCallback(
    () => startTransition(() => setScreen(fetchScreen(app, path, session))),
    [app, path, session],
  );
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
      return showing(app, reload);
    }, [app, reload]),
  );

  return (
    <>
      {/* Empty until a screen titles itself: the route's name is ours. */}
      <Stack.Screen options={{ title: "" }} />
      <ErrorBoundary
        resetKeys={[screen]}
        fallbackRender={({ error }) => <Failed error={error} retry={reload} />}
      >
        <Suspense
          fallback={
            roots.get(app)?.loading ?? <ActivityIndicator style={styles.fill} />
          }
        >
          <Screen screen={screen} />
        </Suspense>
      </ErrorBoundary>
    </>
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
