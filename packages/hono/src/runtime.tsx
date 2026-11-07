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
   * (`router.setTransitionMode("always")`): a route with a `_loading` once
   * that's in, at once if it was prefetched; one without, once its page is
   * in. Suspends until the first screen can show.
   */
  Navigator?: ComponentType<{ href: string }>;
  /**
   * A route's screen: what it renders, and meanwhile what its `_loading`
   * renders. One not `active` yet shows nothing.
   */
  Screen?: ComponentType<{ href: string; active: boolean }>;
  /**
   * Fetches an href's screen again, which stays until the new one is in:
   * resolves once it's in, either way.
   */
  reload?(href: string): Promise<void>;
  /**
   * Fetches an href ahead, as Next.js prefetches a link: its loading state,
   * or, without one, its page. For each `<Link prefetch>`, which the shell
   * sees as it's prefetched.
   */
  prefetch?(href: string): void;
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
 * The runtime of an open: for the phone at `origin` with `modules`, around
 * the app's root layout, with the patterns of its `_loading` routes
 * (`/city/:id/_loading`), so a screen asks only for those it has.
 */
export function clientRuntime(
  origin: string,
  modules: string,
  RootLayout: Client<ComponentType>,
  loadingPatterns: readonly string[],
): Client<Runtime> {
  return cs`{
    // Every answer is a query, keyed by its path: what the route renders. A
    // screen is its page's, and its loading state's while the page loads.
    // Each is reused, in memory, as Next.js's router cache does: a page for
    // 30 seconds, a loading state for 5 minutes. A screen's no-store keeps it
    // out of HTTP caches, not this one.
    const pageStaleTime = 30000;
    const loadingStaleTime = 300000;
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
    // A loading state: none if it answers 404, for a param it has none for.
    const loadingQueryOptions = (path: string) => ({
      queryKey: [path],
      staleTime: loadingStaleTime,
      queryFn: async () => ({
        value: (await $fetchAnswer(
          $origin + path,
          $modules,
          true,
        )) as ReactNode,
      }),
    });
    // An href's loading state, if the app has a _loading route for it,
    // matched by Hono's own router.
    const loadingRouter = new $PatternRouter<true>();
    for (const pattern of $loadingPatterns) {
      loadingRouter.add("GET", pattern, true);
    }
    const loadingPathOf = (href: string) => {
      const searchStart = href.indexOf("?");
      const path = searchStart === -1 ? href : href.slice(0, searchStart);
      const loading = (path === "/" ? "" : path) + "/_loading";
      return loadingRouter.match("GET", loading)[0].length > 0
        ? loading
        : undefined;
    };
    // A stale answer no screen shows, in before a navigation started, is
    // dropped as the navigation reads it, so the navigation waits for a fresh
    // one, as Next.js's does; one a screen still shows, going back to it, is
    // kept.
    const dropStaleAnswer = (path: string, startedAt: number) => {
      const query = queryClient
        .getQueryCache()
        .find({ queryKey: [path], exact: true });
      if (
        query !== undefined &&
        query.getObserversCount() === 0 &&
        query.state.data !== undefined &&
        query.state.dataUpdatedAt < startedAt &&
        query.isStaleByTime(pageStaleTime)
      ) {
        queryClient.removeQueries({ queryKey: [path], exact: true });
      }
    };

    const Page = (props: { href: string }) =>
      $useSuspenseQuery({ queryKey: [props.href] }).data as ReactNode;

    // A screen as Next.js shows a page: with a loading state, inside a
    // Suspense showing it; the page fetched meanwhile.
    const PageWithLoading = (props: { href: string }) => {
      const loading = loadingPathOf(props.href);
      $usePrefetchQuery({ queryKey: [props.href] });
      const queries: ReturnType<typeof loadingQueryOptions>[] =
        loading === undefined ? [] : [loadingQueryOptions(loading)];
      const loadingResult = $useSuspenseQueries({ queries })[0];
      return loadingResult === undefined ? (
        <Page href={props.href} />
      ) : (
        <$Suspense fallback={loadingResult.data.value}>
          <Page href={props.href} />
        </$Suspense>
      );
    };

    // Fetches an href ahead, as Next.js prefetches: its loading state, or,
    // without one, its page.
    const prefetch = (href: string) => {
      const loading = loadingPathOf(href);
      if (loading === undefined) {
        void queryClient.query({ queryKey: [href] }).catch(() => {});
        return;
      }
      void queryClient
        .query(loadingQueryOptions(loading))
        .then((answer) =>
          answer.value === null
            ? queryClient.query({ queryKey: [href] })
            : undefined,
        )
        .catch(() => {});
    };

    // An href changed in place (router.setParams) shows once it's in: the
    // screen stays meanwhile.
    const Screen = (props: { href: string; active: boolean }) => {
      const href = $useDeferredValue(props.href);
      return props.active ? (
        <$Suspense fallback={null}>
          <PageWithLoading href={href} />
        </$Suspense>
      ) : null;
    };

    // Suspends until a query is in. One that is, however old, holds nothing:
    // a stale page was dropped above, and a stale loading state is refreshed
    // by the screen, as it's only shown until the page is in.
    const AwaitQuery = (props: { query: { queryKey: string[] } }) => {
      $useSuspenseQuery({ ...props.query, refetchOnMount: false });
      return null;
    };
    // When the navigation to the href on top started: kept outside React, as
    // a hold that suspends keeps no state.
    let currentNavigation = { href: "", startedAt: 0 };
    // Suspends a navigation's render, above the Stack, until the href's
    // loading state is in, or, without one, its page. As navigations are
    // transitions, the screen on top stays. One that fails ends the hold, for
    // the screen to show why.
    const NavigationHold = (props: { href: string }) => {
      if (currentNavigation.href !== props.href) {
        currentNavigation = { href: props.href, startedAt: Date.now() };
      }
      dropStaleAnswer(props.href, currentNavigation.startedAt);
      // A route with a loading state pushes as soon as its loading state is
      // in, at once if it was prefetched; its page is fetched meanwhile.
      const loading = loadingPathOf(props.href);
      if (loading !== undefined) {
        void queryClient.query({ queryKey: [props.href] }).catch(() => {});
        return <AwaitQuery query={loadingQueryOptions(loading)} />;
      }
      return <AwaitQuery query={{ queryKey: [props.href] }} />;
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

    const Navigator = (props: { href: string }) => (
      <$QueryClientProvider client={queryClient}>
        <SilentErrorBoundary key={props.href}>
          <NavigationHold href={props.href} />
        </SilentErrorBoundary>
        <$RootLayout />
      </$QueryClientProvider>
    );

    const runtime: Runtime = {
      Navigator,
      Screen,
      prefetch,
      // Each of its queries again: one that failed, for its screen to wait
      // for it; the others kept until the new answer is in.
      reload: async (href) => {
        const loading = loadingPathOf(href);
        await Promise.allSettled(
          (loading === undefined ? [href] : [href, loading]).map((path) =>
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
