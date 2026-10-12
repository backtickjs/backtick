import type { IncomingMessage } from "node:http";
import { readSession, type User } from "./auth/session.js";

/** What a screen knows of the request it's drawn for. */
export type ScreenRequest = {
  // where the app reached this server, for the files a screen links to and
  // the API its scripts call
  origin: string;
  // the phone's, which dates are written in
  timeZone: string;
  // who's signed in, if anyone, and the session that says so, which the
  // screen's scripts send back
  user: User | null;
  session: string | null;
};

export async function screenRequest(
  request: IncomingMessage,
): Promise<ScreenRequest> {
  // Behind a proxy, as on Cloud Run, the address the phone used is forwarded.
  const protocol = request.headers["x-forwarded-proto"] ?? "http";
  const host = request.headers["x-forwarded-host"] ?? request.headers.host;
  const session = request.headers.authorization?.replace(/^Bearer /, "");
  return {
    origin: `${protocol}://${host}`,
    timeZone: String(request.headers["x-time-zone"] ?? "UTC"),
    user: await readSession(session),
    session: session ?? null,
  };
}
