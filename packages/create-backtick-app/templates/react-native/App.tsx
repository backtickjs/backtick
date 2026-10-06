import { evaluate } from "@backtickjs/react-native-client";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  Component,
  type ReactNode,
  Suspense,
  use,
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

// Your Backtick server runs on the computer Expo was started from.
const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
const server = `http://${host}:3000`;

// The screen at `path` on your server: its bundle, fetched and run with the
// app's packages. Your fetch to shape: headers, auth, caching.
async function fetchScreen(path: string): Promise<ReactNode> {
  const response = await fetch(`${server}${path}`);
  if (!response.ok) {
    throw new Error(`${path} answered ${response.status}.`);
  }
  return evaluate(await response.text(), modules) as ReactNode;
}

export default function App() {
  // Held here, which doesn't suspend, so the request outlives the render
  // that waits for it. Each request is numbered, so a new one also clears an
  // error the last one showed.
  const [request, setRequest] = useState(() => ({
    number: 0,
    screen: fetchScreen("/home"),
  }));
  useEffect(() => {
    // In development, the screen is fetched again each time the server
    // restarts, so a change to server/ shows as soon as you save.
    if (__DEV__) {
      return onServerRestart(() =>
        setRequest(({ number }) => ({
          number: number + 1,
          screen: fetchScreen("/home"),
        })),
      );
    }
  }, []);
  // The whole screen, its layout included, comes from the server: see
  // server/Home.tsx.
  return (
    <>
      <Boundary key={request.number}>
        <Suspense fallback={<ActivityIndicator style={{ flex: 1 }} />}>
          <Screen screen={request.screen} />
        </Suspense>
      </Boundary>
      <StatusBar style="auto" />
    </>
  );
}

// What the server sent, once it has: suspending until then, and throwing,
// for the boundary, a screen that couldn't be fetched or run.
function Screen({ screen }: { screen: Promise<ReactNode> }) {
  return use(screen);
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
