import { useIsFocused } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  type ReactNode,
  startTransition,
  Suspense,
  use,
  useEffect,
  useRef,
  useState,
} from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import {
  ErrorBoundary,
  type FallbackProps,
  getErrorMessage,
} from "react-error-boundary";
import { fetchScreen } from "./fetchScreen";
import { onServerRestart } from "./serverRestarts";

/**
 * The app's one stack screen, `Screen`, drawn once per server path on the
 * stack. Screens push, replace and pop it themselves: see
 * server/navigation.ts, which names it the same.
 */
export type Routes = {
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

/** The screen at a path on the stack, as the server draws it. */
export function ServerScreen({
  route,
}: NativeStackScreenProps<Routes, "Screen">) {
  const { path, fresh } = route.params;
  // Held here, which doesn't suspend, so the request outlives the render
  // that waits for it. Each retry is numbered, so it also clears the error
  // the last one showed.
  const [request, setRequest] = useState(() => ({
    number: 0,
    screen: fetchScreen(path),
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
      screen: fetchScreen(path),
    }));
  // The screen as it is now, drawn in place of the one shown, which stays
  // until then: a transition, so nothing flashes.
  const refresh = () =>
    startTransition(() =>
      setRequest(({ number }) => ({ number, screen: fetchScreen(path) })),
    );
  // Fetched again only when asked: by the screen that changed what this one
  // shows, or by the person; never on focus, which a phone's stack sends
  // while it changes, and which would remount the screen and lose what's
  // being typed. A marker it was created with is the fetch it was created
  // with.
  const handled = useRef(fresh);
  useEffect(() => {
    if (fresh !== handled.current) {
      handled.current = fresh;
      refresh();
    }
  }, [fresh]);
  useEffect(() => (__DEV__ ? onServerRestart(refresh) : undefined), []);
  if (!shown) {
    return null;
  }
  return (
    <ErrorBoundary
      key={request.number}
      FallbackComponent={Failed}
      onReset={retry}
    >
      <Suspense fallback={<ActivityIndicator style={{ flex: 1 }} />}>
        <Screen screen={request.screen} />
      </Suspense>
    </ErrorBoundary>
  );
}

// What the server sent, once it has: suspending until then, and throwing,
// for the boundary, a screen that couldn't be fetched or run.
function Screen({ screen }: { screen: Promise<ReactNode> }) {
  return use(screen);
}

// A screen that couldn't be fetched or run: offline, most often.
function Failed({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24, gap: 16 }}>
      <Text style={{ fontSize: 16, textAlign: "center" }}>
        Couldn't reach MyStoryJar. Check your connection and try again.
      </Text>
      {__DEV__ && (
        <Text style={{ color: "#b91c1c", textAlign: "center" }}>
          {getErrorMessage(error) ?? String(error)}
        </Text>
      )}
      <Pressable
        onPress={() => resetErrorBoundary()}
        style={{ alignSelf: "center" }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Try again</Text>
      </Pressable>
    </View>
  );
}
