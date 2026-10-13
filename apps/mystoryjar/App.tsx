import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { evaluate } from "@backtickjs/react-native-client";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  Component,
  type ReactNode,
  startTransition,
  Suspense,
  use,
  useEffect,
  useRef,
  useState,
} from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import * as SafeArea from "react-native-safe-area-context";
import { buildId } from "./build";
import { moduleMap } from "./moduleMap";
import * as SecureStore from "./secureStore";

// The app is one stack screen, `Screen`, drawn once per server path on the
// stack. Screens push, replace and pop it themselves: see
// server/navigation.ts, which names it the same.
type Routes = {
  Screen: {
    path: string;
    animation?: "default" | "none";
    // shown as a sheet over the screen under it, as editing a story is
    presentation?: "modal";
    // set, to a new value each time, when a screen is to be fetched again:
    // it changed elsewhere, or the person pulled to refresh
    fresh?: number;
  };
};

// In development, the server runs on the computer Expo was started from.
const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
const server: string = __DEV__
  ? `http://${host}:3000`
  : Constants.expoConfig?.extra?.serverUrl;

// `fetch` to the server, with the session a sign-in screen kept, the phone's
// time zone (the server dates stories in it) and this build's id (the server
// bundles screens for the modules it carries).
async function request(path: string): Promise<Response> {
  const headers = new Headers({
    "x-time-zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
    "x-build-id": buildId ?? "",
  });
  const session = await SecureStore.getItemAsync("session");
  if (session !== null) {
    headers.set("authorization", `Bearer ${session}`);
  }
  return fetch(`${server}${path}`, { headers });
}

// The screen at `path` on the server: its bundle, fetched and run with the
// app's packages.
async function loadScreen(path: string): Promise<ReactNode> {
  const response = await request(path);
  if (response.status === 426) {
    throw new Deprecated();
  }
  if (!response.ok) {
    throw new Error(`${path} answered ${response.status}.`);
  }
  return evaluate(await response.text(), moduleMap) as ReactNode;
}

// The same, marked as settled once it has, as React's `use` reads a
// promise: one fetched ahead, for a preloaded screen, then draws at once.
// `why` is what asked, which development logs.
function fetchScreen(path: string, why: string): Promise<ReactNode> {
  if (__DEV__) console.log(`[app] ${path}: ${why}`);
  const screen = loadScreen(path) as Promise<ReactNode> & {
    status?: "fulfilled" | "rejected";
    value?: ReactNode;
    reason?: unknown;
  };
  screen.then(
    (value) => Object.assign(screen, { status: "fulfilled", value }),
    (reason) => Object.assign(screen, { status: "rejected", reason }),
  );
  return screen;
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
            presentation: route.params.presentation ?? "card",
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

function ServerScreen({ route }: NativeStackScreenProps<Routes, "Screen">) {
  const { path } = route.params;
  // Held here, which doesn't suspend, so the request outlives the render
  // that waits for it. Each retry is numbered, so it also clears the error
  // the last one showed.
  const [request, setRequest] = useState(() => ({
    number: 0,
    screen: fetchScreen(path, "mounted"),
  }));
  // A preloaded screen is fetched at once and drawn only once shown: drawn
  // out of sight, Android can let it show through the screen in front.
  const focused = useIsFocused();
  const [shown, setShown] = useState(focused);
  if (focused && !shown) {
    setShown(true);
  }
  // After an error: the spinner, while it loads again.
  const retry = () =>
    setRequest(({ number }) => ({
      number: number + 1,
      screen: fetchScreen(path, "retried"),
    }));
  // The screen as it is now, drawn in place of the one shown, which stays
  // until then: a transition, so nothing flashes.
  const refresh = (why: string) =>
    startTransition(() =>
      setRequest(({ number }) => ({ number, screen: fetchScreen(path, why) })),
    );
  // Fetched again only when asked: by the screen that changed what this one
  // shows, or by the person; never on focus, which a phone's stack sends
  // while it changes, and which would remount the screen and lose what's
  // being typed.
  // A marker it was created with is the fetch it was created with.
  const { fresh } = route.params;
  const handled = useRef(fresh);
  useEffect(() => {
    if (fresh !== handled.current) {
      handled.current = fresh;
      refresh("asked to be fresh");
    }
  }, [fresh]);
  useEffect(() => {
    if (__DEV__) {
      const restart = () => refresh("the server restarted");
      restarted.add(restart);
      return () => void restarted.delete(restart);
    }
  }, []);
  if (!shown) {
    return null;
  }
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

// What the server answers a build it no longer draws for, on purpose: in
// every build, so a build retired later still knows to ask for an update.
class Deprecated extends Error {}

// A screen that couldn't be fetched or run: offline, most often; or this
// build is retired, and only an update helps.
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
    if (this.state.error instanceof Deprecated) {
      return (
        <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
          <Text style={{ fontSize: 16, textAlign: "center" }}>
            This version of MyStoryJar is no longer supported. Update it from
            the App Store or Google Play to keep writing your stories.
          </Text>
        </View>
      );
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
