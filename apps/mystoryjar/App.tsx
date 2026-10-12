import * as Navigation from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { evaluate } from "@backtickjs/react-native-client";
import * as AppleAuthentication from "expo-apple-authentication";
import Constants from "expo-constants";
import * as Crypto from "expo-crypto";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  Component,
  type ReactNode,
  startTransition,
  Suspense,
  use,
  useEffect,
  useState,
} from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNative from "react-native";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import * as SafeArea from "react-native-safe-area-context";
import * as ReactNativeSvg from "react-native-svg";
import { SecureStore } from "./secureStore";

// Google's and Facebook's SDKs need native code that Expo Go and the web
// don't have: there, they're offered empty, and screens leave out what needs
// them.
const native =
  Platform.OS !== "web" && Constants.executionEnvironment !== "storeClient";

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
  "expo-apple-authentication": AppleAuthentication,
  "expo-crypto": Crypto,
  "@react-native-google-signin/google-signin": native
    ? require("@react-native-google-signin/google-signin")
    : {},
  "react-native-fbsdk-next": native ? require("react-native-fbsdk-next") : {},
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
            // a screen is its path: one a screen preloads is the one shown
            // when the stack moves to that path
            getId={({ params }) => params.path}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeArea.SafeAreaProvider>
  );
}

function ServerScreen({
  route,
  navigation,
}: NativeStackScreenProps<Routes, "Screen">) {
  const { path } = route.params;
  // Held here, which doesn't suspend, so the request outlives the render
  // that waits for it. Each retry is numbered, so it also clears the error
  // the last one showed.
  const [request, setRequest] = useState(() => ({
    number: 0,
    screen: fetchScreen(path),
    fetchedAt: Date.now(),
  }));
  // After an error: the spinner, while it loads again.
  const retry = () =>
    setRequest(({ number }) => ({
      number: number + 1,
      screen: fetchScreen(path),
      fetchedAt: Date.now(),
    }));
  // The screen as it is now, drawn in place of the one shown, which stays
  // until then: a transition, so nothing flashes.
  const refresh = () =>
    startTransition(() =>
      setRequest(({ number }) => ({
        number,
        screen: fetchScreen(path),
        fetchedAt: Date.now(),
      })),
    );
  useEffect(() => {
    // Fetched again each time it's shown, as a preloaded screen may have
    // been fetched long before; not when it was just fetched to be shown.
    const unsubscribe = navigation.addListener("focus", () =>
      setRequest((current) => {
        if (Date.now() - current.fetchedAt > 1000) refresh();
        return current;
      }),
    );
    if (!__DEV__) {
      return unsubscribe;
    }
    restarted.add(refresh);
    return () => {
      unsubscribe();
      restarted.delete(refresh);
    };
  }, []);
  return (
    <Boundary key={request.number} retry={retry}>
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
