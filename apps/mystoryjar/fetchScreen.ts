import { type Bundle, execRoot } from "@backtickjs/core";
import type { ReactNode } from "react";
import { moduleMap } from "./moduleMap";
import { request } from "./request";

/**
 * The screen at `path` on the server: its bundle, fetched and run with the
 * app's modules. The promise is marked settled once it has, as React's `use`
 * reads one: a screen fetched ahead, for a preloaded screen, draws at once.
 */
export function fetchScreen(path: string): Promise<ReactNode> {
  const screen = load(path) as Promise<ReactNode> & {
    status?: "fulfilled" | "rejected";
    value?: ReactNode;
    reason?: unknown;
  };
  screen.then(
    (value) => Object.assign(screen, { status: "fulfilled", value }),
    (reason) => Object.assign(screen, { status: "rejected", reason }),
  );
  return screen;
}

async function load(path: string): Promise<ReactNode> {
  const response = await request(path);
  if (!response.ok) {
    throw new Error(`${path} answered ${response.status}.`);
  }
  const bundle = (await response.text()) as Bundle<ReactNode>;
  return execRoot(bundle, { format: "cjs", moduleMap });
}
