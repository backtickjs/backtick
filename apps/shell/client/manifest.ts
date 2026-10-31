import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSyncExternalStore } from "react";

// An app's web app manifest: the part of it the shell uses.
export interface Manifest {
  name?: string;
  icons?: { src: string }[];
  theme_color?: string;
  background_color?: string;
  display?: "fullscreen" | "standalone" | "minimal-ui" | "browser";
}

// Each app's latest, as its screens bring it, and the last one on the phone
// for what's drawn before the first screen: only ever data, never app code.
const manifests = new Map<string, Manifest>();
const listeners = new Set<() => void>();

const key = (app: string) => `manifest:${app}`;

export async function loadManifest(app: string): Promise<void> {
  if (!manifests.has(app)) {
    const kept = await AsyncStorage.getItem(key(app));
    if (kept !== null) {
      manifests.set(app, JSON.parse(kept));
    }
  }
}

// From a screen's `x-backtick-manifest`.
export function keepManifest(app: string, header: string | null): void {
  const kept = header === null ? null : decodeURIComponent(header);
  if (kept === null || kept === JSON.stringify(manifests.get(app))) {
    return;
  }
  manifests.set(app, JSON.parse(kept));
  void AsyncStorage.setItem(key(app), kept);
  listeners.forEach((listener) => listener());
}

export function manifestOf(app: string | null): Manifest | undefined {
  return app === null ? undefined : manifests.get(app);
}

export function useManifest(app: string): Manifest | undefined {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => manifests.get(app),
  );
}
