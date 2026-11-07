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
 * change in place (`router.setParams`). A shell checks for a member before
 * using it, so a later runtime can drop one, and a later shell can pass more
 * options than an older runtime reads.
 */
export interface Runtime {
  /**
   * The app's root layout, `/_layout`'s answer, given the route on top (no
   * `id` before its navigator has a route). A navigation holds the current
   * screen until the next is in, as navigations are transitions
   * (`router.setTransitionMode("always")`): a route with a `_loading` answers
   * at once, with its loading state. Suspends until the first screen is in.
   */
  Navigator?: ComponentType<{
    id?: string;
    href: string;
    rootLayout: ComponentType;
  }>;
  /**
   * A route's screen. One not `active` yet (`<Link prefetch>` mounts a route
   * ahead of its navigation) shows nothing, and may fetch its answer for the
   * navigation to show at once.
   */
  Screen?: ComponentType<{ id: string; href: string; active: boolean }>;
  /**
   * Fetches a route's screen again, which stays until the new one is in:
   * resolves once it's in, either way.
   */
  reload?(id: string): Promise<void>;
}

/** What the phone gives the runtime as it opens an app. */
export interface RuntimeOptions {
  /** Where the phone opened the app from. */
  origin: string;
  /** The modules it carries, as it sends them in `x-backtick-modules`. */
  modules: string;
}

/**
 * A route's answer, run. Any bundle is a screen, whatever its status: an
 * app's not-found screen is one. A refusal ({ name, message }) says why. The
 * origin goes along, for the answer's `Route`s to fetch from. A `Route` asks
 * for the route alone, without its layouts and loading state.
 */
export const fetchAnswer = cs`async (origin: string, modules: string, href: string, route: boolean) => {
  // x-backtick-runtime: the runtime's version, for a server to tell an
  // outdated one to open the app again.
  const headers: Record<string, string> = {
    "x-backtick-modules": modules,
    "x-backtick-origin": origin,
    "x-backtick-runtime": "1",
  };
  if (route) {
    headers["x-backtick-route"] = "1";
  }
  const response = await fetch(origin + href, { headers });
  const body = await response.text();
  if (!(response.headers.get("content-type") ?? "").startsWith("text/javascript")) {
    let reason = body;
    try {
      reason = JSON.parse(body).message ?? body;
    } catch {}
    throw new Error("The screen couldn't be opened (" + response.status + "): " + reason);
  }
  return $exec(body as never) as ReactNode;
}`;

/** The runtime, called once per open. */
export const runtime: Client<(options: RuntimeOptions) => Runtime> =
  cs`({ origin, modules }: RuntimeOptions): Runtime => {
  // A promise marked as React marks one it has read, so use() reads it at
  // once when it has settled, rather than suspending for a tick.
  type Tracked<T> = Promise<T> & { status?: string; value?: T; reason?: unknown };
  const track = <T,>(promise: Promise<T>): Tracked<T> => {
    const tracked = promise as Tracked<T>;
    tracked.status = "pending";
    promise.then(
      (value) => Object.assign(tracked, { status: "fulfilled", value }),
      (reason) => Object.assign(tracked, { status: "rejected", reason }),
    );
    return tracked;
  };

  // An href's answer, the same never rejecting, and when it settled.
  interface Answer {
    href: string;
    screen: Tracked<ReactNode>;
    settled: Tracked<void>;
    settledAt?: number;
  }
  const fetchFor = (href: string): Answer => {
    const screen = track($fetchAnswer(origin, modules, href, false));
    const answer: Answer = { href, screen, settled: track(screen.then(() => {}, () => {})) };
    answer.settled.then(() => {
      answer.settledAt = Date.now();
    });
    return answer;
  };

  // The router's cache, as Next.js keys it, by href: answers fetched ahead of
  // a route (by its navigation, a prefetch, or the app's opening), each for
  // the first route to that href to claim, for 30 seconds once in, and kept
  // until its screen mounts, as a render may not commit; and each route's
  // own, by its key, until its screen unmounts.
  const ahead = new Map<string, Answer>();
  const claimed = new Map<string, Answer>();
  const aheadOf = (href: string) => {
    let answer = ahead.get(href);
    if (answer === undefined || (answer.settledAt !== undefined && Date.now() - answer.settledAt > 30000)) {
      answer = fetchFor(href);
      ahead.set(href, answer);
    }
    return answer;
  };
  const claim = (id: string, href: string) => {
    let answer = claimed.get(id);
    if (answer === undefined) {
      answer = aheadOf(href);
      claimed.set(id, answer);
    }
    return answer;
  };
  // The routes whose screen has mounted, including one whose screen failed
  // since. Keys aren't reused.
  const seen = new Set<string>();
  // Each mounted screen, for reload to show a new answer in.
  const screens = new Map<string, (answer: Answer) => void>();

  const Shown = (props: { answer: Answer }) => $use(props.answer.screen as Promise<ReactNode>);

  const Claimed = (props: { id: string; href: string }) => {
    const { id, href } = props;
    const [current, setCurrent] = $useState(() => claim(id, href));
    // A failure throws to the route's error boundary, so the screen never
    // mounts: once React has shown it, it leaves the cache, for a retry or a
    // later navigation to fetch anew, and the route waits for nothing more.
    if (current.screen.status === "rejected") {
      seen.add(id);
      setTimeout(() => {
        if (claimed.get(id) === current) claimed.delete(id);
        if (ahead.get(current.href) === current) ahead.delete(current.href);
      });
    }
    // A new answer, from reload or an href changed in place
    // (router.setParams), shows in a transition: the screen stays until
    // it's in.
    const show = (answer: Answer) => {
      claimed.set(id, answer);
      $startTransition(() => setCurrent(answer));
    };
    $useEffect(() => {
      if (current.href !== href) {
        show(fetchFor(href));
      }
    }, [href]);
    $useEffect(() => {
      seen.add(id);
      if (ahead.get(href) === current) {
        ahead.delete(href);
      }
      screens.set(id, show);
      return () => {
        screens.delete(id);
        claimed.delete(id);
      };
    }, [id]);
    return (
      <$Suspense fallback={null}>
        <Shown answer={current} />
      </$Suspense>
    );
  };

  const Screen = (props: { id: string; href: string; active: boolean }) => {
    $useEffect(() => {
      if (!props.active) {
        aheadOf(props.href);
      }
    }, [props.active, props.href]);
    return props.active ? <Claimed id={props.id} href={props.href} /> : null;
  };

  // Suspends a navigation's render, above the Stack, until its href's answer
  // is in: since navigations are transitions, the screen on top stays. Before
  // the navigator has a route, the phone's splash stays instead. A route whose
  // screen has mounted waits for nothing.
  const Hold = (props: { id?: string; href: string }) => {
    if (props.id === undefined || !seen.has(props.id)) {
      $use(aheadOf(props.href).settled as Promise<void>);
    }
    return null;
  };

  const Navigator = (props: { id?: string; href: string; rootLayout: ComponentType }) => {
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
    reload: (id) => {
      const answer = claimed.get(id);
      if (answer === undefined) {
        return Promise.resolve();
      }
      const reloaded = fetchFor(answer.href);
      screens.get(id)?.(reloaded);
      return reloaded.settled;
    },
  };
}`;
