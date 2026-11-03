import { Dimensions } from "react-native";
import { captureScreen } from "react-native-view-shot";
import { home } from "./hosts";

// An app's preview, for its card on the home: the screen as it is, captured
// a moment after the app opens, at half its width, and kept by the home's
// server in the user's own folder (private: it can show what they typed). The
// next open replaces it, so it follows the app's versions.
export async function savePreview(app: string): Promise<void> {
  const { width, height } = Dimensions.get("window");
  const base64 = await captureScreen({
    format: "jpg",
    quality: 0.8,
    width: 540,
    height: Math.round((540 * height) / width),
    result: "base64",
  });
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  const answer = await fetch(`https://${home}/apps/${app}/preview`, {
    method: "POST",
    headers: { "content-type": "image/jpeg" },
    body: bytes,
  });
  if (!answer.ok) {
    throw new Error(`The home answered ${answer.status}.`);
  }
}
