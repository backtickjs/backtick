import type { Session } from "@supabase/supabase-js";
import { Dimensions } from "react-native";
import { captureScreen } from "react-native-view-shot";
import { supabase } from "./supabase";

// An app's preview, for its card on the home: the screen as it is, captured
// a moment after the app opens, at half its width, and kept in the user's
// own folder (private: it can show what they typed). The next open replaces
// it, so it follows the app's versions.
export async function savePreview(
  app: string,
  session: Session,
): Promise<void> {
  const { width, height } = Dimensions.get("window");
  const base64 = await captureScreen({
    format: "jpg",
    quality: 0.8,
    width: 540,
    height: Math.round((540 * height) / width),
    result: "base64",
  });
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  const { error } = await supabase.storage
    .from("previews")
    .upload(`${session.user.id}/${app}.jpg`, bytes, {
      contentType: "image/jpeg",
      upsert: true,
    });
  if (error) {
    throw error;
  }
}
