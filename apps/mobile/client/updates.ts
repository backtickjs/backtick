import { useSyncExternalStore } from "react";

// The reload the screen on top offers, when its app has a new version, for the
// snackbar the layout draws above every screen.
let offered: (() => void) | null = null;
const listeners = new Set<() => void>();

export function offerReload(reload: (() => void) | null): void {
  offered = reload;
  listeners.forEach((listener) => listener());
}

export function useOfferedReload(): (() => void) | null {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => offered,
  );
}
