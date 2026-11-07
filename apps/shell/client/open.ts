import { type Bundle, modulesOf } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/cjs";
import { getBacktickExtra } from "@backtickjs/expo";
import type { Runtime, RuntimeOptions } from "@backtickjs/hono";
import type { ComponentType } from "react";
import Constants from "expo-constants";
import { moduleMap } from "./moduleMap";
import { apps, home } from "./hosts";

// The modules this build carries, at the versions app.json's plugin records.
const { installedPackages } = getBacktickExtra(Constants.expoConfig);
const modules = JSON.stringify(modulesOf(moduleMap, installedPackages));

// Where an app is: its own host, or Backtick's for the home (app null). An
// app's paths are its server's, unchanged.
function originOf(app: string | null): string {
  return app === null ? `https://${home}` : `https://${app}.${apps}`;
}

// An app as the phone opens it, or Backtick's home (app null), from its
// server: its root layout, from its `/_layout` route, and the runtime its
// screens come from, fetched together and given where they came from. The
// session's token, when there is one, is attached below JavaScript. A module
// this build lacks is named in the server's answer.
export interface OpenedApp {
  RootLayout: ComponentType;
  runtime: Runtime;
}

export async function openApp(app: string | null): Promise<OpenedApp> {
  const origin = originOf(app);
  const [RootLayout, runtime] = await Promise.all([
    run<ComponentType>(origin + "/_layout"),
    run<(options: RuntimeOptions) => Runtime>(
      origin + "/.well-known/backtick/runtime",
    ),
  ]);
  return { RootLayout, runtime: runtime({ origin, modules }) };
}

async function run<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { "x-backtick-modules": modules },
  });
  const body = await response.text();
  if (
    response.status !== 200 ||
    !response.headers.get("content-type")?.startsWith("text/javascript")
  ) {
    // A refusal says why, as { name, message }.
    let reason = body;
    try {
      reason = JSON.parse(body).message ?? body;
    } catch {}
    throw new Error(
      `The app couldn't be opened (${response.status}): ${reason}`,
    );
  }
  return execRoot(body as Bundle<T>, moduleMap);
}
