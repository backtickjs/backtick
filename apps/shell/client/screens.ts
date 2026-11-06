import { type Bundle, modulesOf } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/cjs";
import { getBacktickExtra } from "@backtickjs/expo";
import Constants from "expo-constants";
import type { ComponentType, ReactNode } from "react";
import { useColorScheme } from "react-native";
import { moduleMap } from "./moduleMap";
import { apps, home } from "./hosts";

// backtickjs.com's paper, behind every screen (server/look.tsx).
export function usePaper(): string {
  return useColorScheme() === "dark" ? "#0a0a0c" : "#ffffff";
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
  return run(await request(appUrl(app, path), signal));
}

// An app's root layout: a component rendering its navigator, given the
// screen a navigation is loading, to hold the current one until it arrives.
export type RootLayout = ComponentType<{ navigating?: Promise<void> }>;

// The root layout of an app, or of Backtick's home (app null). Every app has
// one; an app without one answers 404.
export async function fetchRootLayout(app: string | null): Promise<RootLayout> {
  const path = "/.well-known/backtick/root-layout";
  const response = await request(
    app === null ? `https://${home}${path}` : appUrl(app, path),
  );
  if (response.status !== 200) {
    throw new Error(
      `The app's root layout couldn't be loaded (${response.status}).`,
    );
  }
  return (await run(response)) as unknown as RootLayout;
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
