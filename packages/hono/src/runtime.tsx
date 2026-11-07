// The phone's half of `backtick()`: how an app's screens are fetched, kept and
// shown, written as client code, which `backtick()` sends from
// `/.well-known/backtick/runtime`.
import { type Client, cs, exec } from "@backtickjs/core";
import {
  type ComponentType,
  type ReactNode,
  Suspense,
  use,
  useEffect,
  useState,
} from "react" with { backtick: "client" };

/** What the phone runs an app with. */
export interface Runtime {
  /**
   * The app's root layout, `/_layout`'s answer, given the href on top. As in
   * Next.js, a navigation to a route with a `_loading` pushes at once and
   * shows it until the screen is in; one to a route without holds the current
   * screen until the next is in. Every navigation must be a transition
   * (`router.setTransitionMode("always")`). Suspends until the first screen
   * is in.
   */
  Navigator: ComponentType<{ href: string; rootLayout: ComponentType }>;
  /**
   * A route's screen: its answer, inside the route's `_layout` and
   * `_loading`. A new `reloads` fetches it again.
   */
  Screen: ComponentType<{ href: string; reloads: number }>;
  /** Fetches the href's screen again: resolves once it's in, either way. */
  reload(href: string): Promise<void>;
  /**
   * Fetches the href's `_layout` and `_loading`, not its screen, for a route
   * mounted ahead of a navigation (`<Link prefetch>`), so they draw at once.
   */
  prefetch(href: string): void;
}

/**
 * The runtime of an app whose `_layout` and `_loading` routes are `nested`
 * (their Hono paths, as `/item/:id/_loading`), as a function of the server
 * the phone opened the app from and the modules it sent, called once per open.
 */
export function runtime(
  nested: string[],
): Client<(origin: string, modules: string) => Runtime> {
  return cs`(origin: string, modules: string): Runtime => {
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
    // screen, whatever its status: an app's not-found screen is one.
    const fetchBundle = async (path: string) => {
      const response = await fetch(origin + path, {
        headers: { "x-backtick-modules": modules },
      });
      const body = await response.text();
      if (!(response.headers.get("content-type") ?? "").startsWith("text/javascript")) {
        throw new Error("The screen couldn't be opened (" + response.status + "): " + body);
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

    // Each push fetches its own answer: a navigation's, by href, until its
    // route's screen takes it. How many screens show each href, so going
    // back to one waits for nothing.
    const pending = new Map<string, Entry>();
    const shown = new Map<string, number>();
    const pendingOf = (href: string): Entry => {
      let entry = pending.get(href);
      if (entry === undefined) {
        entry = fetchEntry(href);
        pending.set(href, entry);
      }
      return entry;
    };

    // Each path's nested routes, as Next.js's: its _layout, which wraps the
    // screen, and its _loading, shown while it loads; null for one it
    // doesn't have. Code, not data, so kept for the whole open; a fetch that
    // fails is tried again on the next navigation.
    interface Segment {
      Layout: ComponentType<{ children: ReactNode }> | null;
      Loading: ComponentType | null;
    }
    const none: Segment = { Layout: null, Loading: null };
    const segments = new Map<string, Tracked<Segment>>();
    // Whether one of the app's _layout or _loading routes answers the path,
    // as Hono matches it: a :param is any one segment, a * the rest.
    const routed = (path: string) =>
      routes.some((route) => {
        const want = route.split("/");
        const have = path.split("/");
        for (let index = 0; index < want.length; index++) {
          if (want[index] === "*") {
            return true;
          }
          if (index >= have.length || (!want[index].startsWith(":") && want[index] !== decodeURIComponent(have[index]))) {
            return false;
          }
        }
        return want.length === have.length;
      });
    const nested = (path: string) =>
      routed(path)
        ? fetchBundle(path).then(({ status, value }) =>
            status === 200 ? (value as ComponentType<any>) : null,
          )
        : Promise.resolve(null);
    const segmentOf = (href: string): Tracked<Segment> => {
      const path = href.split("?")[0];
      let segment = segments.get(path);
      if (segment === undefined) {
        // The root's /_layout is the app's root layout, not a nested one.
        segment =
          path === "/"
            ? settledWith(none)
            : track(
                Promise.all([nested(path + "/_layout"), nested(path + "/_loading")]).then(
                  ([Layout, Loading]) => ({ Layout, Loading }),
                  () => {
                    segments.delete(path);
                    return none;
                  },
                ),
              );
        segments.set(path, segment);
      }
      return segment;
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
      const { Layout, Loading } = $use(segmentOf(props.href) as Promise<Segment>);
      const answer = <Answer href={props.href} entry={props.entry} />;
      // Keyed by href: a screen whose href changes in place (its query, as a
      // tab does) shows its _loading again; a reload of the same href holds.
      const loaded =
        Loading === null ? answer : <$Suspense key={props.href} fallback={<Loading />}>{answer}</$Suspense>;
      return Layout === null ? loaded : <Layout>{loaded}</Layout>;
    };

    const Screen = (props: { href: string; reloads: number }) => {
      // An href already showing is being pushed again: it gets its own.
      const [current, setCurrent] = $useState(() => ({
        href: props.href,
        reloads: props.reloads,
        entry: shown.has(props.href) ? fetchEntry(props.href) : pendingOf(props.href),
      }));
      // Reloaded, or its href changed in place (router.setParams).
      if (current.href !== props.href || current.reloads !== props.reloads) {
        setCurrent({ href: props.href, reloads: props.reloads, entry: pendingOf(props.href) });
      }
      // Taken once shown, so the next navigation to the href fetches anew.
      $useEffect(() => {
        if (pending.get(props.href) === current.entry) {
          pending.delete(props.href);
        }
      }, [props.href, current.entry]);
      $useEffect(() => {
        shown.set(props.href, (shown.get(props.href) ?? 0) + 1);
        return () => {
          const count = shown.get(props.href)! - 1;
          if (count === 0) {
            shown.delete(props.href);
          } else {
            shown.set(props.href, count);
          }
        };
      }, [props.href]);
      // Mounted at once, with the answer loading inside.
      return (
        <$Suspense fallback={null}>
          <Framed href={props.href} entry={current.entry} />
        </$Suspense>
      );
    };

    // Suspends a navigation's render, above the Stack, while it waits for a
    // screen without a _loading: since every navigation is a transition, the
    // current screen stays up. A render outside the navigation has the href
    // that's showing, so only the navigation waits.
    const Hold = (props: { href: string }) => {
      if (!shown.has(props.href) && $use(segmentOf(props.href) as Promise<Segment>).Loading === null) {
        $use(pendingOf(props.href).settled as Promise<void>);
      }
      return null;
    };

    const Navigator = (props: { href: string; rootLayout: ComponentType }) => {
      // The first screen: the phone's splash stays until it's in.
      const [opening] = $useState(() => pendingOf(props.href).settled);
      $use(opening as Promise<void>);
      // A navigation left before its screen took its answer waits for
      // nothing: the next one to that href fetches it again.
      $useEffect(() => {
        for (const href of pending.keys()) {
          if (href !== props.href) {
            pending.delete(href);
          }
        }
      }, [props.href]);
      const RootLayout = props.rootLayout;
      return (
        <>
          <Hold href={props.href} />
          <RootLayout />
        </>
      );
    };

    return {
      Navigator,
      Screen,
      // The answer the screen takes as it renders again with a new reloads.
      reload: (href) => {
        const entry = fetchEntry(href);
        pending.set(href, entry);
        return entry.settled;
      },
      prefetch: (href) => {
        segmentOf(href);
      },
    };
  }`;
}
