import { createElement, type ReactElement, useSyncExternalStore } from "react";
import {
  type GestureResponderEvent,
  Linking,
  Text,
  type TextProps,
} from "react-native";
import { type Href, hrefString, isExternal } from "./href.js";
import {
  back,
  canDismiss,
  canGoBack,
  dismiss,
  dismissAll,
  navigate,
  navigationState,
  type NavigationState,
  reload,
  subscribe,
} from "./loop.js";
import { slotted } from "./slot.js";

export type { Href } from "./href.js";
export {
  arrived,
  configure,
  type Host,
  leftScreen,
  type NavigationState,
} from "./loop.js";

function go(method: "navigate" | "push" | "replace", href: Href): void {
  const to = hrefString(href);
  if (isExternal(to)) {
    void Linking.openURL(to);
  } else {
    navigate(method, to);
  }
}

export interface LinkProps extends Omit<TextProps, "onPress"> {
  href: Href;
  /** Replaces the current screen instead of adding one. */
  replace?: boolean;
  /** Adds a screen even if `href` is the one on top. */
  push?: boolean;
  /** Gives its props to its only child, instead of rendering text. */
  asChild?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

/**
 * expo-router's `Link`, except that the screen is fetched first and shown when
 * it arrives, like a page in a browser: the current one stays until then.
 */
export function Link({
  href,
  replace,
  push,
  asChild,
  onPress,
  children,
  ...rest
}: LinkProps): ReactElement {
  const press = (event: GestureResponderEvent) => {
    onPress?.(event);
    if (!event?.defaultPrevented) {
      go(replace ? "replace" : push ? "push" : "navigate", href);
    }
  };
  const props = { ...rest, onPress: press, role: "link" as const };
  return asChild
    ? slotted(children, props)
    : createElement(Text, props, children);
}

/** expo-router's `router`, fetching first as {@link Link} does, plus `reload`. */
export const router = {
  push: (href: Href) => go("push", href),
  navigate: (href: Href) => go("navigate", href),
  replace: (href: Href) => go("replace", href),
  back,
  canGoBack,
  dismiss,
  dismissAll,
  canDismiss,
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
