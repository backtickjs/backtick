import { arrived } from "@backtickjs/router";
import { use, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { OpenApp } from "../screens";
import { ServerScreen } from "../ServerScreen";

// Every path: the open app's screen at it, Backtick's home when none is. The
// path and its query, exactly as the link had them, without what `navigator.ts`
// adds for the shell.
export default function AppScreen() {
  const { path, backtick, ...query } = useLocalSearchParams();
  const app = use(OpenApp);
  const search = new URLSearchParams();
  for (const [name, value] of Object.entries(query)) {
    for (const each of [value ?? []].flat()) {
      search.append(name, each);
    }
  }
  const route =
    "/" + [path ?? []].flat().join("/") + (search.size > 0 ? "?" + search : "");
  const fetched = backtick as string | undefined;
  // Used once: after this, the latest copy is fetched.
  useEffect(() => {
    if (fetched !== undefined) {
      arrived.delete(fetched);
    }
  }, [fetched]);
  return (
    <ServerScreen
      key={route}
      app={app}
      path={route}
      initialScreen={fetched === undefined ? undefined : arrived.get(fetched)}
    />
  );
}
