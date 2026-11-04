// The screen on top: its app, for the commands only Backtick's own screens may
// send, and for the `reload` link, which loads it again in place.
let shown: {
  app: string | null;
  reload: (signal?: AbortSignal) => Promise<unknown>;
} | null = null;

// While the screen is on top; the returned function ends that.
export function showing(
  app: string | null,
  reload: (signal?: AbortSignal) => Promise<unknown>,
): () => void {
  const screen = { app, reload };
  shown = screen;
  return () => {
    if (shown === screen) {
      shown = null;
    }
  };
}

export function backtickShown(): boolean {
  return shown !== null && shown.app === null;
}

export function shownApp(): string | null {
  return shown?.app ?? null;
}

export async function reloadShownScreen(signal?: AbortSignal): Promise<void> {
  await shown?.reload(signal);
}
