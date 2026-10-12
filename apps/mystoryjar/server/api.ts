import type { IncomingMessage } from "node:http";
import {
  AuthError,
  type IdpToken,
  sendPasswordReset,
  signInWithIdp,
  signInWithPassword,
  signUp,
} from "./auth/firebaseAuth.js";
import { issueSession } from "./auth/session.js";

// What scripts post to, by path: each takes the request's JSON and answers
// JSON. A refusal the person can act on is `{ error }`, with status 400.
type Handler = (body: Record<string, unknown>) => Promise<object>;

const text = (value: unknown) => (typeof value === "string" ? value : "");

export const api: Record<string, Handler> = {
  "/api/auth/signin": async (body) => {
    const user = await signInWithPassword(
      text(body.email),
      text(body.password),
    );
    return { session: await issueSession(user) };
  },
  "/api/auth/signup": async (body) => {
    const user = await signUp(text(body.email), text(body.password));
    return { session: await issueSession(user) };
  },
  "/api/auth/idp": async (body) => {
    const provider = text(body.provider);
    if (!["google.com", "apple.com", "facebook.com"].includes(provider)) {
      throw new AuthError("That way of signing in isn't on yet.");
    }
    const token: IdpToken = { provider: provider as IdpToken["provider"] };
    for (const key of ["idToken", "accessToken", "nonce"] as const) {
      if (typeof body[key] === "string") token[key] = body[key];
    }
    return { session: await issueSession(await signInWithIdp(token)) };
  },
  "/api/auth/reset": async (body) => {
    await sendPasswordReset(text(body.email));
    return {};
  },
};

/** Runs `handler` on the request's JSON: its answer, and its status. */
export async function answer(
  handler: Handler,
  request: IncomingMessage,
): Promise<{ status: number; body: object }> {
  let raw = "";
  for await (const chunk of request) {
    raw += chunk;
  }
  try {
    return { status: 200, body: await handler(JSON.parse(raw || "{}")) };
  } catch (error) {
    if (error instanceof AuthError) {
      return { status: 400, body: { error: error.message } };
    }
    throw error;
  }
}
