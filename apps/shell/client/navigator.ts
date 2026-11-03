import { configure } from "@backtickjs/router";
import { type Href, router } from "expo-router";
import { fetchScreen } from "./screens";
import { reloadShownScreen, shownApp, shownPath, shownScreen } from "./shown";

// Tells the screen pushed what was fetched for it (`routeParam.ts`). A hash
// means nothing to a native screen, and would swallow the param.
function withScreen(href: string, screen: string): Href {
  const [path] = href.split("#");
  const param = new URLSearchParams({
    __backtick: JSON.stringify({ screen }),
  });
  return `${path}${path!.includes("?") ? "&" : "?"}${param}` as Href;
}

// @backtickjs/router's Link and router, on this shell's fetch and navigator.
configure({
  async load(href, signal) {
    // Whose screen this is, before anything else can change that.
    const app = shownApp();
    return fetchScreen(app, href, signal);
  },
  push: (href, screen) => router.push(withScreen(href, screen)),
  replace: (href, screen) => router.replace(withScreen(href, screen)),
  back: () => router.back(),
  dismiss: (count) => router.dismiss(count),
  dismissAll: () => router.dismissAll(),
  canGoBack: () => router.canGoBack(),
  canDismiss: () => router.canDismiss(),
  isShown: (href) => href.split("#")[0] === shownPath(),
  shownScreen,
  reload: reloadShownScreen,
});
