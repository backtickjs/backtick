import type { ReactNode } from "react";

/** What the app around the screens provides: its fetch and its navigator. */
export interface Host {
  load(href: string, signal: AbortSignal): Promise<ReactNode>;
  /** `screen` is its key in {@link arrived}. */
  push(href: string, screen: string): void;
  replace(href: string, screen: string): void;
  back(): void;
  dismiss(count?: number): void;
  dismissAll(): void;
  canGoBack(): boolean;
  canDismiss(): boolean;
  /** Whether `href` is the screen on top. */
  isShown(href: string): boolean;
  /** The screen on top, for {@link leftScreen}. */
  shownScreen(): string | undefined;
  reload(signal: AbortSignal): Promise<unknown>;
}

let host: Host;

export function configure(next: Host): void {
  host = next;
}

/**
 * Screens fetched and not yet mounted, settled and marked the way React marks
 * a promise, so `use` doesn't suspend for a tick. The host deletes an entry
 * once its screen has mounted: a remount fetches the latest copy.
 */
export const arrived = new Map<string, Promise<ReactNode>>();

type Method = "navigate" | "push" | "replace";

let pending: {
  method: Method;
  href: string;
  from: string | undefined;
  controller: AbortController;
} | null = null;
let reloading: {
  from: string | undefined;
  controller: AbortController;
} | null = null;
let screens = 0;
const listeners = new Set<() => void>();

export type NavigationState = "idle" | "loading";

export function navigationState(): NavigationState {
  return pending === null && reloading === null ? "idle" : "loading";
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function changed(): void {
  listeners.forEach((listener) => listener());
}

/** Drops what's in flight, as a browser does when another navigation starts. */
export function cancel(): void {
  if (pending === null && reloading === null) {
    return;
  }
  pending?.controller.abort();
  reloading?.controller.abort();
  pending = null;
  reloading = null;
  changed();
}

/**
 * What a screen started is no longer wanted once it's gone, however it left: a
 * back gesture or button is native, and no Link sees it. A navigation from any
 * other screen stands: a screen just pushed may navigate as it mounts.
 */
export function leftScreen(screen: string): void {
  if (pending?.from === screen) {
    pending.controller.abort();
    pending = null;
    changed();
  }
  if (reloading?.from === screen) {
    reloading.controller.abort();
    reloading = null;
    changed();
  }
}

function load(href: string, signal: AbortSignal): Promise<ReactNode> {
  try {
    return host.load(href, signal);
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * Fetches `href`, then shows it: the current screen stays until then.
 * `navigate` is `push`, except that the screen on top stays where it is.
 */
export function navigate(method: Method, href: string): void {
  if (method === "navigate" && host.isShown(href)) {
    return;
  }
  // A second press of the same link: the route already runs for it.
  if (pending?.href === href && pending.method === method) {
    return;
  }
  pending?.controller.abort();
  const controller = new AbortController();
  const from = host.shownScreen();
  const navigation = { method, href, from, controller };
  pending = navigation;
  changed();
  const screen = load(href, controller.signal);
  const settle = (result: object) => {
    if (pending !== navigation) {
      return;
    }
    pending = null;
    const key = String(++screens);
    arrived.set(key, Object.assign(screen, result));
    changed();
    host[method === "replace" ? "replace" : "push"](href, key);
  };
  screen.then(
    (value) => settle({ status: "fulfilled", value }),
    (reason) => settle({ status: "rejected", reason }),
  );
}

export function back(): void {
  cancel();
  host.back();
}

export function dismiss(count?: number): void {
  cancel();
  host.dismiss(count);
}

export function dismissAll(): void {
  cancel();
  host.dismissAll();
}

export const canGoBack = (): boolean => host.canGoBack();
export const canDismiss = (): boolean => host.canDismiss();

export async function reload(): Promise<void> {
  reloading?.controller.abort();
  const controller = new AbortController();
  const reloadingNow = { from: host.shownScreen(), controller };
  reloading = reloadingNow;
  changed();
  try {
    await host.reload(controller.signal);
  } catch {
    // The screen shows its own failure.
  } finally {
    if (reloading === reloadingNow) {
      reloading = null;
      changed();
    }
  }
}
