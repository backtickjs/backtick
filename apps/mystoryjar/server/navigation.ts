import { cs } from "@backtickjs/core";
import {
  CommonActions,
  StackActions,
  useNavigation,
  type NavigationProp,
} from "@backtickjs/react-navigation-native";

// The app's one stack screen and its params, as ServerScreen.tsx declares
// them.
type Routes = {
  Screen: {
    path: string;
    animation?: "default" | "none";
    presentation?: "modal";
    fresh?: number;
  };
};

// The app's stack as a client component drives it. The app draws one stack
// screen, `Screen`, once per server path on the stack: see ServerScreen.tsx,
// which names it the same.
export const useStack = cs`() => {
  const navigation = $useNavigation<NavigationProp<Routes>>();
  return {
    // Shows the screen at \`path\` over the current one: as a sheet when
    // \`modal\`.
    navigate: (path: string, options: { modal?: boolean } = {}) =>
      navigation.dispatch(
        $StackActions.push("Screen", {
          path,
          ...(options.modal ? { presentation: "modal" as const } : {}),
        }),
      ),
    // Shows it in place of the current one, as a tab does: fetched again
    // when \`fresh\`, as after changing what it shows, though preloaded.
    replace: (path: string, options: { fresh?: boolean } = {}) =>
      navigation.dispatch(
        $StackActions.replace("Screen", {
          path,
          animation: "none",
          ...(options.fresh ? { fresh: Date.now() } : {}),
        }),
      ),
    // Returns to the screen at \`path\` under this one, fetched again, as
    // after changing what it shows.
    backFresh: (path: string) =>
      navigation.dispatch(
        $StackActions.popTo(
          "Screen",
          { path, fresh: Date.now() },
          { merge: true },
        ),
      ),
    // Fetches the current screen again, as pulling to refresh does.
    refresh: () => navigation.setParams({ fresh: Date.now() }),
    // Returns to the screen under this one, or, at the bottom of the stack,
    // as after signing out, to the landing page in its place.
    back: () =>
      navigation.canGoBack()
        ? navigation.goBack()
        : navigation.dispatch(
            $StackActions.replace("Screen", { path: "/", animation: "none" }),
          ),
    // Draws the screen at \`path\` out of sight, so moving to it later
    // shows it at once.
    // Once: a screen already drawn there is left as it is.
    preload: (path: string) => {
      // a stack's state, which lists what it preloaded
      const state = navigation.getState() as
        | { preloadedRoutes?: { params?: { path?: string } }[] }
        | undefined;
      const preloaded = state?.preloadedRoutes?.some(
        (route) => route.params?.path === path,
      );
      if (!preloaded) navigation.preload("Screen", { path, animation: "none" });
    },
    // Starts the stack over at \`path\`, as signing in or out does.
    restart: (path: string) =>
      navigation.dispatch(
        $CommonActions.reset({
          index: 0,
          routes: [{ name: "Screen", params: { path } }],
        }),
      ),
  };
}`;
