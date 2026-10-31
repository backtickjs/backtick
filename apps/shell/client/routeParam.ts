// What the shell tells a route, in its one `backtick` param: the app a
// navigator is for, the screen fetched for a route, and that a route is the
// splash. Never sent to an app's server.
export interface RouteParam {
  app?: string;
  screen?: string;
  splash?: boolean;
}

export function readRouteParam(value: unknown): RouteParam {
  return typeof value === "string" ? JSON.parse(value) : {};
}
