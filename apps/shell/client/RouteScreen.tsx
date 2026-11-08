import { Stack, useFocusEffect, useIsFocused, useRoute } from "expo-router";
import { internalNavigationEvents } from "expo-router/build/global-state/internalNavigationEvents";
import { startTransition, use, useCallback, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { followStartingLink } from "./app/+native-intent";
import { hrefOfRoute, RuntimeContext } from "./App";
import { Failed } from "./Failed";
import { useDropPreloadedRoutes } from "./preloadedRoutesWorkaround";
import { showing } from "./reload";

// Hides the route name until the screen sets its title; a constant, so it's applied once.
const noTitle = { title: "" };

// A route: the runtime's screen for its href, active once it has come on
// top. A `reload` link fetches its screen again, and the current one stays
// until it's in. A screen that fails shows why, in its route alone, and its
// retry loads it again.
export function RouteScreen() {
  const { Screen, reload: reloadScreen, prefetch } = use(RuntimeContext);
  // The route, and its href, from its params.
  const route = useRoute();
  const href = hrefOfRoute(route.params);
  const focused = useIsFocused();
  const [shown, setShown] = useState(focused);
  if (focused && !shown) {
    setShown(true);
  }
  // Each `<Link prefetch>` on it, while it's on top, fetched ahead by the
  // runtime, at the href its screen will read: expo-router keeps one
  // preloaded route per navigator, but reports each.
  useEffect(() => {
    if (!focused) {
      return;
    }
    return internalNavigationEvents.addListener("actionDispatched", (event) => {
      if (event.actionType === "PRELOAD") {
        prefetch?.(hrefOfRoute((event.payload as { params?: object }).params));
      }
    });
  }, [focused, prefetch]);
  useDropPreloadedRoutes(focused);
  // Each retry mounts the screen again, once its answers are fetched anew.
  const [retries, setRetries] = useState(0);
  const retry = useCallback(
    () => startTransition(() => setRetries((count) => count + 1)),
    [],
  );
  const reload = useCallback(async () => {
    retry();
    await reloadScreen?.(href);
  }, [reloadScreen, href, retry]);
  // On top, it's the screen a `reload` link loads again.
  useFocusEffect(
    useCallback(() => {
      void followStartingLink();
      return showing(reload);
    }, [reload]),
  );

  if (Screen === undefined) {
    return null;
  }
  return (
    <>
      <Stack.Screen options={noTitle} />
      <ErrorBoundary
        resetKeys={[retries]}
        fallbackRender={({ error }) => <Failed error={error} retry={reload} />}
      >
        <Screen href={href} active={shown} />
      </ErrorBoundary>
    </>
  );
}
