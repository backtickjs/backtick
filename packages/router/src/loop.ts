import type { ReactNode } from "react";

/** What the app around the screens provides: its fetch and its navigator. */
export interface Host {
  load(href: string, signal: AbortSignal): Promise<ReactNode>;
  /** `screen` is its key in {@link arrived}. */
  push(href: string, screen: string): void;
  replace(href: string, screen: string): void;
  back(): void;
  dismissTo(href: string): void;
  dismiss(count?: number): void;
  dismissAll(): void;
  canGoBack(): boolean;
  canDismiss(): boolean;
  setParams(params: Record<string, string>): void;
  reload(): Promise<unknown>;
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

let pending: { href: string; controller: AbortController } | null = null;
let reloads = 0;
let screens = 0;
const listeners = new Set<() => void>();

export type NavigationState = "idle" | "loading";

export function navigationState(): NavigationState {
  return pending === null && reloads === 0 ? "idle" : "loading";
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function changed(): void {
  listeners.forEach((listener) => listener());
}

/** Drops the navigation in flight, as a browser does when another starts. */
export function cancel(): void {
  if (pending !== null) {
    pending.controller.abort();
    pending = null;
    changed();
  }
}

/** Fetches `href`, then shows it: the current screen stays until then. */
export function navigate(method: "push" | "replace", href: string): void {
  // A second press of the same link: the route already runs for it.
  if (pending?.href === href) {
    return;
  }
  pending?.controller.abort();
  const controller = new AbortController();
  const navigation = { href, controller };
  pending = navigation;
  changed();
  const screen = host.load(href, controller.signal);
  const settle = (result: object) => {
    if (pending !== navigation) {
      return;
    }
    pending = null;
    const key = String(++screens);
    arrived.set(key, Object.assign(screen, result));
    changed();
    host[method](href, key);
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

/** Nothing is fetched: the screen is usually there already, and stays. */
export function dismissTo(href: string): void {
  cancel();
  host.dismissTo(href);
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

export function setParams(params: Record<string, string>): void {
  host.setParams(params);
}

export async function reload(): Promise<void> {
  reloads++;
  changed();
  try {
    await host.reload();
  } catch {
    // The screen shows its own failure.
  } finally {
    reloads--;
    changed();
  }
}
