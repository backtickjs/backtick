// What the shell tells a route, in its one `__backtick` param: the app a
// navigator is for, the screen fetched for a route, and that a route is the
// splash. Never sent to an app's server. Anything else there, from a link
// someone wrote, tells it nothing.
export interface RouteParam {
  app?: string;
  screen?: string;
  splash?: boolean;
}

export function readRouteParam(value: unknown): RouteParam {
  try {
    const param = typeof value === "string" ? JSON.parse(value) : null;
    return typeof param === "object" && param !== null ? param : {};
  } catch {
    return {};
  }
}
