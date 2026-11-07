import type { Runtime } from "@backtickjs/hono";
import {
  useGlobalSearchParams,
  useIsFocused,
  useRootNavigationState,
  useRoute,
} from "expo-router";
import {
  createContext,
  type ReactNode,
  Suspense,
  use,
  useEffect,
  useState,
} from "react";
import { internalNavigationEvents } from "expo-router/build/global-state/internalNavigationEvents";
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
  // Each `<Link prefetch>` of the app on top, fetched ahead by its runtime:
  // expo-router keeps one preloaded route per navigator, but reports each.
  const focused = useIsFocused();
  useEffect(() => {
    if (!focused) {
      return;
    }
    return internalNavigationEvents.addListener("actionDispatched", (event) => {
      const { path } = (event.payload ?? {}) as { path?: unknown };
      if (event.actionType === "PRELOAD" && typeof path === "string") {
        runtime.prefetch?.(path);
      }
    });
  }, [focused, runtime]);
  // An app's first screen, once it's had a moment to draw (a game's first
  // frame included), is its preview on the home's card. Never in the way:
  // a capture that fails is only logged.
  useEffect(() => {
    if (app === null || !isSignedIn()) {
      return;
    }
    const timer = setTimeout(
      () =>
        savePreview(app).catch((error) =>
          console.warn("Saving the preview failed:", error),
        ),
      2000,
    );
    return () => clearTimeout(timer);
  }, [app]);
  return (
    <RuntimeContext value={runtime}>
      <Navigator href={href} />
    </RuntimeContext>
  );
}
