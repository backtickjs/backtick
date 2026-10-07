import { evaluate } from "@backtickjs/react-native-client";
import * as React from "react";
import { Suspense, use, useState } from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNative from "react-native";
import { ActivityIndicator } from "react-native";

// What a screen may require: the packages your app is built with.
const modules = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNative,
};

async function fetchScreen(url: string): Promise<React.ReactNode> {
  const response = await fetch(url);
  return evaluate(await response.text(), modules) as React.ReactNode;
}

export default function App() {
  const [screen] = useState(() =>
    fetchScreen("https://api.example.com/screens/home"),
  );
  return (
    <Suspense fallback={<ActivityIndicator />}>
      <Screen screen={screen} />
    </Suspense>
  );
}

function Screen({ screen }: { screen: Promise<React.ReactNode> }) {
  return use(screen);
}
