// The screen on top: its app, for the commands only Backtick's own screens may
// send, and for the `reload` link, a page asking the browser to load it again,
// as `location.reload()` does on the web.
let shown: { app: string | null; reload: () => void } | null = null;

// While the screen is on top; the returned function ends that.
export function showing(app: string | null, reload: () => void): () => void {
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

export function reloadShownScreen(): void {
  shown?.reload();
}
