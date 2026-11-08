// The phone's half of `backtickApp()`: how an app's screens are fetched,
// kept and shown, written as client code, which `backtickApp()` sends from
// `/.well-known/backtick/runtime`.
import { type Client, cs, exec } from "@backtickjs/core";
import {
  QueryClient,
  QueryClientProvider,
  usePrefetchQuery,
  useSuspenseQueries,
  useSuspenseQuery,
} from "@tanstack/react-query" with { backtick: "client" };
import { PatternRouter } from "hono/router/pattern-router" with {
  backtick: "client",
};
import {
  Component,
  type ComponentType,
  type ReactNode,
  Suspense,
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
   * none); with `page`, its page too, as `<Link prefetch>`.
   */
  prefetch?(href: string, page?: boolean): void;
}

/**
 * A route's answer, run. Any bundle is an answer, whatever its status: an
 * app's not-found screen is one. A refusal ({ name, message }) says why. For
 * a route that may not exist (`notFoundIsNull`), a 404 is null.
 */
export const fetchAnswer = cs`async (
  url: string,
  modules: string,
  notFoundIsNull: boolean,
) => {
  const response = await fetch(url, {
    headers: { "x-backtick-modules": modules },
  });
  if (notFoundIsNull && response.status === 404) {
    return null;
  }
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
    // minutes; a page only for the navigation it was fetched for (0 s), or, fetched
    // ahead by <Link prefetch>, for 5 minutes. A screen's no-store keeps it
    // out of HTTP caches, not this one.
    const segmentStaleTime = 300000;
    // When the navigation to the href on top started: kept outside React, as
    // a hold that suspends keeps no state.
    let currentNavigation = { href: "", startedAt: 0 };
    const fetchedAhead = new Set<string>();
    const pageStaleTime = (query: {
      queryKey: readonly unknown[];
      state: { dataUpdatedAt: number };
    }) =>
      query.state.dataUpdatedAt >= currentNavigation.startedAt
        ? Infinity
        : fetchedAhead.has(query.queryKey[0] as string)
          ? segmentStaleTime
          : 0;
    const queryClient = new $QueryClient({
      defaultOptions: {
        queries: {
          queryFn: async (context: { queryKey: readonly unknown[] }) =>
            $fetchAnswer(
              $origin + (context.queryKey[0] as string),
              $modules,
              false,
            ),
          staleTime: pageStaleTime,
          structuralSharing: false,
          retry: false,
        },
      },
    });
    type Query = {
      queryKey: string[];
      staleTime?: number;
      queryFn?: () => Promise<unknown>;
    };
    const pageQuery = (href: string): Query => ({ queryKey: [href] });
    const layoutQuery = (path: string): Query => ({
      queryKey: [path],
      staleTime: segmentStaleTime,
    });
    // A loading state takes no params, as in Next.js: it's fetched at its
    // pattern (/city/:id/_loading), once for every href it applies to.
    const loadingQuery = (pattern: string) => ({
      queryKey: [pattern],
      staleTime: segmentStaleTime,
      queryFn: async () => ({
        value: (await $fetchAnswer(
          $origin + pattern,
          $modules,
          false,
        )) as ReactNode,
      }),
    });

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
    // A stale answer no screen shows, in before a navigation started, is
    // dropped as the navigation reads it, so the navigation waits for a fresh
    // one, as Next.js's does; one a screen still shows, going back to it, is
    // kept.
    const dropStaleAnswer = (query: Query, startedAt: number) => {
      const cached = queryClient
        .getQueryCache()
        .find({ queryKey: query.queryKey, exact: true });
      if (
        cached !== undefined &&
        cached.getObserversCount() === 0 &&
        cached.state.data !== undefined &&
        cached.state.dataUpdatedAt < startedAt &&
        cached.isStaleByTime(query.staleTime ?? pageStaleTime(cached))
      ) {
        queryClient.removeQueries({ queryKey: query.queryKey, exact: true });
      }
    };

    const Page = (props: { href: string }) =>
      $useSuspenseQuery(pageQuery(props.href)).data as ReactNode;
    const Loading = (props: { pattern: string }) =>
      $useSuspenseQuery(loadingQuery(props.pattern)).data.value;
    // A layout answers a client component, given what's under it; any other
    // answer (its not-found screen) is what the screen shows.
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

    // Fetches an href ahead, as Next.js's Link: what its screen needs to
    // show, if that ends at a loading state, and its page too when asked
    // (<Link prefetch>).
    const prefetch = (href: string, page = false) => {
      const shell = shellOf(href);
      if (page) {
        fetchedAhead.add(href);
      }
      const queries = page
        ? [...shell.queries, pageQuery(href)]
        : shell.loads
          ? shell.queries
          : [];
      for (const query of queries) {
        void queryClient.query(query).catch(() => {});
      }
    };
    // Every loading state, as the app opens: one per pattern, for any href.
    for (const pattern of $routes.loadings) {
      void queryClient.query(loadingQuery(pattern)).catch(() => {});
    }

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

    // Suspends until each query is in. One that is, however old, holds
    // nothing: stale ones were dropped above.
    const AwaitQueries = (props: { queries: Query[] }) => {
      $useSuspenseQueries({
        queries: props.queries.map((query) => ({
          ...query,
          refetchOnMount: false,
        })),
      });
      return null;
    };
    // Suspends a navigation's render, above the Stack, until the href's
    // screen can show (shellOf). As navigations are transitions, the screen on
    // top stays meanwhile. The page is fetched alongside. One that fails ends
    // the hold, for the screen to show why.
    const NavigationHold = (props: { href: string }) => {
      if (currentNavigation.href !== props.href) {
        currentNavigation = { href: props.href, startedAt: Date.now() };
      }
      const shell = shellOf(props.href);
      for (const query of [...shell.queries, pageQuery(props.href)]) {
        dropStaleAnswer(query, currentNavigation.startedAt);
      }
      // Going back, the screen shows its page as it was: only a page no
      // screen shows is fetched.
      const shown =
        (queryClient
          .getQueryCache()
          .find({ queryKey: [props.href], exact: true })
          ?.getObserversCount() ?? 0) > 0;
      if (!shown) {
        void queryClient.query(pageQuery(props.href)).catch(() => {});
      }
      return <AwaitQueries queries={shell.queries} />;
    };
    class SilentErrorBoundary extends $Component<
      { children: ReactNode },
      { failed: boolean }
    > {
      state = { failed: false };
      static getDerivedStateFromError() {
        return { failed: true };
      }
      render() {
        return this.state.failed ? null : this.props.children;
      }
    }

    // The root layout, /_layout, which draws the navigator: fetched once per
    // open, as a new one would remount the navigator, and its screens with it.
    const RootLayout = () => {
      const answer = $useSuspenseQuery({
        queryKey: ["/_layout"],
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
        <SilentErrorBoundary key={props.href}>
          <NavigationHold href={props.href} />
        </SilentErrorBoundary>
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
