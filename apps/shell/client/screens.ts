import { type Bundle, modulesOf } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/cjs";
import { getBacktickExtra } from "@backtickjs/expo";
import Constants from "expo-constants";
import type { Session } from "@supabase/supabase-js";
import { createContext, type ReactNode } from "react";
import { useColorScheme } from "react-native";
import { moduleMap } from "./moduleMap";
import { apps, home, supabase } from "./supabase";

// What an app says about all its screens, at its own routes: `/_layout` is its
// root layout, as an Expo Router app's `_layout.tsx`, and `/_loading` what shows
// while a screen arrives. Known before the app opens; without them, the shell's.
export const roots = new Map<
  string | null,
  { layout?: ReactNode; loading?: ReactNode }
>();

// backtickjs.com's paper, behind every screen (server/look.ts).
export function usePaper(): string {
  return useColorScheme() === "dark" ? "#0a0a0c" : "#ffffff";
}

// The app these screens are, or Backtick's (null).
export const OpenApp = createContext<string | null>(null);

export async function loadRoots(app: string): Promise<void> {
  const { session } = (await supabase.auth.getSession()).data;
  const load = (path: string) =>
    fetchScreen(app, path, session).catch(() => undefined);
  const [layout, loading] = await Promise.all([
    load("/_layout"),
    load("/_loading"),
  ]);
  roots.set(app, { layout, loading });
}

// The modules this build carries, at the versions app.json's plugin records.
const { installedPackages } = getBacktickExtra(Constants.expoConfig);
const modules = JSON.stringify(modulesOf(moduleMap, installedPackages));

// Where an app's screen at `path` comes from: the app's own host, as a site's
// page comes from its domain, and the very same path. Backtick's home, the
// app when none is open, has its own.
export function screenUrl(app: string | null, path: string): string {
  return `https://${app === null ? home : app + "." + apps}${path}`;
}

// The app's screen at `path`, bundled by its server for this phone's modules,
// and run. Signed out, the request carries no token. A failure carries the
// server's reason: a module this build lacks names it.
export async function fetchScreen(
  app: string | null,
  path: string,
  session: Session | null,
): Promise<ReactNode> {
  // A token that expired while the phone slept is refreshed first: timers,
  // and so Supabase's refresh, don't run in the background. 90 s is
  // Supabase's own margin.
  if (session !== null && session.expires_at! * 1000 < Date.now() + 90_000) {
    session = (await supabase.auth.getSession()).data.session;
  }
  const response = await fetch(screenUrl(app, path), {
    headers: {
      ...(session ? { authorization: `Bearer ${session.access_token}` } : {}),
      "x-backtick-modules": modules,
    },
  });
  if (!response.ok) {
    throw new Error(
      `The screen couldn't be opened (${response.status}): ${await response.text()}`,
    );
  }
  const bundle = (await response.text()) as Bundle<ReactNode>;
  return execRoot(bundle, moduleMap);
}
