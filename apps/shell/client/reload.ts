// The screen on top, for the `reload` link, which loads it again in place.
let shown: ((signal?: AbortSignal) => Promise<unknown>) | null = null;

// While the screen is on top; the returned function ends that.
export function showing(
  reload: (signal?: AbortSignal) => Promise<unknown>,
): () => void {
  shown = reload;
  return () => {
    if (shown === reload) {
      shown = null;
    }
  };
}

export async function reloadShownScreen(signal?: AbortSignal): Promise<void> {
  await shown?.(signal);
}
