import { type Context, Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import type { ContentfulStatusCode } from "hono/utils/http-status";
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

export async function callerOf(context: Context): Promise<Caller> {
  return {
    user: await readSession(
      context.req.header("authorization")?.replace(/^Bearer /, ""),
    ),
    timeZone: context.req.header("x-time-zone") ?? "UTC",
    origin: originOf(context),
  };
}

function signedIn(caller: Caller): User {
  if (caller.user === null) {
    throw new Refusal("Sign in again to carry on.", 401);
  }
  return caller.user;
}

const text = (value: unknown) => (typeof value === "string" ? value : "");

// The most a request may send: a photo straight from a phone's camera, or
// a story's JSON. Over it, the answer is a refusal.
const tooLarge = (context: Context) =>
  context.json({ error: "That's too large to send." }, 413);
const json = bodyLimit({ maxSize: 64 * 1024, onError: tooLarge });
const upload = bodyLimit({ maxSize: 30 * 1024 * 1024, onError: tooLarge });

// A route's handler, given the request's JSON, or for an upload its bytes,
// and the caller; answered as JSON, or a refusal the person can act on as
// `{ error }` with its status.
function handle(
  handler: (body: Record<string, unknown>, caller: Caller) => Promise<object>,
) {
  return async (context: Context) => {
    const body = JSON.parse((await context.req.text()) || "{}");
    return answered(context, async () =>
      handler(body, await callerOf(context)),
    );
  };
}

function handleUpload(
  handler: (bytes: Buffer, caller: Caller) => Promise<object>,
) {
  return async (context: Context) => {
    const bytes = Buffer.from(await context.req.arrayBuffer());
    return answered(context, async () =>
      handler(bytes, await callerOf(context)),
    );
  };
}

async function answered(context: Context, handle: () => Promise<object>) {
  try {
    return context.json(await handle());
  } catch (error) {
    if (!(error instanceof Refusal)) throw error;
    return context.json(
      { error: error.message },
      error.status as ContentfulStatusCode,
    );
  }
}

/** What scripts post to, under `/api`: mounted by the server's app. */
export const api = new Hono().basePath("/api");

api.post(
  "/auth/signin",
  json,
  handle(async (body) => {
    const user = await signInWithPassword(
      text(body.email),
      text(body.password),
    );
    return { session: await issueSession(user) };
  }),
);

api.post(
  "/auth/signup",
  json,
  handle(async (body) => {
    const user = await signUp(text(body.email), text(body.password));
    return { session: await issueSession(user) };
  }),
);

api.post(
  "/auth/idp",
  json,
  handle(async (body) => {
    const provider = text(body.provider);
    if (!["google.com", "apple.com", "facebook.com"].includes(provider)) {
      throw new AuthError("That way of signing in isn't on yet.");
    }
    const token: IdpToken = { provider: provider as IdpToken["provider"] };
    for (const key of ["idToken", "accessToken", "nonce"] as const) {
      if (typeof body[key] === "string") token[key] = body[key];
    }
    return { session: await issueSession(await signInWithIdp(token)) };
  }),
);

api.post(
  "/auth/reset",
  json,
  handle(async (body) => {
    await sendPasswordReset(text(body.email));
    return {};
  }),
);

api.post(
  "/stories",
  json,
  handle(async (body, caller) => {
    const user = signedIn(caller);
    const story = checkStory(body, caller.timeZone);
    return { id: await addStory(user.uid, story, caller.timeZone) };
  }),
);

api.post(
  "/stories/update",
  json,
  handle(async (body, caller) => {
    const user = signedIn(caller);
    const story = checkStory(body, caller.timeZone);
    await updateStory(user.uid, text(body.id), story, caller.timeZone);
    return {};
  }),
);

api.post(
  "/stories/favorite",
  json,
  handle(async (body, caller) => {
    const user = signedIn(caller);
    await setFavorite(user.uid, text(body.id), body.favorite === true);
    return {};
  }),
);

api.post(
  "/stories/delete",
  json,
  handle(async (body, caller) => {
    const user = signedIn(caller);
    await deleteStory(user.uid, text(body.id));
    return {};
  }),
);

api.post(
  "/preferences",
  json,
  handle(async (body, caller) => {
    const user = signedIn(caller);
    await setTheme(user.uid, body.theme === "dark" ? "dark" : "light");
    return {};
  }),
);

api.post(
  "/feedback",
  json,
  handle(async (body, caller) => {
    const user = signedIn(caller);
    await addFeedback(user.uid, text(body.value));
    return {};
  }),
);

api.post(
  "/account/delete",
  json,
  handle(async (_, caller) => {
    await deleteAccount(signedIn(caller));
    return {};
  }),
);

// Where the phone's browser downloads the backup: a link good for a few
// minutes, rather than the session in a URL.
api.post(
  "/backup",
  json,
  handle(async (_, caller) => {
    const user = signedIn(caller);
    const token = await issueBackupToken(user.uid, caller.timeZone);
    return { url: `${caller.origin}/backup.pdf?token=${token}` };
  }),
);

// A photo uploaded, then taken off the story before it was saved: deleted,
// unless a saved story has it.
api.post(
  "/photos/discard",
  json,
  handle(async (body, caller) => {
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
  }),
);

// A story's photo, as soon as it's picked: stored, and answered with its
// id, which the story then names, and links for the phone to show it by.
api.post(
  "/photos",
  upload,
  handleUpload(async (bytes, caller) => {
    const user = signedIn(caller);
    const photo = await storePhoto(user.uid, bytes);
    return {
      id: photo.id,
      small: storageLink(photo.urls.small, caller.origin),
      large: storageLink(photo.urls.large, caller.origin),
    };
  }),
);
