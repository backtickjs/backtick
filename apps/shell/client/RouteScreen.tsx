import {
  Stack,
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from "expo-router";
import { useNavigationState } from "expo-router/react-navigation";
import { internalNavigationEvents } from "expo-router/build/global-state/internalNavigationEvents";
import { startTransition, use, useCallback, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { followStartingLink } from "./app/+native-intent";
import { hrefOfRoute, RuntimeContext } from "./App";
import { Failed } from "./Failed";
import { showing } from "./reload";

// Hides the route name until the screen sets its title; a constant, so it's applied once.
const noTitle = { title: "" };

// A route: the runtime's screen for its href, active once it has come on
// top. A `reload`
// link fetches its screen again, and the current one stays until it's in. A
// screen that fails shows why, in its route alone, and its retry loads it
// again.
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
  // runtime: expo-router keeps one preloaded route per navigator, but reports
  // each.
  useEffect(() => {
    if (!focused) {
      return;
    }
    return internalNavigationEvents.addListener("actionDispatched", (event) => {
      const { path } = (event.payload ?? {}) as { path?: unknown };
      if (event.actionType === "PRELOAD" && typeof path === "string") {
        prefetch?.(path);
      }
    });
  }, [focused, prefetch]);
  // And the route it preloads removed, as the stack would reuse it, params
  // included, for the next replace. The screen on top removes it: expo-router
  // ignores a preloaded screen's actions.
  const navigation = useNavigation();
  const preloads = useNavigationState(
    (state) => state.routes.length > state.index + 1,
  );
  useEffect(() => {
    const state = navigation.getState();
    if (focused && preloads && state !== undefined) {
      navigation.dispatch({
        type: "RESET",
        payload: { ...state, routes: state.routes.slice(0, state.index + 1) },
        target: state.key,
      });
    }
  }, [focused, preloads, navigation]);
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
