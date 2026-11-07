import { type Client, cs } from "@backtickjs/core";
import { type ReactNode, use, useLayoutEffect, useState } from "react" with {
  backtick: "client",
};
import { tryGetContext } from "hono/context-storage";
import { fetchAnswer } from "./runtime.js";

// Fetched as it mounts, and again when its href changes, not when its
// Suspense shows it again, which runs its layout effects again.
const RouteAnswer = cs`(props: { url: string; modules: string }) => {
  const [answer, setAnswer] = $useState(undefined as { url: string; screen: Promise<ReactNode> } | undefined);
  $useLayoutEffect(() => {
    if (answer?.url !== props.url) {
      setAnswer({ url: props.url, screen: $fetchAnswer(props.url, props.modules) });
    }
  }, [props.url]);
  return answer === undefined ? null : $use(answer.screen);
}`;

// Where a route answers alone, without its layouts and loading state:
// `/cart/items/_page` for `/cart/items`.
export const pageSuffix = "/_page";
function pageOf(href: string): string {
  const query = href.indexOf("?");
  const path = query === -1 ? href : href.slice(0, query);
  const search = query === -1 ? "" : href.slice(query);
  return (path === "/" ? "" : path) + pageSuffix + search;
}

/**
 * Another route's answer, drawn in place, alone (its `/_page`, which
 * `backtick()` answers): a server component for a screen
 * that draws part of itself later, such as a header at once and its content
 * once it's in.
 *
 *     <$Suspense fallback={<$ActivityIndicator />}>
 *       {${<Route href={"/product/" + id + "/details"} />}}
 *     </$Suspense>
 *
 * It suspends to the nearest `Suspense` while it loads, and throws to the
 * nearest error boundary if it fails; remounting it fetches it again.
 */
export function Route(props: { href: string }): Client<ReactNode> {
  const context = tryGetContext();
  if (context === undefined) {
    throw new Error(
      "<Route> draws for the phone a screen is rendered for: use it in a screen rendered by context.render, under backtick().",
    );
  }
  const url = new URL(pageOf(props.href), context.req.url).href;
  const modules = context.req.header("x-backtick-modules") ?? "{}";
  return cs`<$RouteAnswer url={${url}} modules={${modules}} />`;
}
