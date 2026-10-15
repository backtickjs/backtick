import { buildIdFrom } from "@backtickjs/builds/client";
import { type Bundle, execRoot } from "@backtickjs/core";
import Constants from "expo-constants";
import * as React from "react";
import { Suspense, use, useState } from "react";
import { ActivityIndicator, Platform } from "react-native";
import { moduleMap } from "./moduleMap";

// This build's id, which names the modules it carries, for your server to
// bundle screens it can run.
const buildId = buildIdFrom(Constants.expoConfig?.extra, Platform.OS);

async function fetchScreen(url: string): Promise<React.ReactNode> {
  const response = await fetch(url, { headers: { "x-build-id": buildId } });
  const bundle = (await response.text()) as Bundle<React.ReactNode>;
  return execRoot(bundle, { format: "cjs", moduleMap });
}

export default function App() {
  const [screen] = useState(() => fetchScreen("https://api.example.com/"));
  return (
    <Suspense fallback={<ActivityIndicator />}>
      <Screen screen={screen} />
    </Suspense>
  );
}

function Screen({ screen }: { screen: Promise<React.ReactNode> }) {
  return use(screen);
}
