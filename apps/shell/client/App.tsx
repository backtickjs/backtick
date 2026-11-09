import { PrefetchProvider } from "@backtickjs/expo-router";
import type { Runtime } from "@backtickjs/hono";
import {
  useGlobalSearchParams,
  useRootNavigationState,
  useRoute,
} from "expo-router";
import {
  createContext,
  type ReactNode,
  Suspense,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { View } from "react-native";
import { ErrorBoundary } from "react-error-boundary";
import { isSignedIn } from "../modules/backtick-session/src";
import { Failed } from "./Failed";
import { savePreview } from "./preview";
import { openApp } from "./open";

// The open app's runtime, for its routes.
export const RuntimeContext = createContext<Runtime>(null!);

// The href of a route of a navigator: its catch-all's path, and its other
// params as the query, without what the shell adds (`__backtick`, on an
// app's navigator). Every href the shell gives the runtime is made here.
export function hrefOfRoute(params: object | undefined): string {
  const { backtickPath, __backtick, ...query } = (params ?? {}) as Record<
    string,
    string | string[] | undefined
  >;
  const search = new URLSearchParams();
  for (const [name, value] of Object.entries(query)) {
    for (const each of [value ?? []].flat()) {
      search.append(name, each);
    }
  }
  const path =
    "/" + [backtickPath ?? []].flat().map(encodeURIComponent).join("/");
  const searchString = search.toString();
  return searchString === "" ? path : `${path}?${searchString}`;
}

// A link's href as its route's (hrefOfRoute), so what a Link fetches ahead is
// what its screen reads.
function hrefOfLink(href: string): string {
  const queryStart = href.indexOf("?");
  const path = queryStart === -1 ? href : href.slice(0, queryStart);
  const query: Record<string, string[]> = {};
  if (queryStart !== -1) {
    for (const [name, value] of new URLSearchParams(href.slice(queryStart))) {
      (query[name] ??= []).push(value);
    }
  }
  const backtickPath = path.split("/").filter(Boolean).map(decodeURIComponent);
  return hrefOfRoute({ ...query, backtickPath });
}

// Runs one app, or Backtick's home (app null): its root layout, which
// renders its navigator, inside the runtime's, given the href on top, and
// each route the runtime's screen for its href (RouteScreen.tsx), all from its
// server. `splash` shows until the first screen is in.
export function App({
  app,
  splash,
}: {
  app: string | null;
  splash: ReactNode;
}) {
  const [opened, setOpened] = useState(() => openApp(app));
  return (
    <Suspense fallback={splash}>
      <ErrorBoundary
        resetKeys={[opened]}
        fallbackRender={({ error }) => (
          <Failed error={error} retry={() => setOpened(openApp(app))} />
        )}
      >
        <AppRoot app={app} opened={opened} />
      </ErrorBoundary>
    </Suspense>
  );
}

interface State {
  index?: number;
  routes: readonly Route[];
}
interface Route {
  key?: string;
  params?: object;
  state?: State;
}

// The route on top of the navigator under the route `key`.
function topUnder(state: State | undefined, key: string): Route | undefined {
  for (const route of state?.routes ?? []) {
    const nested = route.state;
    if (route.key === key) {
      return nested?.routes[nested.index ?? nested.routes.length - 1];
    }
    const top = topUnder(nested, key);
    if (top !== undefined) {
      return top;
    }
  }
  return undefined;
}

function AppRoot({
  app,
  opened,
}: {
  app: string | null;
  opened: Promise<Runtime>;
}) {
  const runtime = use(opened);
  const { Navigator } = runtime;
  if (Navigator === undefined) {
    throw new Error("This app needs a newer version of Backtick.");
  }
  // The route on top of this app's navigator, from the navigation state, in
  // the same render as a navigation, so the home's stays as it was under an
  // app; before the navigator has a route, the link's.
  const top = topUnder(useRootNavigationState(), useRoute().key);
  const linked = useGlobalSearchParams();
  const href = hrefOfRoute(top?.params ?? linked);
  // An app's first screen is its preview on the home's card: captured at the
  // first touch, before it changes anything, or once the screen has had a
  // moment to draw (a game's first frame included). Once per open, and never
  // in the way: a capture that fails is only logged.
  const captured = useRef(false);
  const capture = useCallback(() => {
    if (app === null || captured.current || !isSignedIn()) {
      return;
    }
    captured.current = true;
    savePreview(app).catch((error) =>
      console.warn("Saving the preview failed:", error),
    );
  }, [app]);
  useEffect(() => {
    const timer = setTimeout(capture, 2000);
    return () => clearTimeout(timer);
  }, [capture]);
  const prefetchLink = useCallback(
    (linked: string, options: { kind: "auto" | "full"; urgent: boolean }) =>
      runtime.prefetch?.(hrefOfLink(linked), options) ?? (() => {}),
    [runtime],
  );
  return (
    <RuntimeContext value={runtime}>
      <PrefetchProvider value={prefetchLink}>
        <View style={{ flex: 1 }} onTouchStartCapture={capture}>
          <Navigator href={href} />
        </View>
      </PrefetchProvider>
    </RuntimeContext>
  );
}
