// The app the phone has open: the one whose screen is on top, or Backtick's
// home (null). A screen keeps the app it was opened in, and makes it the open
// one again when it's back on top, so an app's `/day` is its own `/day`.
let openApp: string | null = null;

export function currentApp(): string | null {
  return openApp;
}

export function setOpenApp(app: string | null): void {
  openApp = app;
}
