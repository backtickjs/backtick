// The phone's half of `backtick()`: how an app's screens are fetched, kept and
// shown, written as client code, which `backtick()` sends from
// `/.well-known/backtick/runtime`.
import { type Client, cs, exec } from "@backtickjs/core";
import {
  type ComponentType,
  type ReactNode,
  startTransition,
  Suspense,
  use,
  useEffect,
  useState,
} from "react" with { backtick: "client" };

/**
 * What the phone runs an app with. Routes are told apart by `id`, their
 * navigator's key: one href can be pushed twice, and a route's href can
 * change in place (`router.setParams`).
 */
export interface Runtime {
  /**
   * The app's root layout, `/_layout`'s answer, given the route on top (no
   * `id` before its navigator has a route). As in Next.js, a navigation to a
   * route with a `_loading` pushes at once and shows it until the screen is
   * in; one to a route without holds the current screen until the next is
   * in, as navigations are transitions (`router.setTransitionMode("always")`).
   * Suspends until the first screen is in.
   */
  Navigator: ComponentType<{
    id?: string;
    href: string;
    rootLayout: ComponentType;
  }>;
  /**
   * A route's screen: its answer, inside its `_layout` and `_loading`. A new
   * `reloads` shows the answer `reload` fetched.
   */
  Screen: ComponentType<{ id: string; href: string; reloads: number }>;
  /** Fetches a route's screen again: resolves once it's in, either way. */
  reload(id: string, href: string): Promise<void>;
  /**
   * Fetches the href's `_layout` and `_loading`, not its screen, for a route
   * mounted ahead of a navigation (`<Link prefetch>`), so they draw at once.
   */
  prefetch(href: string): void;
}

/** What the phone gives the runtime as it opens an app. */
export interface RuntimeOptions {
  /** Where the phone opened the app from. */
  origin: string;
  /** The modules it carries, as it sends them in `x-backtick-modules`. */
  modules: string;
}

/**
 * The runtime of an app whose `_layout` and `_loading` routes are `nested`
 * (their Hono paths, as `/item/:id/_loading`), called once per open.
 */
