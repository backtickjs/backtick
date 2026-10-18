import { type Bundle, modulesOf } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/cjs";
import Constants from "expo-constants";
import * as React from "react";
import { Suspense, use, useState } from "react";
import { ActivityIndicator } from "react-native";
import { moduleMap } from "./moduleMap";

// The modules this build carries, at the versions app.config.ts records.
const modules = JSON.stringify(
  modulesOf(
    moduleMap,
    Constants.expoConfig?.extra?.backtick?.installedPackages,
  ),
);

async function fetchScreen(url: string): Promise<React.ReactNode> {
  const response = await fetch(url, {
    headers: { "x-backtick-modules": modules },
  });
  const bundle = (await response.text()) as Bundle<React.ReactNode>;
  return execRoot(bundle, moduleMap);
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
