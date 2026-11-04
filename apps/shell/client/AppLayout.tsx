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
import { Progress } from "./Progress";
import { fetchApp, fetchHome } from "./screens";

// A screen on its way.
interface Load {
  screen: Promise<ReactNode>;
  // Resolves either way, for the layout to wait on: a failure shows in the
  // route.
  settled: Promise<void>;
}

// The screens of one navigator's navigations, by href, so the layout can hold
// the screen on top until the one navigated to arrives. Every navigation
// fetches: nothing is shown that wasn't fetched for it.
export class Screens {
  private navigations = new Map<string, Load>();
  private shown = new Map<string, number>();

  constructor(readonly app: string | null) {}

  fetch(href: string, signal?: AbortSignal): Promise<ReactNode> {
    return this.app === null
      ? fetchHome(href, signal)
      : fetchApp(this.app, href, signal);
  }

  // What a navigation to `href` waits for: nothing if a route shows it
  // already (back), else a fetch.
  navigatingTo(href: string): Load | undefined {
    if (this.shown.has(href)) {
      return undefined;
    }
    let load = this.navigations.get(href);
    if (load === undefined) {
      const screen = this.fetch(href);
      load = {
        screen,
        settled: screen.then(
          () => {},
          () => {},
        ),
      };
      this.navigations.set(href, load);
    }
    return load;
  }

  // The screen of a route coming on top at `href`: the one its navigation
  // waited for, or, when none did (the same path pushed again), its own.
  screenFor(href: string): Promise<ReactNode> {
    return this.navigations.get(href)?.screen ?? this.fetch(href);
  }

  // While a route has been shown and is mounted: going back to it shows it
  // as it is.
  showing(href: string): () => void {
    this.shown.set(href, (this.shown.get(href) ?? 0) + 1);
    return () => {
      const count = this.shown.get(href)! - 1;
      if (count === 0) {
        this.shown.delete(href);
      } else {
        this.shown.set(href, count);
      }
    };
  }

  // Drops the navigations nothing waits for: one shown already, and one left
  // before its screen arrived (back, or another navigation).
  settle(top: string): void {
    for (const href of this.navigations.keys()) {
      if (href !== top || this.shown.has(href)) {
        this.navigations.delete(href);
      }
    }
  }
}

export const LoadedScreens = createContext<Screens>(null!);

// An href as the shell compares it: path and query, normalised as a URL,
// without what the shell adds (`__backtick`, on an app's navigator) or a
// hash, which means nothing to a native screen.
function normalised(href: string): string {
  const url = new URL(href, "https://screen");
  url.searchParams.delete("__backtick");
  return url.pathname + url.search;
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

// Runs one app, or Backtick's home (app null), as a browser runs a site: each
// path navigated to is fetched from the app's server, and the screen on top
// stays until it arrives. expo-router dispatches each navigation in a
// transition, so this layout suspending holds what's shown; a route can't
// hold it, since each route has a Suspense boundary of its own. The layout
// can't see its navigator's routes, only the href on top. On a first open,
// nothing is shown yet: `splash` is.
export function AppLayout({
  app,
  splash,
  screenOptions,
}: {
  app: string | null;
  splash: ReactNode;
  screenOptions: ComponentProps<typeof Stack>["screenOptions"];
}) {
  const top = normalised(useUnstableGlobalHref());
  // The href on top is this navigator's only while it's on top: the home's
  // stays mounted under an app.
  const focused = useIsFocused();
  const [screens] = useState(() => new Screens(app));
  const load = focused ? screens.navigatingTo(top) : undefined;
  // After the routes' own effects, so a route mounted twice finds its screen
  // both times.
  useEffect(() => screens.settle(top));
  return (
    <LoadedScreens value={screens}>
      <Suspense fallback={splash}>
        <Hold until={load?.settled}>
          <Stack screenOptions={screenOptions} />
        </Hold>
      </Suspense>
      {/* The navigator on top's, in its app's colour. */}
      {focused && <Progress app={app} />}
    </LoadedScreens>
  );
}

function Hold({
  until,
  children,
}: {
  until: Promise<void> | undefined;
  children: ReactNode;
}) {
  if (until !== undefined) {
    use(until);
  }
  return children;
}
