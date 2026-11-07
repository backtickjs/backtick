import { Stack, useFocusEffect, useIsFocused, useRoute } from "expo-router";
import { startTransition, use, useCallback, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { followStartingLink } from "./app/+native-intent";
import { hrefOfRoute, LoadedRuntime } from "./App";
import { Failed } from "./Failed";
import { showing } from "./reload";

// Hides the route name until the screen sets its title; a constant, so it's applied once.
const noTitle = { title: "" };

// A route: the runtime's screen for its href. A route mounted hidden
// (`<Link prefetch>`) shows nothing until it comes on top, and fetches its
// layout meanwhile, so that draws at once. A `reload` link fetches its
// screen again, and the current one stays until it's in: the screen renders
// again in a transition, rather than mounting again. A screen that fails
// shows why, in its route alone, and its retry is a reload.
export function RouteScreen() {
  const { Screen, reload: reloadScreen, prefetch } = use(LoadedRuntime);
  // The route's key, which tells it apart, and its href, from its params.
  const route = useRoute();
  const href = hrefOfRoute(route.params);
  const focused = useIsFocused();
  const [shown, setShown] = useState(focused);
  if (focused && !shown) {
    setShown(true);
  }
  useEffect(() => {
    if (!shown) {
      prefetch(href);
    }
  }, [shown, prefetch, href]);
  const [reloads, setReloads] = useState(0);
  const reload = useCallback(() => {
    const reloaded = reloadScreen(route.key, href);
    startTransition(() => setReloads((count) => count + 1));
    return reloaded;
  }, [reloadScreen, route.key, href]);
  // On top, it's the screen a `reload` link loads again.
  useFocusEffect(
    useCallback(() => {
      void followStartingLink();
      return showing(reload);
    }, [reload]),
  );

  if (!shown) {
    return null;
  }
  return (
    <>
      <Stack.Screen options={noTitle} />
      <ErrorBoundary
        resetKeys={[reloads]}
        fallbackRender={({ error }) => <Failed error={error} retry={reload} />}
      >
        <Screen id={route.key} href={href} reloads={reloads} />
      </ErrorBoundary>
    </>
  );
}
