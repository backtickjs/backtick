import type { IncomingMessage } from "node:http";

/** What a screen knows of the request it's drawn for. */
export type ScreenRequest = {
  // where the app reached this server, for the files a screen links to
  origin: string;
  // the phone's, which dates are written in
  timeZone: string;
};

export function screenRequest(request: IncomingMessage): ScreenRequest {
  // Behind a proxy, as on Cloud Run, the address the phone used is forwarded.
  const protocol = request.headers["x-forwarded-proto"] ?? "http";
  const host = request.headers["x-forwarded-host"] ?? request.headers.host;
  return {
    origin: `${protocol}://${host}`,
    timeZone: String(request.headers["x-time-zone"] ?? "UTC"),
  };
}
