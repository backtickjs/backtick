import { configure } from "@backtickjs/router";
import { type Href, router } from "expo-router";
import { fetchScreen } from "./screens";
import { reloadShownScreen, shownApp } from "./shown";
import { supabase } from "./supabase";

// Tells the screen pushed what was fetched for it, in a route param: never
// sent to the app's server.
function withScreen(href: string, screen: string): Href {
  return `${href}${href.includes("?") ? "&" : "?"}backtick=${screen}` as Href;
}

// @backtickjs/router's Link and router, on this shell's fetch and navigator.
configure({
  async load(href, signal) {
    const { session } = (await supabase.auth.getSession()).data;
    return fetchScreen(shownApp(), href, session, signal);
  },
  push: (href, screen) => router.push(withScreen(href, screen)),
  replace: (href, screen) => router.replace(withScreen(href, screen)),
  back: () => router.back(),
  dismissTo: (href) => router.dismissTo(href as Href),
  dismiss: (count) => router.dismiss(count),
  dismissAll: () => router.dismissAll(),
  canGoBack: () => router.canGoBack(),
  canDismiss: () => router.canDismiss(),
  setParams: (params) => router.setParams(params),
  reload: reloadShownScreen,
});
