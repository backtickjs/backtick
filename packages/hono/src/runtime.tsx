// The phone's half of `backtick()`: how an app's screens are fetched, kept and
// shown, written as client code, which `backtick()` sends from
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
  useEffect,
} from "react" with { backtick: "client" };

/**
 * What the phone runs an app with. A shell checks for a member before using
 * it, so a later runtime can drop one.
 */
export interface Runtime {
  /**
   * The app's root layout, its `/_layout` route, given the href on top. A
   * navigation holds the current screen until the next is in, as navigations
   * are transitions (`router.setTransitionMode("always")`): a route with a
   * `_loading` is in once its layouts and loading state are. Suspends until
   * the first screen is in.
   */
  Navigator?: ComponentType<{ href: string }>;
  /**
   * A route's screen: its layouts, its loading state, and its page. One not
   * `active` yet (`<Link prefetch>` mounts a route ahead of its navigation)
   * shows nothing, and fetches ahead, as far as its loading state.
   */
  Screen?: ComponentType<{ href: string; active: boolean }>;
  /**
   * Fetches an href's screen again, which stays until the new one is in:
   * resolves once it's in, either way.
   */
  reload?(href: string): Promise<void>;
}

/**
 * A route's answer, run. Any bundle is an answer, whatever its status: an
 * app's not-found screen is one. A refusal ({ name, message }) says why. For
 * a route that may not exist (`optional`), a 404 is null.
 */
