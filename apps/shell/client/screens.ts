import { type Bundle, modulesOf } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/cjs";
import { getBacktickExtra } from "@backtickjs/expo";
import Constants from "expo-constants";
import type { Session } from "@supabase/supabase-js";
import type { ReactNode } from "react";
import { moduleMap } from "./moduleMap";
import { apps, home, supabase } from "./supabase";

// The modules this build carries, at the versions app.json's plugin records.
const { installedPackages } = getBacktickExtra(Constants.expoConfig);
const modules = JSON.stringify(modulesOf(moduleMap, installedPackages));

// Where an app's screen at `path` comes from: the app's own host, as a site's
// page comes from its domain, and the very same path. Backtick's home, the
// app when none is open, has its own.
export function screenUrl(app: string | null, path: string): string {
  return `https://${app === null ? home : app + "." + apps}${path}`;
}

// A screen, run, and whether its server asked for it to be checked again
// before it's shown again: `Cache-Control: no-cache`, as a page whose content
// goes stale says it.
export type Screen = { node: ReactNode; revalidate: boolean };

// The app's screen at `path`, bundled by its server for this phone's modules,
// and run. Signed out, the request carries no token. A failure carries the
// server's reason: a module this build lacks names it.
export async function fetchScreen(
  app: string | null,
  path: string,
  session: Session | null,
): Promise<Screen> {
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
  const revalidate = /\bno-cache\b/.test(
    response.headers.get("cache-control") ?? "",
  );
  const bundle = (await response.text()) as Bundle<ReactNode>;
  return { node: await execRoot(bundle, moduleMap), revalidate };
}
