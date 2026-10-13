import type { IncomingMessage } from "node:http";
import {
  AuthError,
  type IdpToken,
  sendPasswordReset,
  signInWithIdp,
  signInWithPassword,
  signUp,
} from "./auth/firebaseAuth.js";
import { addFeedback, deleteAccount, setTheme } from "./account.js";
import {
  issueBackupToken,
  issueSession,
  readSession,
  type User,
} from "./auth/session.js";
import { storageLink } from "./firebase.js";
import { deletePhoto, storePhoto } from "./photos.js";
import { Refusal } from "./refusal.js";
import { originOf } from "./request.js";
import {
  addStory,
  checkStory,
  deleteStory,
  setFavorite,
  storiesOf,
  updateStory,
} from "./stories.js";

/** Who's asking: the session's user, the phone's time zone and address. */
export type Caller = { user: User | null; timeZone: string; origin: string };

export async function callerOf(request: IncomingMessage): Promise<Caller> {
  return {
    user: await readSession(
      request.headers.authorization?.replace(/^Bearer /, ""),
    ),
    timeZone: String(request.headers["x-time-zone"] ?? "UTC"),
    origin: originOf(request),
  };
}

function signedIn(caller: Caller): User {
  if (caller.user === null) {
    throw new Refusal("Sign in again to carry on.", 401);
  }
  return caller.user;
}

// What scripts post to, by path: each takes the request's JSON and answers
// JSON; an upload takes the request's bytes. A refusal the person can act on
// is `{ error }`, with its status.
type Handler = (
  body: Record<string, unknown>,
  caller: Caller,
) => Promise<object>;
type Upload = (bytes: Buffer, caller: Caller) => Promise<object>;

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
  "/api/stories": async (body, caller) => {
    const user = signedIn(caller);
    const story = checkStory(body, caller.timeZone);
    return { id: await addStory(user.uid, story, caller.timeZone) };
  },
  "/api/stories/update": async (body, caller) => {
    const user = signedIn(caller);
    const story = checkStory(body, caller.timeZone);
    await updateStory(user.uid, text(body.id), story, caller.timeZone);
    return {};
  },
  "/api/stories/favorite": async (body, caller) => {
    const user = signedIn(caller);
    await setFavorite(user.uid, text(body.id), body.favorite === true);
    return {};
  },
  "/api/stories/delete": async (body, caller) => {
    const user = signedIn(caller);
    await deleteStory(user.uid, text(body.id));
    return {};
  },
  "/api/preferences": async (body, caller) => {
    const user = signedIn(caller);
    await setTheme(user.uid, body.theme === "dark" ? "dark" : "light");
    return {};
  },
  "/api/feedback": async (body, caller) => {
    const user = signedIn(caller);
    await addFeedback(user.uid, text(body.value));
    return {};
  },
  "/api/account/delete": async (_, caller) => {
    await deleteAccount(signedIn(caller));
    return {};
  },
  // Where the phone's browser downloads the backup: a link good for a few
  // minutes, rather than the session in a URL.
  "/api/backup": async (_, caller) => {
    const user = signedIn(caller);
    const token = await issueBackupToken(user.uid, caller.timeZone);
    return { url: `${caller.origin}/backup.pdf?token=${token}` };
  },
  // A photo uploaded, then taken off the story before it was saved: deleted,
  // unless a saved story has it.
  "/api/photos/discard": async (body, caller) => {
    const user = signedIn(caller);
    const id = text(body.id);
    const stories = await storiesOf(user.uid, caller.timeZone, caller.origin);
    if (
      /^[0-9a-f-]{36}$/.test(id) &&
      !stories.some((story) => story.photo?.id === id)
    ) {
      await deletePhoto(user.uid, id);
    }
    return {};
  },
};

export const uploads: Record<string, Upload> = {
  // A story's photo, as soon as it's picked: stored, and answered with its
  // id, which the story then names, and links for the phone to show it by.
  "/api/photos": async (bytes, caller) => {
    const user = signedIn(caller);
    const photo = await storePhoto(user.uid, bytes);
    return {
      id: photo.id,
      small: storageLink(photo.urls.small, caller.origin),
      large: storageLink(photo.urls.large, caller.origin),
    };
  },
};

// The most a request may send: a photo straight from a phone's camera, or
// a story's JSON.
const MAX_UPLOAD = 30 * 1024 * 1024;
const MAX_JSON = 64 * 1024;

/**
 * Answers a POST to `path`, or undefined when no handler or upload takes it:
 * the answer's status and JSON.
 */
export async function answer(
  path: string,
  request: IncomingMessage,
  caller: Caller,
): Promise<{ status: number; body: object } | undefined> {
  const handler = api[path] as Handler | undefined;
  const upload = uploads[path] as Upload | undefined;
  if (handler === undefined && upload === undefined) {
    return undefined;
  }
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const piece of request) {
    const chunk = Buffer.from(piece);
    size += chunk.length;
    if (size > (upload ? MAX_UPLOAD : MAX_JSON)) {
      return { status: 413, body: { error: "That's too large to send." } };
    }
    chunks.push(chunk);
  }
  const bytes = Buffer.concat(chunks);
  try {
    const body = upload
      ? await upload(bytes, caller)
      : await handler!(JSON.parse(bytes.toString() || "{}"), caller);
    return { status: 200, body };
  } catch (error) {
    if (error instanceof Refusal) {
      return { status: error.status, body: { error: error.message } };
    }
    throw error;
  }
}
