import type { Runtime } from "@backtickjs/hono";
import {
  type NavigationState,
  useGlobalSearchParams,
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
import { ErrorBoundary } from "react-error-boundary";
import { isSignedIn } from "../modules/backtick-session/src";
import { Failed } from "./Failed";
import { savePreview } from "./preview";
import { type OpenedApp, openApp } from "./open";

// The open app's runtime, for its routes.
export const LoadedRuntime = createContext<Runtime>(null!);

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

function AppRoot({
  app,
  opened,
}: {
  app: string | null;
  opened: Promise<OpenedApp>;
}) {
  const { RootLayout, runtime } = use(opened);
  const { Navigator } = runtime;
  // The route on top of this app's navigator, from its own state, so the
  // home's stays as it was under an app; before the navigator has a route,
  // the link's.
  const { state } = useRoute() as { state?: NavigationState };
  const top = state?.routes[state.index ?? state.routes.length - 1];
  const linked = useGlobalSearchParams();
  const href = hrefOfRoute(top?.params ?? linked);
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
    <LoadedRuntime value={runtime}>
      <Navigator id={top?.key} href={href} rootLayout={RootLayout} />
    </LoadedRuntime>
  );
}
