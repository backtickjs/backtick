import { type Bundle, createRuntime, modulesOf } from "@backtickjs/core";
import * as React from "react";
import { Suspense, use, useState } from "react";
import { ActivityIndicator } from "react-native";
import { installedPackages, moduleMap } from "./backtick";

// The modules this build carries, at their versions.
const modules = JSON.stringify(modulesOf(moduleMap, installedPackages));
// What runs the screens the server sends, with the modules the app provides:
// one per app, so what a screen makes once stays made.
const runtime = createRuntime(moduleMap);

async function fetchScreen(url: string): Promise<React.ReactNode> {
  const response = await fetch(url, {
    headers: { "x-backtick-modules": modules },
  });
  const bundle = (await response.text()) as Bundle<React.ReactNode>;
  return runtime.exec(bundle);
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
