import { type Bundle, modulesOf } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/cjs";
import { getBacktickExtra } from "@backtickjs/expo";
import Constants from "expo-constants";
import type { Session } from "@supabase/supabase-js";
import type { ReactNode } from "react";
import { moduleMap } from "./moduleMap";
import type { App } from "./openApp";
import { server } from "./supabase";

// The modules this build carries, at the versions app.json's plugin records.
const { installedPackages } = getBacktickExtra(Constants.expoConfig);
const modules = JSON.stringify(modulesOf(moduleMap, installedPackages));

// Spike: the starter, opened straight from a Cloudflare Worker
// (local/northstar-spike/worker, not in the repo), with the times shown. Remove after.
export const spike: App = {
  id: "cloudflare-spike",
  title: "Starter, from Cloudflare",
};
const spikeUrl = "https://backtick-open-spike.backtickjs.workers.dev";

export type Opened = { screen: ReactNode; fetched: number; ran: number };

// The screen at `path` of the app, bundled by its server for this phone's
// modules, and run.
export async function fetchScreen(
  app: App,
  path: string,
  session: Session,
): Promise<Opened> {
  const started = performance.now();
  const url =
    app.id === spike.id ? spikeUrl + path : `${server}/apps/${app.id}`;
  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${session.access_token}`,
      "x-backtick-modules": modules,
    },
  });
  if (response.status === 426) {
    throw new Error(
      "This app needs a newer version of Backtick. Update it from the Play Store.",
    );
  }
  if (!response.ok) {
    throw new Error(`The app couldn't be opened (${response.status}).`);
  }
  const bundle = (await response.text()) as Bundle<ReactNode>;
  const fetched = performance.now();
  const screen = execRoot(bundle, moduleMap);
  const ran = performance.now();
  console.log(
    `open ${app.id}${path}: fetched ${Math.round(fetched - started)} ms, ran ${Math.round(ran - fetched)} ms`,
  );
  return {
    screen,
    fetched: Math.round(fetched - started),
    ran: Math.round(ran - fetched),
  };
}
