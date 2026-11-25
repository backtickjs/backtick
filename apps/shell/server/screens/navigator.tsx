import { cs, runtime } from "@backtickjs/core";
import { useColors } from "../components/look.js";
import { AccountSkeleton } from "../components/AccountSheet.js";
import { AskSkeleton } from "../components/AskSheet.js";
import { Failed } from "../components/Failed.js";
import { Sheet } from "../components/Sheet.js";
import {
  NavigationContainer,
  NavigationIndependentTree,
  StackActions,
  useNavigationContainerRef,
  useRoute,
} from "@react-navigation/native" with { backtick: "client" };
import { createNativeStackNavigator } from "@react-navigation/native-stack" with {
  backtick: "client",
};
import {
  Suspense,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react" with {
  backtick: "client",
};
import { ErrorBoundary } from "react-error-boundary" with {
  backtick: "client",
};
import {
  ActivityIndicator,
  Dimensions,
  Linking,
  View,
} from "react-native" with {
  backtick: "client",
};
import { captureScreen } from "react-native-view-shot" with {
  backtick: "client",
};
import { StatusBar } from "expo-status-bar" with { backtick: "client" };

type Screens = {
  Apps: undefined;
  Source: { id: string };
  App: { appId: string };
  Assistants: undefined;
  New: undefined;
  Edit: { id: string; title: string };
  Account: undefined;
};

const Navigator = cs`$createNativeStackNavigator<Screens>()`;

const screens = cs`new Map<string, Promise<ReactNode>>()`;

// Each shown screen's way to fetch itself again, by its route's key.
const refetches = cs`new Map<string, () => void>()`;

const fetchScreen = cs`(url: string) =>
  $runtime
    .fetch<ReactNode>(url)
    .then((response) => response.text())
    .then((bundle) => $runtime.exec(bundle))`;

const FetchedScreen = cs`({ id, url }: { id: string; url: string }) => {
  const [, setFetches] = $useState(0);
  $useEffect(() => {
    $refetches.set(id, () => {
      $screens.set(id, $fetchScreen(url));
      setFetches((fetches) => fetches + 1);
    });
    return () => void $refetches.delete(id);
  }, [id, url]);
  if (!$screens.has(id)) {
    $screens.set(id, $fetchScreen(url));
  }
  return $use($screens.get(id)!);
}`;

// A screen's way to fetch itself again, and only itself. In a transition, the
// screen stays until the new one is drawn; outside one, its spinner shows
// meanwhile.
export const useReloadScreen = cs`() => {
  const { key } = $useRoute();
  return $useCallback(() => $refetches.get(key)?.(), [key]);
}`;

// An app, as the phone opens it: its `/`, with a runtime of its own, so no
// two apps share what they make.
const openApp = cs`async (appId: string): Promise<ReactNode> => {
  const app = $runtime.create();
  const response = await app.fetch<ReactNode>(
    "https://" + appId + ".backtickjs.app/",
  );
  return app.exec(await response.text());
}`;

// An app's first screen is its preview on the home's card: captured at the
// first touch, before it changes anything, or once it has had a moment to
// draw. Once per open; a capture that fails is only logged.
const savePreview = cs`async (origin: string, appId: string) => {
  const { width, height } = $Dimensions.get("window");
  const base64 = await $captureScreen({
    format: "jpg",
    quality: 0.8,
    width: 540,
    height: Math.round((540 * height) / width),
    result: "base64",
  });
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  const response = await fetch(origin + "/apps/" + appId + "/preview", {
    method: "POST",
    headers: { "content-type": "image/jpeg" },
    body: bytes,
  });
  if (!response.ok) {
    throw new Error("The home answered " + response.status + ".");
  }
}`;

const AppScreen = cs`({
  id,
  appId,
  origin,
}: {
  id: string;
  appId: string;
  origin: string;
}) => {
  if (!$screens.has(id)) {
    $screens.set(id, $openApp(appId));
  }
  const screen = $use($screens.get(id)!);
  const captured = $useRef(false);
  const capture = $useCallback(() => {
    if (captured.current) {
      return;
    }
    captured.current = true;
    $savePreview(origin, appId).catch((error: unknown) =>
      console.warn("Saving the preview failed:", error),
    );
  }, [origin, appId]);
  $useEffect(() => {
    const timer = setTimeout(capture, 2000);
    return () => clearTimeout(timer);
  }, [capture]);
  return (
    <$View style={{ flex: 1 }} onTouchStartCapture={capture}>
      {screen}
    </$View>
  );
}`;

// A route's screen as it loads: `fallback` until it's in, and why it failed,
// with Try again, if it didn't.
const Loaded = cs`(props: { id: string; fallback: any; children: any }) => (
  <$ErrorBoundary
    fallbackRender={({ error, resetErrorBoundary }) => (
      <$Failed
        error={error}
        retry={() => {
          $screens.delete(props.id);
          resetErrorBoundary();
        }}
      />
    )}
  >
    <$Suspense fallback={props.fallback}>{props.children}</$Suspense>
  </$ErrorBoundary>
)`;

