import { type Bundle, modulesOf } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/cjs";
import { getBacktickExtra } from "@backtickjs/expo";
import Constants from "expo-constants";
import type { Session } from "@supabase/supabase-js";
import { createContext, type ReactNode } from "react";
import { useColorScheme } from "react-native";
import { keepManifest, type Manifest } from "./manifest";
import { moduleMap } from "./moduleMap";
import { apps, home, supabase } from "./supabase";

// backtickjs.com's paper, behind every screen (server/look.tsx).
export function usePaper(): string {
  return useColorScheme() === "dark" ? "#0a0a0c" : "#ffffff";
}

// `background_color` is the app's in the light: a manifest has no dark one.
export function useAppPaper(manifest: Manifest | undefined): string {
  const paper = usePaper();
  const dark = useColorScheme() === "dark";
  return (!dark && manifest?.background_color) || paper;
}

// backtickjs.com's ink, for what the shell draws over a screen.
export function useInk(): string {
  return useColorScheme() === "dark" ? "#fafafa" : "#0e0e10";
}

// The app these screens are, or Backtick's (null).
export const OpenApp = createContext<string | null>(null);

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
// server's reason: a module this build lacks names it. Any bundle runs, whatever
// its status: an app's not-found screen is a screen.
export async function fetchScreen(
  app: string | null,
  path: string,
  session: Session | null,
  signal?: AbortSignal,
): Promise<ReactNode> {
  // A token that expired while the phone slept is refreshed first: timers,
  // and so Supabase's refresh, don't run in the background. 90 s is
  // Supabase's own margin.
  if (session !== null && session.expires_at! * 1000 < Date.now() + 90_000) {
    session = (await supabase.auth.getSession()).data.session;
  }
  const response = await fetch(screenUrl(app, path), {
    signal,
    headers: {
      ...(session ? { authorization: `Bearer ${session.access_token}` } : {}),
      "x-backtick-modules": modules,
    },
  });
  const body = await response.text();
  if (!response.headers.get("content-type")?.startsWith("text/javascript")) {
    throw new Error(
      `The screen couldn't be opened (${response.status}): ${body}`,
    );
  }
  if (app !== null) {
    keepManifest(app, response.headers.get("x-backtick-manifest"));
  }
  return execRoot(body as Bundle<ReactNode>, moduleMap);
}
