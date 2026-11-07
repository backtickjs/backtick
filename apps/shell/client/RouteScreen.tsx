import { Stack, useFocusEffect, useIsFocused, useRoute } from "expo-router";
import { startTransition, use, useCallback, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { followStartingLink } from "./app/+native-intent";
import { hrefOfRoute, LoadedRuntime } from "./App";
import { Failed } from "./Failed";
import { showing } from "./reload";

// Hides the route name until the screen sets its title; a constant, so it's applied once.
const noTitle = { title: "" };

// A route: the runtime's screen for its href, active once it has come on
// top (`<Link prefetch>` mounts a route ahead of its navigation). A `reload`
// link fetches its screen again, and the current one stays until it's in. A
// screen that fails shows why, in its route alone, and its retry mounts it
// again.
export function RouteScreen() {
  const { Screen, reload: reloadScreen } = use(LoadedRuntime);
  // The route's key, which tells it apart, and its href, from its params.
  const route = useRoute();
  const href = hrefOfRoute(route.params);
  const focused = useIsFocused();
  const [shown, setShown] = useState(focused);
  if (focused && !shown) {
    setShown(true);
  }
  // Each retry mounts the screen again, which fetches it anew.
  const [retries, setRetries] = useState(0);
  const retry = useCallback(
    () => startTransition(() => setRetries((count) => count + 1)),
    [],
  );
  const reload = useCallback(async () => {
    retry();
    await reloadScreen?.(route.key);
  }, [reloadScreen, route.key, retry]);
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
        fallbackRender={({ error }) => <Failed error={error} retry={retry} />}
      >
        <Screen id={route.key} href={href} active={shown} />
      </ErrorBoundary>
    </>
  );
}
