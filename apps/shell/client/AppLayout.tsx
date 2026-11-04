import { Stack, useIsFocused, useUnstableGlobalHref } from "expo-router";
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  Suspense,
  use,
  useEffect,
  useState,
} from "react";
import { fetchScreen } from "./screens";

// What a layout loaded, for the routes of its navigator.
interface Loaded {
  app: string | null;
  // Screens navigated to and not yet shown, by href.
  loads: Map<string, Promise<ReactNode>>;
  // While a route shows `href`: its screen is no longer waiting to be shown.
  showing(href: string): () => void;
}

export const LoadedScreens = createContext<Loaded>(null!);

// The href a route shows: the path and query on top, without what the shell
// adds (`__backtick`, on the app's navigator) or a hash, which means nothing
// to a native screen.
export function hrefOf(globalHref: string): string {
  const url = new URL(globalHref, "https://screen");
  url.searchParams.delete("__backtick");
  return url.pathname + url.search;
}

// Runs one app, or Backtick's home (app null), as a browser runs a site: each
// path navigated to is fetched from the app's server, and the screen on top
// stays until it arrives. expo-router dispatches each navigation in a
// transition, so this layout suspending holds what's shown; a route can't
// hold it, since each route has a Suspense boundary of its own. On a first
// open, nothing is shown yet: `splash` is.
export function AppLayout({
  app,
  splash,
  screenOptions,
}: {
  app: string | null;
  splash: ReactNode;
  screenOptions: ComponentProps<typeof Stack>["screenOptions"];
}) {
  const href = hrefOf(useUnstableGlobalHref());
  // The path on top is this navigator's only while it's on top: the home's
  // stays mounted under an app.
  const focused = useIsFocused();
  const [loaded] = useState(() => {
    const loads = new Map<string, Promise<ReactNode>>();
    const shown = new Map<string, number>();
    return {
      app,
      loads,
      shown,
      showing(href: string) {
        shown.set(href, (shown.get(href) ?? 0) + 1);
        loads.delete(href);
        return () => {
          const count = shown.get(href)! - 1;
          if (count === 0) {
            shown.delete(href);
          } else {
            shown.set(href, count);
          }
        };
      },
    };
  });
  // A path no route shows is a navigation to it: fetch it once.
  if (focused && !loaded.shown.has(href) && !loaded.loads.has(href)) {
    loaded.loads.set(href, fetchScreen(app, href));
  }
  // A navigation left before its screen arrived (back, or another) drops it,
  // so a later one fetches the latest copy.
  useEffect(() => {
    for (const each of loaded.loads.keys()) {
      if (each !== href) {
        loaded.loads.delete(each);
      }
    }
  });
  return (
    <LoadedScreens value={loaded}>
      <Suspense fallback={splash}>
        <Hold until={focused ? loaded.loads.get(href) : undefined}>
          <Stack screenOptions={screenOptions} />
        </Hold>
      </Suspense>
    </LoadedScreens>
  );
}

const settled = new WeakMap<Promise<unknown>, Promise<void>>();

// Waits for a screen, whether it loads or fails: a failure shows in its route.
function Hold({
  until,
  children,
}: {
  until: Promise<unknown> | undefined;
  children: ReactNode;
}) {
  if (until !== undefined) {
    if (!settled.has(until)) {
      settled.set(
        until,
        until.then(
          () => {},
          () => {},
        ),
      );
    }
    use(settled.get(until)!);
  }
  return children;
}