// A sheet's route: the sheet slides in at once, with `skeleton` in it until
// its contents are in.
const SheetLayout = cs`(props: {
  id: string;
  onClose: () => void;
  skeleton: ReactNode;
  children: ReactNode;
}) => (
  <$Sheet onClose={props.onClose}>
    <$Loaded id={props.id} fallback={props.skeleton}>
      {props.children}
    </$Loaded>
  </$Sheet>
)`;

// The app a link into the phone names: `backtick://<appId>/…` or the app's own
// address, `https://<appId>.backtickjs.app/…`.
const appIdOf = cs`(url: string): string | undefined => {
  const id = "([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})";
  const match =
    new RegExp("^backtick://" + id + "(/|$|\\?)").exec(url) ??
    new RegExp("^https://" + id + "\\.backtickjs\\.app(/|$|\\?)").exec(url);
  return match?.[1];
}`;

// The home, on its paper, with its status bar: the user's apps, an app's
// source from its sheet, and the apps themselves, each screen fetched from the home's server at `origin`. A link
// into the phone naming an app opens it over the apps, one at a time.
export const HomeNavigator = cs`({ origin }: { origin: string }) => {
  const colors = $useColors();
  const navigation = $useNavigationContainerRef<Screens>();
  const follow = $useCallback(
    (url: string | null | undefined) => {
      const appId = url ? $appIdOf(url) : undefined;
      if (appId !== undefined && navigation.isReady()) {
        navigation.reset({
          index: 1,
          routes: [{ name: "Apps" }, { name: "App", params: { appId } }],
        });
      }
    },
    [navigation],
  );
  $useEffect(() => {
    const subscription = $Linking.addEventListener("url", ({ url }) =>
      follow(url),
    );
    return () => subscription.remove();
  }, [follow]);
  return (
    <$View style={{ flex: 1, backgroundColor: colors.paper }}>
      <$StatusBar style="auto" />
      <$NavigationIndependentTree>
        <$NavigationContainer
          ref={navigation}
          onReady={() => void $Linking.getInitialURL().then(follow)}
        >
          <$Navigator.Navigator
            screenLayout={({ route, children }) => (
              <$Loaded
                id={route.key}
                fallback={<$ActivityIndicator style={{ flex: 1 }} />}
              >
                {children}
              </$Loaded>
            )}
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.paper },
            }}
          >
            <$Navigator.Screen name="Apps">
              {({ route }) => (
                <$FetchedScreen id={route.key} url={origin + "/apps"} />
              )}
            </$Navigator.Screen>
            <$Navigator.Screen name="Source">
              {({ route }) => (
                <$FetchedScreen
                  id={route.key}
                  url={origin + "/source/" + route.params.id}
                />
              )}
            </$Navigator.Screen>
            <$Navigator.Screen
              name="Assistants"
              // Its own large title, under the back button.
              options={{
                headerShown: true,
                title: "",
                headerBackTitle: "Apps",
                headerTintColor: colors.ink,
                headerStyle: { backgroundColor: colors.paper },
                headerShadowVisible: false,
              }}
            >
              {({ route }) => (
                <$FetchedScreen id={route.key} url={origin + "/assistants"} />
              )}
            </$Navigator.Screen>
            {/* Sheets over the apps, fetched as they open, so each shows
                what's true now, over a screen that's see-through. */}
            <$Navigator.Group
              screenOptions={{
                presentation: "transparentModal",
                animation: "none",
                contentStyle: { backgroundColor: "transparent" },
              }}
            >
              <$Navigator.Screen
                name="New"
                layout={({ route, navigation, children }) => (
                  <$SheetLayout
                    id={route.key}
                    onClose={() => navigation.goBack()}
                    skeleton={<$AskSkeleton title="New app" />}
                  >
                    {children}
                  </$SheetLayout>
                )}
              >
                {({ route }) => (
                  <$FetchedScreen id={route.key} url={origin + "/new"} />
                )}
              </$Navigator.Screen>
              <$Navigator.Screen
                name="Edit"
                layout={({ route, navigation, children }) => (
                  <$SheetLayout
                    id={route.key}
                    onClose={() => navigation.goBack()}
                    skeleton={
                      <$AskSkeleton title={"Edit " + route.params.title} />
                    }
                  >
                    {children}
                  </$SheetLayout>
                )}
              >
                {({ route }) => (
                  <$FetchedScreen
                    id={route.key}
                    url={origin + "/apps/" + route.params.id + "/edit"}
                  />
                )}
              </$Navigator.Screen>
              <$Navigator.Screen
                name="Account"
                layout={({ route, navigation, children }) => (
                  <$SheetLayout
                    id={route.key}
                    onClose={() => navigation.goBack()}
                    skeleton={<$AccountSkeleton />}
                  >
                    {children}
                  </$SheetLayout>
                )}
              >
                {({ route }) => (
                  <$FetchedScreen id={route.key} url={origin + "/account"} />
                )}
              </$Navigator.Screen>
            </$Navigator.Group>
            <$Navigator.Screen name="App">
              {({ route }) => (
                <$AppScreen
                  id={route.key}
                  appId={route.params.appId}
                  origin={origin}
                />
              )}
            </$Navigator.Screen>
          </$Navigator.Navigator>
        </$NavigationContainer>
      </$NavigationIndependentTree>
    </$View>
  );
}`;
