import { useNavigation } from "expo-router";
import { useNavigationState } from "expo-router/react-navigation";
import { useEffect } from "react";

// WORKAROUND: expo-router's fork of React Navigation reuses a preloaded route
// for the next replace (and popTo) with the params it was preloaded with,
// and every Backtick route is one route, so a `<Link replace>` after any
// `<Link prefetch>` opened the last prefetched screen instead. React
// Navigation fixed it in "fix replace and popTo not updating params"
// (https://github.com/react-navigation/react-navigation/commit/4ffe681aa8);
// expo-router 58.0.30 doesn't have it. Once expo-router's
// build/react-navigation/routers/StackRouter.js updates a reused route's
// params on REPLACE and POP_TO, delete this file and its call in
// RouteScreen.tsx: a preloaded route left in the stack is then harmless.
//
// Until then, the screen on top removes the routes preloaded above it (the
// runtime has fetched them ahead, and a preloaded screen draws nothing), as
// expo-router ignores a preloaded screen's own actions.
export function useDropPreloadedRoutes(focused: boolean) {
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
}
