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
import { Failed } from "./Failed";
import {
  fetchApp,
  fetchHome,
  fetchRootLayout,
  type RootLayout,
} from "./screens";

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

// Runs one app, or Backtick's home (app null): each path navigated to is
// fetched from the app's server, and the app's root layout gets the fetch as
// `navigating`. expo-router dispatches each navigation in a transition, so a
// root layout that suspends on it keeps the screen on top until the next
// arrives; a route can't, since each route has a Suspense boundary of its own.
// The layout can't see its navigator's routes, only the href on top. On a
// first open, `splash` shows until the root layout and the first screen have
// both arrived. The navigator is the app's own, its root layout's Stack: the
// shell has none.
export function App({
  app,
  splash,
}: {
  app: string | null;
  splash: ReactNode;
}) {
  const top = normalised(useUnstableGlobalHref());
  // The href on top is this navigator's only while it's on top: the home's
  // stays mounted under an app.
  const focused = useIsFocused();
  const [screens] = useState(() => new Screens(app));
  // The root layout, once per open, fetched with the first screen: the splash
  // stays for both.
  const [rootLayout, setRootLayout] = useState(() => fetchRootLayout(app));
  const load = focused ? screens.navigatingTo(top) : undefined;
  // The first screen's load: the splash stays until it has arrived too,
  // whatever the root layout does with `navigating`. Settled after that, so
  // it never holds again.
  const [opening] = useState(() => load?.settled);
  // After the routes' own effects, so a route mounted twice finds its screen
  // both times.
  useEffect(() => screens.settle(top));
  return (
    <LoadedScreens value={screens}>
      <Suspense fallback={splash}>
        <ErrorBoundary
          resetKeys={[rootLayout]}
          fallbackRender={({ error }) => (
            <Failed
              error={error}
              retry={() => setRootLayout(fetchRootLayout(app))}
            />
          )}
        >
          <AppRoot
            layout={rootLayout}
            opening={opening}
            navigating={load?.settled}
          />
        </ErrorBoundary>
      </Suspense>
    </LoadedScreens>
  );
}

// The app's root layout, once loaded: its Stack, with its options, and
// whatever it puts around it. It holds the current screen itself, by `use()`ing
// `navigating`.
function AppRoot({
  layout,
  opening,
  navigating,
}: {
  layout: Promise<RootLayout>;
  opening: Promise<void> | undefined;
  navigating: Promise<void> | undefined;
}) {
  const Layout = use(layout);
  if (opening !== undefined) {
    use(opening);
  }
  return <Layout navigating={navigating} />;
}
