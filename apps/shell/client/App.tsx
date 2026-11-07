import type { Runtime } from "@backtickjs/hono";
import { useIsFocused, useUnstableGlobalHref } from "expo-router";
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

// An href as the shell compares it: path and query, normalised as a URL,
// without what the shell adds (`__backtick`, on an app's navigator) or a
// hash, which means nothing to a native screen.
function normalised(href: string): string {
  const url = new URL(href, "https://screen");
  url.searchParams.delete("__backtick");
  // Each segment encoded the same way, whoever wrote it.
  const path = url.pathname
    .split("/")
    .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
    .join("/");
  return path + url.search;
}

// The href of a route of a navigator: its catch-all's path, and its other
// params as the query.
export function hrefOfRoute(params: object | undefined): string {
  const { backtickPath, ...query } = (params ?? {}) as Record<
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
  return normalised(path + "?" + search);
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
  // The href on top is this navigator's only while it's on top: the home's
  // stays mounted under an app, at its own.
  const top = normalised(useUnstableGlobalHref());
  const focused = useIsFocused();
  const [href, setHref] = useState(top);
  if (focused && top !== href) {
    setHref(top);
  }
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
      <Navigator href={href} rootLayout={RootLayout} />
    </LoadedRuntime>
  );
}
