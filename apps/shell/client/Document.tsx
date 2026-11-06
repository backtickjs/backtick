import {
  type ReactNode,
  startTransition,
  Suspense,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFocusEffect, useIsFocused, useRoute } from "expo-router";
import { ErrorBoundary } from "react-error-boundary";
import { followStartingLink } from "./app/+native-intent";
import { Failed } from "./Failed";
import { hrefOfRoute, LoadedScreens } from "./AppLayout";
import { savePreview } from "./preview";
import { showing } from "./shown";
import { isSignedIn } from "../modules/backtick-session/src";

// A route's screen: the one its navigation waited for. A route mounted
// hidden (`<Link prefetch>`) shows nothing until it comes on top, and then
// takes the screen fetched for the navigation that put it there, whichever
// route expo-router reuses for it.
export function Document() {
  const screens = use(LoadedScreens);
  const { app } = screens;
  // The route's own href, from its params: a route's never changes.
  const path = hrefOfRoute(useRoute().params);
  const focused = useIsFocused();
  // Held here, where nothing suspends, so the request outlives the render
  // that waits for it.
  const [screen, setScreen] = useState<Promise<ReactNode> | null>(() =>
    focused ? screens.screenFor(path) : null,
  );
  if (focused && screen === null) {
    setScreen(screens.screenFor(path));
  }
  // Shown once focused, until it unmounts.
  const shown = useRef<() => void>(undefined);
  useEffect(() => {
    if (focused && shown.current === undefined) {
      shown.current = screens.showing(path);
    }
  }, [focused, screens, path]);
  useEffect(() => () => shown.current?.(), []);
  // The current screen stays until the new one has arrived.
  const reload = useCallback(
    (signal?: AbortSignal) => {
      const next = screens.fetch(path, signal);
      startTransition(() => setScreen(next));
      return next;
    },
    [screens, path],
  );
  // An app's first screen, once it's had a moment to draw (a game's first
  // frame included), is its preview on the home's card. Never in the way:
  // a capture that fails is only logged.
  useEffect(() => {
    if (screen === null || app === null || path !== "/" || !isSignedIn()) {
      return;
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    let left = false;
    screen.then(
      () => {
        if (!left) {
          timer = setTimeout(
            () =>
              savePreview(app).catch((error) =>
                console.warn("Saving the preview failed:", error),
              ),
            2000,
          );
        }
      },
      () => {},
    );
    return () => {
      left = true;
      clearTimeout(timer);
    };
  }, [app, path, screen]);
  // On top, it's the screen a `reload` link loads again, in place.
  useFocusEffect(
    useCallback(() => {
      void followStartingLink();
      return showing(reload);
    }, [reload]),
  );

  if (screen === null) {
    return null;
  }
  return (
    <ErrorBoundary
      resetKeys={[screen]}
      fallbackRender={({ error }) => <Failed error={error} retry={reload} />}
    >
      <Suspense fallback={null}>
        <Screen screen={screen} />
      </Suspense>
    </ErrorBoundary>
  );
}

function Screen({ screen }: { screen: Promise<ReactNode> }) {
  return use(screen);
}
