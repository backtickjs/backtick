import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { Suspense, use, useState } from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import {
  ErrorBoundary,
  type FallbackProps,
  getErrorMessage,
} from "react-error-boundary";
import { CurrentSession, OpenApp } from "../client/openApp";
import { fetchScreen, type Opened } from "../client/screens";

// Every path outside /backtick, and `/` through index.tsx: the open app's
// screen at that path.
export default function AppScreen() {
  const { path } = useLocalSearchParams<{ path?: string[] }>();
  // The app as this screen opened, and the request held here, which doesn't
  // suspend, so it outlives the render that waits for it.
  const [app] = useState(use(OpenApp).app);
  const session = use(CurrentSession)!;
  const [screen] = useState(
    () => app && fetchScreen(app, `/${(path ?? []).join("/")}`, session),
  );
  if (app === null || screen === null) {
    return <Redirect href="/backtick" />;
  }
  return (
    <>
      <Stack.Screen options={{ title: app.title }} />
      <ErrorBoundary FallbackComponent={Failed}>
        <Suspense fallback={<ActivityIndicator style={{ flex: 1 }} />}>
          <Screen screen={screen} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

// What the server sent, once it has: suspending until then, and throwing,
// for the boundary, a screen that couldn't be fetched or run.
function Screen({ screen }: { screen: Promise<Opened> }) {
  const opened = use(screen);
  return (
    <>
      <Text style={styles.muted}>
        {`fetched in ${opened.fetched} ms, ran in ${opened.ran} ms`}
      </Text>
      {opened.screen}
    </>
  );
}

function Failed({ error }: FallbackProps) {
  return (
    <Text style={styles.error}>{getErrorMessage(error) ?? String(error)}</Text>
  );
}

const styles = StyleSheet.create({
  muted: { fontSize: 16, color: "#64706a", padding: 16 },
  error: { margin: 24, color: "#b91c1c" },
});
