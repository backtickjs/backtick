import { cs } from "@backtickjs/core";
import {
  CommonActions,
  StackActions,
  useNavigation,
  type NavigationProp,
} from "@backtickjs/react-navigation-native";

// The app's one stack screen and its params, as App.tsx declares them.
type Routes = {
  Screen: { path: string; animation?: "default" | "none" };
};

// The app's stack as a client component drives it. The app draws one stack
// screen, `Screen`, once per server path on the stack: see App.tsx, which
// names it the same.
export const useStack = cs`() => {
  const navigation = $useNavigation<NavigationProp<Routes>>();
  return {
    // Shows the screen at \`path\` over the current one.
    navigate: (path: string) =>
      navigation.dispatch($StackActions.push("Screen", { path })),
    // Shows it in place of the current one, as a tab does.
    replace: (path: string) =>
      navigation.dispatch(
        $StackActions.replace("Screen", { path, animation: "none" }),
      ),
    back: () => navigation.goBack(),
    // Draws the screen at \`path\` out of sight, so moving to it later
    // shows it at once.
    preload: (path: string) =>
      navigation.preload("Screen", { path, animation: "none" }),
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
