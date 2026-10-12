import * as Navigation from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { evaluate } from "@backtickjs/react-native-client";
import Constants from "expo-constants";
import * as Font from "expo-font";
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
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import * as SafeArea from "react-native-safe-area-context";
import * as ReactNativeSvg from "react-native-svg";
import { SecureStore } from "./secureStore";

// What a screen may require: the packages this app was built with.
const modules = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNative,
  "@react-navigation/native": Navigation,
  "expo-secure-store": SecureStore,
  "expo-font": Font,
  "react-native-svg": ReactNativeSvg,
  "react-native-safe-area-context": SafeArea,
};

// The app is one stack screen, `Screen`, drawn once per server path on the
// stack. Screens push, replace and pop it themselves: see
// server/navigation.ts, which names it the same.
type Routes = {
  Screen: { path: string; animation?: "default" | "none" };
};

// In development, the server runs on the computer Expo was started from.
const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
const server: string = __DEV__
  ? `http://${host}:3000`
  : Constants.expoConfig?.extra?.serverUrl;

// `fetch` to the server, with the session a sign-in screen kept, the phone's
// time zone (the server dates stories in it) and the app's version.
async function request(path: string): Promise<Response> {
  const headers = new Headers({
    "x-time-zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
    "x-app-version": Constants.expoConfig?.version ?? "",
  });
  const session = await SecureStore.getItemAsync("session");
  if (session !== null) {
    headers.set("authorization", `Bearer ${session}`);
  }
  return fetch(`${server}${path}`, { headers });
}

// The screen at `path` on the server: its bundle, fetched and run with the
// app's packages.
async function fetchScreen(path: string): Promise<ReactNode> {
  const response = await request(path);
  if (!response.ok) {
    throw new Error(`${path} answered ${response.status}.`);
  }
  return evaluate(await response.text(), modules) as ReactNode;
}

const Stack = createNativeStackNavigator<Routes>();

// The app is a stack of server paths: every screen, the tab bar and the
// headers included, comes from the server. See server/routes.tsx.
export default function App() {
  useEffect(() => {
    if (__DEV__) {
      return onServerRestart();
    }
  }, []);
  return (
    <SafeArea.SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            animation: route.params.animation ?? "default",
          })}
        >
          <Stack.Screen
            name="Screen"
            component={ServerScreen}
            initialParams={{ path: "/" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeArea.SafeAreaProvider>
  );
}

function ServerScreen({ route }: NativeStackScreenProps<Routes, "Screen">) {
  const { path } = route.params;
  // Held here, which doesn't suspend, so the request outlives the render
  // that waits for it. Each request is numbered, so a new one also clears an
  // error the last one showed.
  const [request, setRequest] = useState(() => ({
    number: 0,
    screen: fetchScreen(path),
  }));
  const refetch = () =>
    setRequest(({ number }) => ({
      number: number + 1,
      screen: fetchScreen(path),
    }));
  useEffect(() => {
    if (__DEV__) {
      restarted.add(refetch);
      return () => void restarted.delete(refetch);
    }
  }, []);
  return (
    <Boundary key={request.number} retry={refetch}>
      <Suspense fallback={<ActivityIndicator style={{ flex: 1 }} />}>
        <Screen screen={request.screen} />
      </Suspense>
    </Boundary>
  );
}

// What the server sent, once it has: suspending until then, and throwing,
// for the boundary, a screen that couldn't be fetched or run.
function Screen({ screen }: { screen: Promise<ReactNode> }) {
  return use(screen);
}

// In development, every screen on the stack is fetched again when the server
// restarts, so a change to server/ shows as soon as you save. The server names
// each run at `/live`, and a new name is a new run.
const restarted = new Set<() => void>();

function onServerRestart(): () => void {
  let run: string | undefined;
  const timer = setInterval(async () => {
    try {
      const next = await (await request("/live")).text();
      if (run !== undefined && next !== run) {
        restarted.forEach((refetch) => refetch());
      }
      run = next;
    } catch {
      // Restarting: the next tick finds the new run.
    }
  }, 1000);
  return () => clearInterval(timer);
}

// A screen that couldn't be fetched or run: offline, most often.
class Boundary extends Component<
  { children: ReactNode; retry: () => void },
  { error: unknown }
> {
  state = { error: null as unknown };

  static getDerivedStateFromError(error: unknown) {
    return { error };
  }

  render() {
    if (this.state.error === null) {
      return this.props.children;
    }
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 24, gap: 16 }}>
        <Text style={{ fontSize: 16, textAlign: "center" }}>
          Couldn't reach MyStoryJar. Check your connection and try again.
        </Text>
        {__DEV__ && (
          <Text style={{ color: "#b91c1c", textAlign: "center" }}>
            {String((this.state.error as Error).message ?? this.state.error)}
          </Text>
        )}
        <Pressable onPress={this.props.retry} style={{ alignSelf: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Try again</Text>
        </Pressable>
      </View>
    );
  }
}
