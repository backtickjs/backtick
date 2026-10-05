import { Backtick, invalidate } from "@backtickjs/react-native-client";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  Component,
  type ReactNode,
  Suspense,
  useEffect,
  useState,
} from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNative from "react-native";
import { ActivityIndicator, Text } from "react-native";

// What a screen may require: the packages this app was built with.
const modules = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNative,
};

// The versions of those packages, as in package.json: what the server
// bundles each screen for.
const packageVersions = { react: "19.2.3", "react-native": "0.86.3" };

// Your Backtick server runs on the computer Expo was started from.
const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
const server = `http://${host}:3000`;
const url = `${server}/home`;

export default function App() {
  // In development, the screen is drawn again each time the server restarts,
  // so a change to server/ shows as soon as you save.
  const [reload, setReload] = useState(0);
  useEffect(() => {
    if (__DEV__) {
      return onServerRestart(() => {
        invalidate(url);
        setReload((count) => count + 1);
      });
    }
  }, []);
  // The whole screen, its layout included, comes from the server: see
  // server/Home.tsx.
  return (
    <>
      <Boundary key={reload}>
        <Suspense fallback={<ActivityIndicator style={{ flex: 1 }} />}>
          <Backtick
            url={url}
            modules={modules}
            packageVersions={packageVersions}
          />
        </Suspense>
      </Boundary>
      <StatusBar style="auto" />
    </>
  );
}

// Calls `restarted` when the server starts a new run: it names each run at
// `/live`, and a new name is a new run.
function onServerRestart(restarted: () => void): () => void {
  let run: string | undefined;
  const timer = setInterval(async () => {
    try {
      const next = await (await fetch(`${server}/live`)).text();
      if (run !== undefined && next !== run) {
        restarted();
      }
      run = next;
    } catch {
      // Restarting: the next tick finds the new run.
    }
  }, 1000);
  return () => clearInterval(timer);
}

// Why the screen couldn't be drawn: the server unreachable, or a screen the
// app can't run.
class Boundary extends Component<{ children: ReactNode }, { error: unknown }> {
  state = { error: null as unknown };

  static getDerivedStateFromError(error: unknown) {
    return { error };
  }

  render() {
    if (this.state.error === null) {
      return this.props.children;
    }
    return (
      <Text style={{ margin: 24, marginTop: 96, color: "#b91c1c" }}>
        {String((this.state.error as Error).message ?? this.state.error)}
        {"\n\n"}Is your Backtick server running? npm start runs it alongside
        Expo.
      </Text>
    );
  }
}
