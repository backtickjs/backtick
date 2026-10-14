import { request } from "./request";

// In development, every screen on the stack is fetched again when the server
// restarts, so a change to server/ shows as soon as you save. The server names
// each run at `/live`, and a new name is a new run.
const listeners = new Set<() => void>();

/** Calls `listener` whenever the server restarts; answers what stops it. */
export function onServerRestart(listener: () => void): () => void {
  listeners.add(listener);
  return () => void listeners.delete(listener);
}

/** Watches the server for restarts; answers what stops watching. */
export function watchServer(): () => void {
  let run: string | undefined;
  const timer = setInterval(async () => {
    try {
      const next = await (await request("/live")).text();
      if (run !== undefined && next !== run) {
        listeners.forEach((listener) => listener());
      }
      run = next;
    } catch {
      // Restarting: the next tick finds the new run.
    }
  }, 1000);
  return () => clearInterval(timer);
}
