// The phone's half of `backtickApp()`: how an app's screens are fetched,
// kept and shown, written as client code, which `backtickApp()` sends from
// `/.well-known/backtick/runtime`.
import { type Client, cs, exec } from "@backtickjs/core";
import {
  QueryClient,
  QueryClientProvider,
  queryOptions,
  usePrefetchQuery,
  useSuspenseQuery,
} from "@tanstack/react-query" with { backtick: "client" };
import { PatternRouter } from "hono/router/pattern-router" with {
  backtick: "client",
};
import {
  type ComponentType,
  type ReactNode,
  Suspense,
  use,
  useDeferredValue,
} from "react" with { backtick: "client" };

/**
 * What the phone runs an app with. A shell checks for a member before using
 * it, so a later runtime can drop one.
 */
export interface Runtime {
  /**
   * The app's root layout, given the href on top. A navigation holds the
   * current screen until the next can show, as navigations are transitions
   * (`router.setTransitionMode("always")`): once its layouts down to its
   * first loading state, and that loading state, are in, at once if they
   * were prefetched; with no loading state, once all of it is in. Suspends
   * until the first screen can show.
   */
  Navigator?: ComponentType<{ href: string }>;
  /**
   * A route's screen, nested as Next.js nests a page: each segment's layout,
   * around its loading state while what's under it loads. One not `active`
   * yet shows nothing.
   */
  Screen?: ComponentType<{ href: string; active: boolean }>;
  /**
   * Fetches an href's screen again, which stays until the new one is in:
   * resolves once it's in, either way.
   */
  reload?(href: string): Promise<void>;
  /**
   * Fetches an href ahead, as Next.js's `Link` prefetches: its layouts down
   * to its first loading state, and that loading state (nothing if it has
   * none), as Next.js's `kind: "auto"`; with `kind: "full"`, its page too,
   * as `<Link prefetch>`. At most 4 run at a time, `urgent` ones (a pressed
   * link) first. Returns a cancel, for a link that goes away before its
   * turn.
   */
  prefetch?(
    href: string,
    options?: { kind?: "auto" | "full"; urgent?: boolean },
  ): () => void;
}

/**
 * A route's answer, run. Any bundle is an answer, whatever its status: an
 * app's not-found screen is one. A refusal ({ name, message }) says why.
 */
export const fetchAnswer = cs`async (url: string, modules: string) => {
  const response = await fetch(url, {
    headers: { "x-backtick-modules": modules },
  });
  const body = await response.text();
  if (
    !(response.headers.get("content-type") ?? "").startsWith("text/javascript")
  ) {
    let reason = body;
    try {
      reason = JSON.parse(body).message ?? body;
    } catch {}
    throw new Error(
      "The screen couldn't be opened (" + response.status + "): " + reason,
    );
  }
  return (await $exec(body as never)) as unknown;
}`;

/**
 * The runtime of an open: for the phone at `origin` with `modules`, with the
 * patterns of the app's `_layout` and `_loading` routes (`/city/:id/_layout`),
 * so a screen asks only for those it has.
 */
