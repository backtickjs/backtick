import { firestore } from "./firebase.js";
import type { Theme } from "./ui/theme.js";

/** The colour theme `uid` chose on the website or in the app: light unless dark. */
export async function themeOf(uid: string): Promise<Theme> {
  const preferences = await firestore.doc(`preferences/${uid}`).get();
  return preferences.get("colorTheme") === "dark" ? "dark" : "light";
}
