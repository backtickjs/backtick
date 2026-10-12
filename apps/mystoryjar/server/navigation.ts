import { cs } from "@backtickjs/core";
import {
  StackActions,
  useNavigation,
} from "@backtickjs/react-navigation-native";

// The app's stack as a client component drives it. The app draws one stack
// screen, `Screen`, once per server path on the stack: see App.tsx, which
// names it the same.
export const useStack = cs`() => {
  const navigation = $useNavigation();
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
  };
}`;
