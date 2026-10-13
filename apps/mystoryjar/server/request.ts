import type { IncomingMessage } from "node:http";
import { readSession, type User } from "./auth/session.js";
import type { Modules } from "@backtickjs/bundler";
import { builds } from "./builds.js";
import { themeOf } from "./preferences.js";
import type { Theme } from "./ui/theme.js";

/** What a screen knows of the request it's drawn for. */
export type ScreenRequest = {
  // where the app reached this server, for the files a screen links to and
  // the API its scripts call
  origin: string;
  // the phone's, which dates are written in
  timeZone: string;
  // who's signed in, if anyone, and the session that says so, which the
  // screen's scripts send back
  user: User | null;
  session: string | null;
  // light while signed out, as the website is; else the user's choice
  theme: Theme;
  // the path's query: /edit?id=… has { id: "…" }
  query: Record<string, string>;
  // the modules the app's build carries, which its screens are bundled for
  modules: Modules;
};

/**
 * Where the phone reached this server: the address the request came to, or
 * behind a proxy, as on Cloud Run, the one it forwards.
 */
export function originOf(request: IncomingMessage): string {
  const protocol = request.headers["x-forwarded-proto"] ?? "http";
  const host = request.headers["x-forwarded-host"] ?? request.headers.host;
  return `${protocol}://${host}`;
}

/**
 * What a screen is drawn for, from what the app sent however it sent it:
 * an HTTP request's headers, as `screenRequest` reads them, or a GraphQL
 * operation's variables. Throws `UnknownBuild` for a build this server
 * doesn't know.
 */
export async function screenRequestOf(sent: {
  origin: string;
  timeZone: string;
  session: string | null;
  buildId: string | null;
  query: Record<string, string>;
}): Promise<ScreenRequest> {
  const modules = builds.modulesOf(sent.buildId);
  const user = await readSession(sent.session ?? undefined);
  return {
    origin: sent.origin,
    timeZone: sent.timeZone,
    user,
    session: sent.session,
    theme: user === null ? "light" : await themeOf(user.uid),
    modules,
    query: sent.query,
  };
}

/** The same, from an HTTP request: what this app's `fetch` sends. */
export function screenRequest(
  request: IncomingMessage,
): Promise<ScreenRequest> {
  const header = (name: string) => request.headers[name]?.toString() || null;
  return screenRequestOf({
    origin: originOf(request),
    timeZone: header("x-time-zone") ?? "UTC",
    session: header("authorization")?.replace(/^Bearer /, "") ?? null,
    buildId: header("x-build-id"),
    query: Object.fromEntries(
      new URL(request.url ?? "/", "http://localhost").searchParams,
    ),
  });
}
