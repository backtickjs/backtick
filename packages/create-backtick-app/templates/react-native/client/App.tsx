import { createRuntime } from "@backtickjs/core";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { type ReactNode, Suspense, use, useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import {
  ErrorBoundary,
  type FallbackProps,
  getErrorMessage,
} from "react-error-boundary";
import { installedPackages, moduleMap } from "./backtick";

// Your Backtick server runs on the computer Expo was started from.
const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
const server = `http://${host}:3000`;

// What fetches and runs the screens your server sends, with the modules the
// app provides at their versions: one per app, so what a screen makes once
// stays made.
const runtime = createRuntime({ moduleMap, installedPackages });

export default function App() {
  // Held here, which doesn't suspend, so the request outlives the render
  // that waits for it.
  const [screen] = useState(
    () => runtime.fetch(`${server}/`) as Promise<ReactNode>,
  );
  // The whole screen, its layout included, comes from the server: see
  // server/Home.tsx.
  return (
    <>
      <ErrorBoundary FallbackComponent={Failed}>
        <Suspense fallback={<ActivityIndicator style={{ flex: 1 }} />}>
          <Screen screen={screen} />
        </Suspense>
      </ErrorBoundary>
      <StatusBar style="auto" />
    </>
  );
}

// What the server sent, once it has: suspending until then, and throwing,
// for the boundary, a screen that couldn't be fetched or run.
function Screen({ screen }: { screen: Promise<ReactNode> }) {
  return use(screen);
}

// Why the screen couldn't be drawn: the server unreachable, or a screen the
// app can't run.
function Failed({ error }: FallbackProps) {
  return (
    <Text style={{ margin: 24, marginTop: 96, color: "#b91c1c" }}>
      {getErrorMessage(error) ?? String(error)}
      {"\n\n"}Is your Backtick server running? npm start runs it alongside Expo.
    </Text>
  );
}
