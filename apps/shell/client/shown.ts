// The screen on top, for the `reload` link: a page asking the browser to
// load it again, as `location.reload()` does on the web.
let reloadShown: (() => void) | null = null;

// While `reload` is the screen on top's; the returned function ends that.
export function showing(reload: () => void): () => void {
  reloadShown = reload;
  return () => {
    if (reloadShown === reload) {
      reloadShown = null;
    }
  };
}

export function reloadShownScreen(): void {
  reloadShown?.();
}
