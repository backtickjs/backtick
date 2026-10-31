import {
  cloneElement,
  createElement,
  type ReactElement,
  useSyncExternalStore,
} from "react";
import {
  type GestureResponderEvent,
  Linking,
  Text,
  type TextProps,
} from "react-native";
import {
  back,
  canDismiss,
  canGoBack,
  dismiss,
  dismissAll,
  dismissTo,
  navigate,
  navigationState,
  type NavigationState,
  reload,
  setParams,
  subscribe,
} from "./loop.js";

export {
  arrived,
  cancel,
  configure,
  type Host,
  type NavigationState,
} from "./loop.js";

/** A link's own URL scheme, as `https:` or `mailto:`, leaves the app. */
const external = /^[a-z][a-z0-9+.-]*:/i;

/** A path from the root or a URL, or a path and its query, as expo-router's. */
export type Href =
  | string
  | {
      pathname: string;
      params?: Record<
        string,
        string | number | boolean | readonly string[] | null | undefined
      >;
    };

function hrefString(href: Href): string {
  if (typeof href === "string") {
    return href;
  }
  const search = new URLSearchParams();
  for (const [name, value] of Object.entries(href.params ?? {})) {
    for (const each of [value ?? []].flat()) {
      search.append(name, String(each));
    }
  }
  return search.size > 0 ? `${href.pathname}?${search}` : href.pathname;
}

export interface LinkProps extends Omit<TextProps, "onPress"> {
  href: Href;
  /** Replaces the current screen instead of pushing. */
  replace?: boolean;
  /** Pushes, the default. */
  push?: boolean;
  /** Goes back to `href` if it's in the stack. */
  dismissTo?: boolean;
  /** Gives its props to its only child, instead of rendering text. */
  asChild?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

/**
 * expo-router's `Link`, except that the screen is fetched first and shown when
 * it arrives, like a page in a browser: the current one stays until then.
 */
export function Link({
  href: to,
  replace,
  push: _push,
  dismissTo: dismiss,
  asChild,
  onPress,
  ...rest
}: LinkProps): ReactElement {
  const href = hrefString(to);
  const press = (event: GestureResponderEvent) => {
    onPress?.(event);
    if (event?.defaultPrevented) {
      return;
    }
    if (external.test(href)) {
      void Linking.openURL(href);
    } else if (dismiss) {
      dismissTo(href);
    } else {
      navigate(replace ? "replace" : "push", href);
    }
  };
  const props = { ...rest, onPress: press, role: "link" as const };
  return asChild
    ? cloneElement(rest.children as ReactElement<object>, props)
    : createElement(Text, props);
}

/** expo-router's `router`, fetching first as {@link Link} does, plus `reload`. */
export const router = {
  push: (href: Href) => navigate("push", hrefString(href)),
  navigate: (href: Href) => navigate("push", hrefString(href)),
  replace: (href: Href) => navigate("replace", hrefString(href)),
  back,
  canGoBack,
  dismiss,
  dismissAll,
  canDismiss,
  dismissTo: (href: Href) => dismissTo(hrefString(href)),
  setParams,
  reload,
};

/** expo-router's `useRouter`. */
export function useRouter(): typeof router {
  return router;
}

/** Whether a navigation is on its way, so a screen can show it. */
export function useNavigation(): { state: NavigationState } {
  const state = useSyncExternalStore(subscribe, navigationState);
  return { state };
}
