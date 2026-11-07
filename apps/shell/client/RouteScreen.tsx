import { Stack, useFocusEffect, useIsFocused, useRoute } from "expo-router";
import { startTransition, use, useCallback, useEffect, useState } from "react";
import { followStartingLink } from "./app/+native-intent";
import { hrefOfRoute, LoadedRuntime } from "./App";
import { showing } from "./reload";

// Hides the route name until the screen sets its title; a constant, so it's applied once.
const noTitle = { title: "" };

// A route: the runtime's screen for its href. A route mounted hidden
// (`<Link prefetch>`) shows nothing until it comes on top, and fetches its
// layout meanwhile, so that draws at once. A `reload` link fetches its
// screen again, and the current one stays until it's in: the screen renders
// again in a transition, rather than mounting again.
export function RouteScreen() {
  const { Screen, reload: reloadScreen, prefetch } = use(LoadedRuntime);
  // The route's own href, from its params: a route's never changes.
  const href = hrefOfRoute(useRoute().params);
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
    const reloaded = reloadScreen(href);
    startTransition(() => setReloads((count) => count + 1));
    return reloaded;
  }, [reloadScreen, href]);
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
      <Screen href={href} reloads={reloads} />
    </>
  );
}
