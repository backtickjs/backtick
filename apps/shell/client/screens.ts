import { type Bundle, modulesOf } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/cjs";
import { getBacktickExtra } from "@backtickjs/expo";
import Constants from "expo-constants";
import type { ReactNode } from "react";
import { useColorScheme } from "react-native";
import { keepManifest, type Manifest } from "./manifest";
import { moduleMap } from "./moduleMap";
import { apps, home } from "./hosts";

// backtickjs.com's paper, behind every screen (server/look.tsx).
export function usePaper(): string {
  return useColorScheme() === "dark" ? "#0a0a0c" : "#ffffff";
}

// Behind an app's screens: its `background_color`, whatever the phone's
// setting, since an app's own colours don't follow that setting unless it says
// so. Without one, as an Expo Router app, light.
export function appPaper(manifest: Manifest | undefined): string {
  return manifest?.background_color ?? "#ffffff";
}

// backtickjs.com's ink, for what the shell draws over a screen.
export function useInk(): string {
  return useColorScheme() === "dark" ? "#fafafa" : "#0e0e10";
}

// The modules this build carries, at the versions app.json's plugin records.
const { installedPackages } = getBacktickExtra(Constants.expoConfig);
const modules = JSON.stringify(modulesOf(moduleMap, installedPackages));

// Where an app's screen at `path` comes from: the app's own host, and the very
// same path. Backtick's home, the app when none is open, has its own.
export function screenUrl(app: string | null, path: string): string {
  return `https://${app === null ? home : app + "." + apps}${path}`;
}

// The app's screen at `path`, bundled by its server for this phone's modules,
// and run. The session's token, when there is one, is attached below
// JavaScript. A failure carries the server's reason: a module this build lacks
// names it. Any bundle runs, whatever its status: an app's not-found screen is
// a screen.
export async function fetchScreen(
  app: string | null,
  path: string,
  signal?: AbortSignal,
): Promise<ReactNode> {
  const response = await fetch(screenUrl(app, path), {
    signal,
    headers: { "x-backtick-modules": modules },
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
