import { FieldValue } from "firebase-admin/firestore";
import type { User } from "./auth/session.js";
import { auth, bucket, firestore } from "./firebase.js";
import { Refusal } from "./refusal.js";
import type { Theme } from "./ui/theme.js";

/** Keeps `uid`'s colour theme, where the website keeps it too. */
export async function setTheme(uid: string, theme: Theme): Promise<void> {
  await firestore.doc(`preferences/${uid}`).set({ colorTheme: theme });
}

/** Feedback from `uid`, as the website writes it. */
export async function addFeedback(uid: string, value: string): Promise<void> {
  if (value.trim() === "") {
    throw new Refusal("Write something first.");
  }
  if (value.length > 5000) {
    throw new Refusal("That's longer than feedback can be.");
  }
  await firestore.collection("feedback").add({
    value,
    author: uid,
    createdAt: FieldValue.serverTimestamp(),
  });
}

// How long after signing in deleting the account is offered, as on the
// website: past it, the person signs in again first.
const RECENT = 3 * 60 * 1000;

export function signedInRecently(user: User, now = Date.now()): boolean {
  return now - user.signedInAt < RECENT;
}

// Deletes every document `query` finds, a batch at a time.
async function deleteAll(query: FirebaseFirestore.Query): Promise<void> {
  for (;;) {
    const snapshot = await query.limit(400).get();
    if (snapshot.empty) return;
    const batch = firestore.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
  }
}

/**
 * Deletes `user`'s account and everything of theirs, each step done before
 * the next: their photos, stories, feedback and preferences, then the
 * account, last, so a failure part way leaves them able to sign in and try
 * again. Refused unless they signed in within the last few minutes.
 */
export async function deleteAccount(user: User): Promise<void> {
  if (!signedInRecently(user)) {
    throw new Refusal("Sign in again, then delete your account.", 403);
  }
  await bucket.deleteFiles({ prefix: `story_photos/${user.uid}/` });
  await deleteAll(
    firestore.collection("stories").where("author", "==", user.uid),
  );
  await deleteAll(
    firestore.collection("feedback").where("author", "==", user.uid),
  );
  await firestore.doc(`preferences/${user.uid}`).delete();
  await auth.deleteUser(user.uid);
}
