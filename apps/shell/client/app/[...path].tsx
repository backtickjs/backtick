import { useLocalSearchParams } from "expo-router";
import { ServerScreen } from "../ServerScreen";

// Every path: the open app's screen at it, Backtick's home when none is. The
// path and its query, exactly as the link had them.
export default function AppScreen() {
  const { path, ...query } = useLocalSearchParams();
  const search = new URLSearchParams();
  for (const [name, value] of Object.entries(query)) {
    for (const each of [value ?? []].flat()) {
      search.append(name, each);
    }
  }
  const route =
    "/" + [path ?? []].flat().join("/") + (search.size > 0 ? "?" + search : "");
  return <ServerScreen key={route} path={route} />;
}
