import { type Bundle, modulesOf } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/cjs";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { type ReactNode, Suspense, use, useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import {
  ErrorBoundary,
  type FallbackProps,
  getErrorMessage,
} from "react-error-boundary";
import { moduleMap } from "./moduleMap";

// Your Backtick server runs on the computer Expo was started from.
const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
const server = `http://${host}:3000`;

// The modules this build carries, at the versions app.config.ts records.
const modules = JSON.stringify(
  modulesOf(
    moduleMap,
    Constants.expoConfig?.extra?.backtick?.installedPackages,
  ),
);

// The screen at `path` on your server: its bundle, fetched and run with the
// app's modules. Your fetch to shape: headers, auth, caching.
async function fetchScreen(path: string): Promise<ReactNode> {
  const response = await fetch(`${server}${path}`, {
    headers: { "x-backtick-modules": modules },
  });
  if (!response.ok) {
    throw new Error(`${path} answered ${response.status}.`);
  }
  const bundle = (await response.text()) as Bundle<ReactNode>;
  return execRoot(bundle, moduleMap);
}

export default function App() {
  // Held here, which doesn't suspend, so the request outlives the render
  // that waits for it.
  const [screen] = useState(() => fetchScreen("/"));
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