export function clientRuntime(
  origin: string,
  modules: string,
  routes: { layouts: readonly string[]; loadings: readonly string[] },
): Client<Runtime> {
  return cs`{
    // Every answer is a query, keyed by where it was fetched, and reused in
    // memory as Next.js's router cache does: a layout or a loading state for 5
    // minutes; a page only for the navigation it was fetched for (0 s), or,
    // fetched ahead by <Link prefetch>, for 5 minutes. What a screen shows
    // never goes stale, so going back shows it as it was. A screen's no-store
    // keeps it out of HTTP caches, not this one.
    const segmentStaleTime = 300000;
    // When the navigation under way started, and the answers <Link prefetch>
    // fetched ahead (each href's, by when it came in).
    let navigationStartedAt = 0;
    const fetchedAhead = new Map<string, number>();
    type Cached = {
      queryKey: readonly unknown[];
      state: { dataUpdatedAt: number };
      getObserversCount(): number;
    };
    const shown = (query: Cached) => query.getObserversCount() > 0;
    const segmentStale = (query: Cached) =>
      shown(query) ? Infinity : segmentStaleTime;
    const pageStale = (query: Cached) => {
      const updatedAt = query.state.dataUpdatedAt;
      if (shown(query) || updatedAt >= navigationStartedAt) {
        return Infinity;
      }
      return fetchedAhead.get(query.queryKey[0] as string) === updatedAt
        ? segmentStaleTime
        : 0;
    };
    const fetchPath = (path: string) => () =>
      $fetchAnswer($origin + path, $modules);
    const queryClient = new $QueryClient({
      defaultOptions: {
        queries: { structuralSharing: false, retry: false },
      },
    });
    const pageQuery = (href: string) =>
      $queryOptions({
        queryKey: [href],
        queryFn: fetchPath(href),
        staleTime: pageStale,
      });
    // A layout answers a client component, given what's under it; or, for a
    // path with none (its not-found screen), what the screen shows.
    const layoutQuery = (path: string) =>
      $queryOptions({
        queryKey: [path],
        queryFn: fetchPath(path),
        staleTime: segmentStale,
      });
    // A loading state takes no params, as in Next.js: it's fetched at its
    // pattern (/city/:id/_loading), once for every href it applies to.
    const loadingQuery = (pattern: string) =>
      $queryOptions({
        queryKey: [pattern],
        queryFn: fetchPath(pattern),
        staleTime: segmentStale,
      });
    type Query =
      | ReturnType<typeof pageQuery>
      | ReturnType<typeof layoutQuery>
      | ReturnType<typeof loadingQuery>;

    // The app's layouts and loading states, matched by Hono's own router.
    const layoutRouter = new $PatternRouter<string>();
    for (const pattern of $routes.layouts) {
      layoutRouter.add("GET", pattern, pattern);
    }
    const loadingRouter = new $PatternRouter<string>();
    for (const pattern of $routes.loadings) {
      loadingRouter.add("GET", pattern, pattern);
    }
    // An href's segments, as Next.js's folders: each path prefix, with its
    // layout's path and its loading state's pattern, where the app has them.
    // The root's layout is the app's RootLayout.
    const segmentsOf = (href: string) => {
      const searchStart = href.indexOf("?");
      const path = searchStart === -1 ? href : href.slice(0, searchStart);
      const names = path.split("/").filter(Boolean);
      const bases = [
        "",
        ...names.map((_, i) => "/" + names.slice(0, i + 1).join("/")),
      ];
      return bases.map((base) => {
        const layout = base + "/_layout";
        return {
          layout:
            base !== "" && layoutRouter.match("GET", layout)[0].length > 0
              ? layout
              : undefined,
          loading: loadingRouter.match("GET", base + "/_loading")[0][0]?.[0],
        };
      });
    };
    // What an href's screen needs before it can show, as Next.js prefetches
    // and holds: its layouts down to the first loading state, and that
    // loading state; or, with none, all its layouts and its page.
    const shellOf = (href: string) => {
      const queries: Query[] = [];
      for (const segment of segmentsOf(href)) {
        if (segment.layout !== undefined) {
          queries.push(layoutQuery(segment.layout));
        }
        if (segment.loading !== undefined) {
          queries.push(loadingQuery(segment.loading));
          return { queries, loads: true };
        }
      }
      queries.push(pageQuery(href));
      return { queries, loads: false };
    };
    // A page or a loading state answers what it draws.
    const Page = (props: { href: string }) =>
      $useSuspenseQuery(pageQuery(props.href)).data as ReactNode;
    const Loading = (props: { pattern: string }) =>
      $useSuspenseQuery(loadingQuery(props.pattern)).data as ReactNode;
    const Layout = (props: { path: string; children: ReactNode }) => {
      const answer = $useSuspenseQuery(layoutQuery(props.path)).data;
      if (typeof answer !== "function") {
        return answer as ReactNode;
      }
      const Answer = answer as ComponentType<{ children: ReactNode }>;
      return <Answer>{props.children}</Answer>;
    };
    // A screen as Next.js nests a page: each segment's layout, around a
    // Suspense showing its loading state, around what's under it. The page
    // is fetched meanwhile.
    const Segments = (props: { href: string }) => {
      $usePrefetchQuery(pageQuery(props.href));
      let node: ReactNode = <Page href={props.href} />;
      for (const segment of segmentsOf(props.href).reverse()) {
        if (segment.loading !== undefined) {
          node = (
            <$Suspense fallback={<Loading pattern={segment.loading} />}>
              {node}
            </$Suspense>
          );
        }
        if (segment.layout !== undefined) {
          node = <Layout path={segment.layout}>{node}</Layout>;
        }
      }
      return node;
    };

    // Prefetches run at most 4 at a time, as Next.js's: one whose link goes
    // away before its turn is dropped, and an urgent one (a pressed link)
    // starts at once, past the limit. query() fetches only what isn't in, or
    // on its way, when a turn comes.
    const maxPrefetches = 4;
    let prefetching = 0;
    const waiting: (() => void)[] = [];
    const startWaiting = () => {
      while (prefetching < maxPrefetches && waiting.length > 0) {
        waiting.shift()!();
      }
    };
    const schedule = (task: () => Promise<unknown>, urgent: boolean) => {
      const start = () => {
        prefetching += 1;
        void task()
          .catch(() => {})
          .finally(() => {
            prefetching -= 1;
            startWaiting();
          });
      };
      if (urgent) {
        start();
        return () => {};
      }
      waiting.push(start);
      startWaiting();
      return () => {
        const index = waiting.indexOf(start);
        if (index !== -1) {
          waiting.splice(index, 1);
        }
      };
    };

    // Fetches an href ahead, as Next.js's Link: what its screen needs to
    // show, if that ends at a loading state ("auto"), and its page too
    // ("full", <Link prefetch>), whose answer is then kept 5 minutes.
    const prefetch = (
      href: string,
      options: { kind?: "auto" | "full"; urgent?: boolean } = {},
    ) => {
      const full = options.kind === "full";
      const shell = shellOf(href);
      if (!full && !shell.loads) {
        return () => {};
      }
      return schedule(async () => {
        await Promise.all(
          shell.queries.map((query) => queryClient.query(query)),
        );
        if (full) {
          await queryClient.query(pageQuery(href));
          fetchedAhead.set(
            href,
            queryClient.getQueryState([href])?.dataUpdatedAt ?? 0,
          );
        }
      }, options.urgent ?? false);
    };

    // An href changed in place (router.setParams) shows once it's in: the
    // screen stays meanwhile.
    const Screen = (props: { href: string; active: boolean }) => {
      const href = $useDeferredValue(props.href);
      return props.active ? (
        <$Suspense fallback={null}>
          <Segments href={href} />
        </$Suspense>
      ) : null;
    };

    // A query whose answer is in and fresh: nothing to wait for.
    const isIn = (query: Query) => {
      const cached = queryClient
        .getQueryCache()
        .find({ queryKey: query.queryKey, exact: true });
      return (
        cached !== undefined &&
        cached.state.data !== undefined &&
        !cached.isStaleByTime(
          (query.staleTime as (cached: Cached) => number)(cached),
        )
      );
    };
    // The navigation on top, and what it waits for, if anything: kept
    // outside React, as a render that suspends keeps no state.
    let hold: { href: string; ready?: Promise<unknown> } | undefined;
    // Suspends a navigation's render, above the Stack, until the href's
    // screen can show (shellOf), fetching whatever of it isn't in, stale or
    // failed; the page alongside. As navigations are transitions, the screen
    // on top stays meanwhile. One that fails ends the hold too, for the
    // screen to show why.
    const NavigationHold = (props: { href: string }) => {
      if (hold?.href !== props.href) {
        navigationStartedAt = Date.now();
        // A page from before, which no screen shows, would show as it was:
        // dropped, so the screen shows its loading state, then the page.
        const page = queryClient
          .getQueryCache()
          .find({ queryKey: [props.href], exact: true });
        if (
          page !== undefined &&
          page.state.data !== undefined &&
          page.isStaleByTime(pageStale(page))
        ) {
          queryClient.removeQueries({ queryKey: [props.href], exact: true });
        }
        // Only a navigation with something to fetch suspends. One whose
        // screen is in, as going back, renders at once: it's no transition,
        // so a suspension would reach the app's own Suspense.
        const queries = shellOf(props.href).queries;
        hold = {
          href: props.href,
          ready: queries.every(isIn)
            ? undefined
            : Promise.allSettled(
                queries.map((query) => queryClient.query(query)),
              ),
        };
        void queryClient.query(pageQuery(props.href)).catch(() => {});
      }
      if (hold.ready !== undefined) {
        $use(hold.ready);
      }
      return null;
    };

    // The root layout, /_layout, which draws the navigator: fetched once per
    // open, as a new one would remount the navigator, and its screens with it.
    const RootLayout = () => {
      const answer = $useSuspenseQuery({
        queryKey: ["/_layout"],
        queryFn: fetchPath("/_layout"),
        staleTime: Infinity,
      }).data;
      if (typeof answer !== "function") {
        throw new Error(
          "The app's /_layout answers no component: it's the root layout, a client component drawing the navigator (a Stack).",
        );
      }
      const Answer = answer as ComponentType;
      return <Answer />;
    };

    const Navigator = (props: { href: string }) => (
      <$QueryClientProvider client={queryClient}>
        <NavigationHold href={props.href} />
        <RootLayout />
      </$QueryClientProvider>
    );

    const runtime: Runtime = {
      Navigator,
      Screen,
      prefetch,
      // Its page and layouts again: one that failed, for its screen to wait
      // for it; the others kept until the new answer is in.
      reload: async (href) => {
        const paths = [
          href,
          ...segmentsOf(href).flatMap((segment) =>
            segment.layout === undefined ? [] : [segment.layout],
          ),
        ];
        await Promise.allSettled(
          paths.map((path) =>
            queryClient.getQueryState([path])?.status === "error"
              ? queryClient.resetQueries({ queryKey: [path], exact: true })
              : queryClient.refetchQueries({ queryKey: [path], exact: true }),
          ),
        );
      },
    };
    return runtime;
  }`;
}
