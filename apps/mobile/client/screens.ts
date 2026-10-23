import { type Bundle, modulesOf } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/cjs";
import { getBacktickExtra } from "@backtickjs/expo";
import Constants from "expo-constants";
import type { Session } from "@supabase/supabase-js";
import type { ReactNode } from "react";
import { moduleMap } from "./moduleMap";
import { screens } from "./supabase";

// The modules this build carries, at the versions app.json's plugin records.
const { installedPackages } = getBacktickExtra(Constants.expoConfig);
const modules = JSON.stringify(modulesOf(moduleMap, installedPackages));

// Where an app's screen at `path` comes from: the app's own host, as a site's
// page comes from its domain, and the very same path. Backtick's home, the
// app when none is open, is the host itself.
export function screenUrl(app: string | null, path: string): string {
  return `https://${app === null ? "" : app + "."}${screens}${path}`;
}

// The app's screen at `path`, bundled by its server for this phone's modules,
// and run. Signed out, the request carries no token. A failure carries the
// server's reason: a module this build lacks names it.
export async function fetchScreen(
  app: string | null,
  path: string,
  session: Session | null,
): Promise<ReactNode> {
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
