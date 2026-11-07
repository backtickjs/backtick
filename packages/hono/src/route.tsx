import { type Client, cs } from "@backtickjs/core";
import { type ReactNode, use, useLayoutEffect, useState } from "react" with {
  backtick: "client",
};
import { tryGetContext } from "hono/context-storage";
import { fetchAnswer } from "./runtime.js";

// Fetched as it mounts, and again when its href changes, not when its
// Suspense shows it again, which runs its layout effects again.
const RouteAnswer = cs`(props: { origin: string; modules: string; href: string }) => {
  const [answer, setAnswer] = $useState(undefined as { href: string; screen: Promise<ReactNode> } | undefined);
  $useLayoutEffect(() => {
    if (answer?.href !== props.href) {
      setAnswer({ href: props.href, screen: $fetchAnswer(props.origin, props.modules, props.href, true) });
    }
  }, [props.href]);
  return answer === undefined ? null : $use(answer.screen);
}`;

/**
 * Another route's answer, drawn in place: a server component for a screen
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
  // The phone's origin, which a proxy can hide from the server, and modules.
  const origin =
    context.req.header("x-backtick-origin") ?? new URL(context.req.url).origin;
  const modules = context.req.header("x-backtick-modules") ?? "{}";
  return cs`<$RouteAnswer origin={${origin}} modules={${modules}} href={${props.href}} />`;
}