export const fetchAnswer = cs`async (
  url: string,
  modules: string,
  optional: boolean,
) => {
  const response = await fetch(url, {
    headers: { "x-backtick-modules": modules },
  });
  if (optional && response.status === 404) {
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
 * the app's root layout, with the patterns of its other `_layout` and
 * `_loading` routes (`/product/:id/_layout`), so a screen asks only for
 * those it has.
 */
export function runtime(
  origin: string,
  modules: string,
  RootLayout: Client<ComponentType>,
  routes: readonly string[],
): Client<Runtime> {
  return cs`{
    // Every answer is a query, keyed by its path: what the route renders, alone.
    // A screen is several: its layouts', its loading state's and its page's.
    const queryClient = new $QueryClient({
      defaultOptions: {
        queries: {
          queryFn: async (context: { queryKey: readonly unknown[] }) =>
            $fetchAnswer(
              $origin + (context.queryKey[0] as string),
              $modules,
              false,
            ),
          staleTime: 30000,
          structuralSharing: false,
          retry: false,
        },
      },
    });
    // A layout or a loading state: none if it answers 404, for a param it
    // has none for. Its component in an object, as React Query would call a
    // function.
    const optional = (key: string) => ({
      queryKey: [key],
      queryFn: async () => ({
        value: (await $fetchAnswer(
          $origin + key,
          $modules,
          true,
        )) as ComponentType<{ children?: ReactNode }> | null,
      }),
    });
    // Whether the app has a route for a path, matched by Hono's own router.
    const router = new $PatternRouter<true>();
    for (const route of $routes) {
      router.add("GET", route, true);
    }
    const has = (path: string) => router.match("GET", path)[0].length > 0;
    // The paths of an href's screen: its layouts, outermost first, below the
    // root's; its loading state, if it has one; its page.
    const pathsOf = (href: string) => {
      const query = href.indexOf("?");
      const path = query === -1 ? href : href.slice(0, query);
      const segments = path.split("/").filter((segment) => segment !== "");
      const loading = (path === "/" ? "" : path) + "/_loading";
      return {
        layouts: segments
          .map(
            (_, index) =>
              "/" + segments.slice(0, index + 1).join("/") + "/_layout",
          )
          .filter(has),
        loading: has(loading) ? loading : undefined,
        page: href,
      };
    };
    const framesOf = (paths: ReturnType<typeof pathsOf>) =>
      paths.loading === undefined
        ? paths.layouts
        : [...paths.layouts, paths.loading];
    // An href's layouts and loading state, once they're in; its page fetched
    // meanwhile. Fetched again when stale, unless kept: a hold waits only for
    // what isn't in, so going back shows the screen as it was, as in Next.js.
    const useFrame = (href: string, kept: boolean) => {
      const paths = pathsOf(href);
      $usePrefetchQuery({ queryKey: [paths.page] });
      const answers = $useSuspenseQueries({
        queries: framesOf(paths).map((key) => ({
          ...optional(key),
          refetchOnMount: !kept,
        })),
      });
      return {
        page: paths.page,
        layouts: answers
          .slice(0, paths.layouts.length)
          .map((answer) => answer.data.value),
        Loading:
          paths.loading === undefined
            ? null
            : answers[paths.layouts.length]!.data.value,
      };
    };

    const Page = (props: { href: string }) =>
      $useSuspenseQuery({ queryKey: [props.href] }).data as ReactNode;

    // A screen as Next.js nests a page: inside its layouts, and, with a loading
    // state, inside a Suspense showing it.
    const Framed = (props: { href: string }) => {
      const { page, layouts, Loading } = useFrame(props.href, false);
      let inner: ReactNode = <Page href={page} />;
      if (Loading !== null) {
        inner = <$Suspense fallback={<Loading />}>{inner}</$Suspense>;
      }
      for (const Layout of [...layouts].reverse()) {
        if (Layout !== null) {
          inner = <Layout>{inner}</Layout>;
        }
      }
      return inner;
    };

    // Fetches an href ahead, as Next.js prefetches: its layouts and loading
    // state, and its page only for a route without one.
    const prefetch = (href: string) => {
      const paths = pathsOf(href);
      for (const layout of paths.layouts) {
        void queryClient.prefetchQuery(optional(layout));
      }
      if (paths.loading === undefined) {
        void queryClient.prefetchQuery({ queryKey: [paths.page] });
        return;
      }
      void queryClient.fetchQuery(optional(paths.loading)).then(
        (loading) =>
          loading.value === null
            ? queryClient.prefetchQuery({ queryKey: [paths.page] })
            : undefined,
        () => {},
      );
    };

    // An href changed in place (router.setParams) shows once it's in: the
    // screen stays meanwhile.
    const Screen = (props: { href: string; active: boolean }) => {
      const href = $useDeferredValue(props.href);
      $useEffect(() => {
        if (!props.active) {
          prefetch(props.href);
        }
      }, [props.active, props.href]);
      return props.active ? (
        <$Suspense fallback={null}>
          <Framed href={href} />
        </$Suspense>
      ) : null;
    };

    // Suspends a navigation's render, above the Stack, until the href's screen
    // can show: its layouts and loading state, and, without one, its page. As
    // navigations are transitions, the screen on top stays. One that fails
    // ends the hold, for the screen to show why.
    const PageIn = (props: { href: string }) => {
      $useSuspenseQuery({ queryKey: [props.href], refetchOnMount: false });
      return null;
    };
    const Hold = (props: { href: string }) => {
      const { page, Loading } = useFrame(props.href, true);
      return Loading === null ? <PageIn href={page} /> : null;
    };
    class Quiet extends $Component<
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
        <Quiet key={props.href}>
          <Hold href={props.href} />
        </Quiet>
        <$RootLayout />
      </$QueryClientProvider>
    );

    const runtime: Runtime = {
      Navigator,
      Screen,
      // Each of its queries again: one that failed, for its screen to wait
      // for it; the others kept until the new answer is in.
      reload: async (href) => {
        const paths = pathsOf(href);
        await Promise.allSettled(
          [paths.page, ...framesOf(paths)].map((key) =>
            queryClient.getQueryState([key])?.status === "error"
              ? queryClient.resetQueries({ queryKey: [key], exact: true })
              : queryClient.refetchQueries({ queryKey: [key], exact: true }),
          ),
        );
      },
    };
    return runtime;
  }`;
}
