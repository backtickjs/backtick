import {
  Link as ExpoLink,
  router as expoRouter,
  useIsFocused,
  useRouter as useExpoRouter,
} from "expo-router";
import { resolveHref } from "expo-router/build/link/href";
import {
  createContext,
  createElement,
  type ReactNode,
  use,
  useEffect,
  useMemo,
} from "react";

export * from "expo-router";

type Prefetch = (href: string, page: boolean) => void;

// How a Link fetches its href ahead (with its page, for `prefetch`).
const PrefetchContext = createContext<Prefetch | undefined>(undefined);

// The provider's fetch, which every Link and useRouter needs: the app serving
// this module always sets one.
function usePrefetch(): Prefetch {
  const prefetch = use(PrefetchContext);
  if (prefetch === undefined) {
    throw new Error(
      "@backtickjs/expo-router needs a PrefetchProvider above it.",
    );
  }
  return prefetch;
}

// The fetch of the app on top, for `router.prefetch`, which has no screen.
let prefetchOnTop: Prefetch | undefined;

/**
 * How links and `router.prefetch` under it prefetch, set by the app
 * serving this module: `prefetch` is the page too.
 */
export function PrefetchProvider(props: {
  value: Prefetch;
  children: ReactNode;
}) {
  const focused = useIsFocused();
  useEffect(() => {
    if (!focused) {
      return;
    }
    prefetchOnTop = props.value;
    return () => {
      if (prefetchOnTop === props.value) {
        prefetchOnTop = undefined;
      }
    };
  }, [focused, props.value]);
  return createElement(PrefetchContext, { value: props.value }, props.children);
}

type LinkProps = Parameters<typeof ExpoLink>[0];

// expo-router's Link, which fetches its href ahead while its screen is on
// top, and again as it's pressed, as Next.js's prefetches every link it
// shows: what its screen needs to show, and its page too with `prefetch`;
// `prefetch={false}` turns it off. It never has expo-router preload a route:
// the fetch is data only.
function PrefetchingLink({ prefetch, onPressIn, ...props }: LinkProps) {
  const prefetchHref = usePrefetch();
  const focused = useIsFocused();
  const href = resolveHref(props.href);
  const enabled = prefetch !== false;
  const page = prefetch === true;
  useEffect(() => {
    if (enabled && focused) {
      prefetchHref(href, page);
    }
  }, [enabled, focused, prefetchHref, href, page]);
  return createElement(ExpoLink, {
    ...props,
    onPressIn: (event) => {
      if (enabled) {
        prefetchHref(href, page);
      }
      onPressIn?.(event);
    },
  });
}

export const Link = Object.assign(PrefetchingLink, ExpoLink) as typeof ExpoLink;

type Router = typeof expoRouter;

// The router's `prefetch`, as a Link without `prefetch` prefetches: for the
// app on top, and with none (a moment at startup), nothing. Never a preload.
const prefetch: Router["prefetch"] = (href) =>
  prefetchOnTop?.(resolveHref(href), false);

// expo-router's router, with that `prefetch`. Read through on each access:
// expo-router binds the router's methods once it renders.
export const router: Router = new Proxy(expoRouter, {
  get(target, key, receiver) {
    return key === "prefetch" ? prefetch : Reflect.get(target, key, receiver);
  },
});

/** expo-router's `useRouter`, whose `prefetch` prefetches for its app. */
export function useRouter(): ReturnType<typeof useExpoRouter> {
  const actions = useExpoRouter();
  const prefetchHref = usePrefetch();
  return useMemo(
    () => ({
      ...actions,
      prefetch: (href: Parameters<Router["prefetch"]>[0]) =>
        prefetchHref(resolveHref(href), false),
    }),
    [actions, prefetchHref],
  );
}
