import {
  type NativeStackNavigationProp,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { useState } from "react";
import { ServerScreen } from "../ServerScreen";

type Params = {
  path?: string[];
  backtickApp?: string;
  [query: string]: string | string[] | undefined;
};
type Navigation = NativeStackNavigationProp<{
  index: Params;
  "[...path]": Params;
}>;

// Every path: the open app's screen at it, Backtick's home when none is. The
// path and its query, exactly as the link had them.
export default function AppScreen() {
  const { path, backtickApp, ...query } = useLocalSearchParams<Params>();
  const { routes } = useNavigation<Navigation>().getState()!;
  // A screen is the app of the link that opened it: its own, or the nearest
  // below, as it isn't in the stack yet. Empty, or none: Backtick's.
  const [app] = useState(() => {
    const opener = routes.findLast(
      (route) => route.params?.backtickApp !== undefined,
    );
    return (backtickApp ?? opener?.params?.backtickApp) || null;
  });
  const search = new URLSearchParams();
  for (const [name, value] of Object.entries(query)) {
    for (const each of [value ?? []].flat()) {
      search.append(name, each);
    }
  }
  const route =
    "/" + [path ?? []].flat().join("/") + (search.size > 0 ? "?" + search : "");
  return <ServerScreen key={route} app={app} path={route} />;
}
