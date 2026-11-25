import { createRuntime } from "@backtickjs/core";
import * as React from "react";
import { Suspense, use, useState } from "react";
import { ActivityIndicator } from "react-native";
import { installedPackages, moduleMap } from "./backtick";

// What fetches and runs the screens the server sends, with the modules the
// app provides at their versions: one per app, so what a screen makes once
// stays made.
const runtime = createRuntime({ moduleMap, installedPackages });

async function fetchScreen(url: string): Promise<React.ReactNode> {
  const response = await runtime.fetch<React.ReactNode>(url);
  return runtime.exec(await response.text());
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
