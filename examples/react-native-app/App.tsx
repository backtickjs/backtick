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
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

// What a screen's bundle may require: the packages this app was built with.
const modules = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNative,
};

// The versions those packages are at, in `package.json`: what the server
// bundles for.
const packageVersions = { react: "19.2.3", "react-native": "0.86.3" };

// The example server runs where Expo's dev server does, the computer this app
// was started from, unless told otherwise.
const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
const server = process.env.EXPO_PUBLIC_BACKTICK_SERVER ?? `http://${host}:5179`;
const url = `${server}/home`;

export default function App() {
  // Each reload forgets the screen and draws it again, so it's asked for anew:
  // in development, every time the server restarts, so a change to its code
  // shows without a new app.
  const [reload, setReload] = useState(0);
  useEffect(() => {
    if (__DEV__) {
      return onServerRestart(server, () => {
        invalidate(url);
        setReload((count) => count + 1);
      });
    }
  }, []);
  return (
    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
      <ScrollView>
        <Boundary key={reload}>
          <Suspense fallback={<ActivityIndicator style={{ marginTop: 48 }} />}>
            <Backtick
              url={url}
              modules={modules}
              packageVersions={packageVersions}
            />
          </Suspense>
        </Boundary>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

// Calls `restarted` each time the server starts again, as its watcher does on
// every change: the server names each of its runs on `/live`, and a new name
// is a new run. Retries while the server is down. Returns how to stop.
function onServerRestart(server: string, restarted: () => void): () => void {
  let run: string | undefined;
  let socket: WebSocket | undefined;
  let retry: ReturnType<typeof setTimeout> | undefined;
  let stopped = false;
  const connect = () => {
    socket = new WebSocket(`${server.replace(/^http/, "ws")}/live`);
    socket.onmessage = (event) => {
      if (run !== undefined && run !== event.data) {
        restarted();
      }
      run = String(event.data);
    };
    socket.onclose = () => {
      if (!stopped) {
        retry = setTimeout(connect, 500);
      }
    };
  };
  connect();
  return () => {
    stopped = true;
    clearTimeout(retry);
    socket?.close();
  };
}

// Why a screen couldn't be drawn: the server unreachable, or a bundle the app
// can't run.
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
      <Text style={{ margin: 24, color: "#b91c1c" }}>
        {String((this.state.error as Error).message ?? this.state.error)}
        {"\n\n"}Is the server running? pnpm --filter
        @backtickjs/example-react-native-server start
      </Text>
    );
  }
}
