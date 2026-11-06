import { useRoute } from "expo-router";
import { App } from "../../App";
import { ShellSplash } from "../../ShellSplash";

// A navigator for each app opened, so what's open closes with it. The app is
// its route's one `__backtick` param, which the shell sets as it opens it.
// Backtick's own splash shows until the app's root layout and first screen
// have arrived, so the wait is the builder's; the app starts with them.
export default function AppNavigator() {
  const app = (useRoute().params as { __backtick: string }).__backtick;
  return <App app={app} splash={<ShellSplash />} />;
}