export function runtime(
  nested: string[],
): Client<(options: RuntimeOptions) => Runtime> {
  return cs`({ origin, modules }: RuntimeOptions): Runtime => {
    const routes = ${nested};
    // A promise marked as React marks one it has read, so use() reads it at
    // once when it has settled, rather than suspending for a tick.
    type Tracked<T> = Promise<T> & {
      status?: "pending" | "fulfilled" | "rejected";
      value?: T;
      reason?: unknown;
    };
    const track = <T,>(promise: Promise<T>): Tracked<T> => {
      const tracked = promise as Tracked<T>;
      tracked.status = "pending";
      promise.then(
        (value) => Object.assign(tracked, { status: "fulfilled", value }),
        (reason) => Object.assign(tracked, { status: "rejected", reason }),
      );
      return tracked;
    };
    const settledWith = <T,>(value: T): Tracked<T> =>
      Object.assign(Promise.resolve(value), { status: "fulfilled" as const, value });

    // A bundle from the app's server, run, with its status. Any bundle is a
    // screen, whatever its status: an app's not-found screen is one. A
    // refusal ({ name, message }) says why.
    const fetchBundle = async (path: string) => {
      const response = await fetch(origin + path, {
        headers: { "x-backtick-modules": modules },
      });
      const body = await response.text();
      if (!(response.headers.get("content-type") ?? "").startsWith("text/javascript")) {
        let reason = body;
        try {
          reason = JSON.parse(body).message ?? body;
        } catch {}
        throw new Error("The screen couldn't be opened (" + response.status + "): " + reason);
      }
      return { status: response.status, value: await $exec(body as never) };
    };

    // An href's answer, run, and the same never rejecting.
    interface Entry {
      screen: Tracked<ReactNode>;
      settled: Tracked<void>;
    }
    const fetchEntry = (href: string): Entry => {
      const screen = track(fetchBundle(href).then(({ value }) => value as ReactNode));
      return { screen, settled: track(screen.then(() => {}, () => {})) };
    };

    // Each route's answer, fetched by its navigation (or the first screen,
    // by its href, before its route has an id) until the route's screen
    // takes it; and the routes whose screen is mounted, which going back to
    // waits for nothing.
    const pending = new Map<string, Entry>();
    const mounted = new Set<string>();
    const firstOf = (href: string) => "first:" + href;
    const pendingOf = (id: string | undefined, href: string): Entry => {
      const key = id ?? firstOf(href);
      let entry = pending.get(key) ?? (id === undefined ? undefined : pending.get(firstOf(href)));
      if (entry === undefined) {
        entry = fetchEntry(href);
      }
      pending.set(key, entry);
      return entry;
    };

    // The app's _layout or _loading route answering a path, as Hono matches
    // it: a :param is one segment (:param? maybe none), a * the rest.
    const segmentsOf = (path: string) =>
      path.split("/").map((segment) => {
        try {
          return decodeURIComponent(segment);
        } catch {
          return segment;
        }
      });
    const routeFor = (path: string) =>
      routes.find((route) => {
        const want = route.split("/");
        const have = segmentsOf(path);
        let index = 0;
        for (const part of want) {
          if (part === "*") {
            return true;
          }
          if (part.startsWith(":") && part.endsWith("?") && index === have.length) {
            continue;
          }
          if (index >= have.length || (!part.startsWith(":") && part !== have[index])) {
            return false;
          }
          index++;
        }
        return index === have.length;
      });

    // A nested route's component, or null without one (a 404). Kept for the
    // whole open. One that failed throws where it's drawn, until a navigation,
    // a prefetch or a reload (again) fetches it anew.
    const nested = (
      cache: Map<string, Tracked<ComponentType<any> | null>>,
      key: string,
      path: string,
      again: boolean,
    ) => {
      let route = cache.get(key);
      if (route === undefined || (again && route.status === "rejected")) {
        route = track(
          fetchBundle(path).then(({ status, value }) => {
            if (status === 404) {
              return null;
            }
            if (status !== 200) {
              throw new Error("The screen's " + path + " answered " + status + ".");
            }
            return value as ComponentType<any>;
          }),
        );
        route.catch(() => {});
        cache.set(key, route);
      }
      return route;
    };
    const none = settledWith(null);
    // _layout, by path: the server renders it for its params. _loading, by
    // route: like Next.js's loading.js, it doesn't vary by params.
    const layouts = new Map<string, Tracked<ComponentType<any> | null>>();
    const loadings = new Map<string, Tracked<ComponentType<any> | null>>();
    const layoutOf = (path: string, again = false) => {
      // The root's /_layout is the app's root layout, not a nested one.
      const layoutPath = path === "/" ? undefined : path + "/_layout";
      return layoutPath !== undefined && routeFor(layoutPath) !== undefined
        ? nested(layouts, layoutPath, layoutPath, again)
        : none;
    };
    const loadingOf = (path: string, again = false) => {
      const loadingPath = (path === "/" ? "" : path) + "/_loading";
      const route = routeFor(loadingPath);
      return route === undefined ? none : nested(loadings, route, loadingPath, again);
    };
    const pathOf = (href: string) => href.split("?")[0];
    // A nested route's component, or null if it failed: for deciding, not
    // drawing, which throws the failure where the route is shown.
    const settledRoutes = new WeakMap<object, Tracked<ComponentType<any> | null>>();
    const orNull = (route: Tracked<ComponentType<any> | null>) => {
      let settled = settledRoutes.get(route);
      if (settled === undefined) {
        settled = track(route.catch(() => null));
        settledRoutes.set(route, settled);
      }
      return settled;
    };

    // The answer. A failure throws to the error boundary around the screen,
    // and is fetched again once React has shown it, so the boundary's retry
    // gets a new try.
    const Answer = (props: { href: string; entry: Entry }) => {
      const { entry } = props;
      if (entry.screen.status === "rejected") {
        setTimeout(() => {
          if (entry.screen.status === "rejected") {
            Object.assign(entry, fetchEntry(props.href));
          }
        });
      }
      return $use(entry.screen as Promise<ReactNode>);
    };

    // The answer as Next.js nests it: inside the path's _layout, and inside a
    // Suspense showing its _loading while it loads.
    const Framed = (props: { href: string; entry: Entry }) => {
      const path = pathOf(props.href);
      const Layout = $use(layoutOf(path) as Promise<ComponentType<{ children: ReactNode }> | null>);
      const Loading = $use(loadingOf(path) as Promise<ComponentType | null>);
      const answer = <Answer href={props.href} entry={props.entry} />;
      // Keyed by href: a screen whose href changes in place shows its
      // _loading again; a reload of the same href holds.
      const loaded =
        Loading === null ? answer : <$Suspense key={props.href} fallback={<Loading />}>{answer}</$Suspense>;
      return Layout === null ? loaded : <Layout>{loaded}</Layout>;
    };

    const Screen = (props: { id: string; href: string; reloads: number }) => {
      const [current, setCurrent] = $useState(() => ({
        href: props.href,
        reloads: props.reloads,
        entry: pendingOf(props.id, props.href),
      }));
      if (current.reloads !== props.reloads) {
        setCurrent({ href: props.href, reloads: props.reloads, entry: pendingOf(props.id, props.href) });
      }
      // An href changed in place (router.setParams): fetched in a transition,
      // so the screen stays until it's in, unless its _loading shows.
      $useEffect(() => {
        if (current.href !== props.href) {
          $startTransition(() => setCurrent({ href: props.href, reloads: props.reloads, entry: fetchEntry(props.href) }));
        }
      }, [props.href]);
      $useEffect(() => {
        mounted.add(props.id);
        pending.delete(props.id);
        pending.delete(firstOf(props.href));
        return () => {
          mounted.delete(props.id);
        };
      }, [props.id]);
      // Mounted at once, with the answer loading inside.
      return (
        <$Suspense fallback={null}>
          <Framed href={current.href} entry={current.entry} />
        </$Suspense>
      );
    };

    // Suspends a navigation's render, above the Stack, while it waits for a
    // route without a _loading: since navigations are transitions, the
    // current screen stays up. A route that's mounted (going back, or its
    // href changing in place) waits for nothing.
    const Hold = (props: { id?: string; href: string }) => {
      if (props.id !== undefined && !mounted.has(props.id)) {
        // The screen's fetch starts with its _loading's, not after it.
        const entry = pendingOf(props.id, props.href);
        layoutOf(pathOf(props.href), true);
        if ($use(orNull(loadingOf(pathOf(props.href), true)) as Promise<ComponentType | null>) === null) {
          $use(entry.settled as Promise<void>);
        }
      }
      return null;
    };

    let opening: Tracked<void> | undefined;
    const Navigator = (props: { id?: string; href: string; rootLayout: ComponentType }) => {
      // The first screen, with its nested routes: the phone's splash stays
      // until they're in. Made once, so every render waits on the same.
      if (opening === undefined) {
        const path = pathOf(props.href);
        opening = track(
          Promise.all([
            pendingOf(props.id, props.href).settled,
            layoutOf(path).catch(() => null),
            loadingOf(path).catch(() => null),
          ]).then(() => {}),
        );
      }
      $use(opening as Promise<void>);
      // A navigation left before its screen took its answer waits for
      // nothing: the next one to that route fetches it again.
      $useEffect(() => {
        for (const key of pending.keys()) {
          if (key !== props.id && !key.startsWith("first:")) {
            pending.delete(key);
          }
        }
      }, [props.id]);
      const RootLayout = props.rootLayout;
      return (
        <>
          <Hold id={props.id} href={props.href} />
          <RootLayout />
        </>
      );
    };

    return {
      Navigator,
      Screen,
      // The answer the route's screen takes as it renders with a new reloads.
      reload: (id, href) => {
        layoutOf(pathOf(href), true);
        loadingOf(pathOf(href), true);
        const entry = fetchEntry(href);
        pending.set(id, entry);
        return entry.settled;
      },
      prefetch: (href) => {
        layoutOf(pathOf(href), true);
        loadingOf(pathOf(href), true);
      },
    };
  }`;
}
