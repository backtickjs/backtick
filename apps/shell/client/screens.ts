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
// same path.
export function appUrl(app: string, path: string): string {
  return `https://${app}.${apps}${path}`;
}

// Backtick's home screen at `path`, the screens when no app is open.
export async function fetchHome(
  path: string,
  signal?: AbortSignal,
): Promise<ReactNode> {
  return run(await request(`https://${home}${path}`, signal));
}

// The app's screen at `path`.
export async function fetchApp(
  app: string,
  path: string,
  signal?: AbortSignal,
): Promise<ReactNode> {
  const response = await request(appUrl(app, path), signal);
  keepManifest(app, response.headers.get("x-backtick-manifest"));
  return run(response);
}

// A screen, bundled by its server for this phone's modules. The session's
// token, when there is one, is attached below JavaScript.
function request(url: string, signal?: AbortSignal): Promise<Response> {
  return fetch(url, { signal, headers: { "x-backtick-modules": modules } });
}

// A screen's bundle, run, or the server's reason it isn't one: a module this
// build lacks names it. Any bundle runs, whatever its status: an app's
// not-found screen is a screen.
async function run(response: Response): Promise<ReactNode> {
  const body = await response.text();
  if (!response.headers.get("content-type")?.startsWith("text/javascript")) {
    throw new Error(
      `The screen couldn't be opened (${response.status}): ${body}`,
    );
  }
  return execRoot(body as Bundle<ReactNode>, moduleMap);
}
