import Constants from "expo-constants";
import { buildId } from "./build";
import * as SecureStore from "./secureStore";

// In development, the server runs on the computer Expo was started from.
const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
const server: string = __DEV__
  ? `http://${host}:3000`
  : Constants.expoConfig?.extra?.serverUrl;

/**
 * `fetch` to the server, with the session a sign-in screen kept, the phone's
 * time zone (the server dates stories in it) and this build's id (the server
 * bundles screens for the modules it carries).
 */
export async function request(path: string): Promise<Response> {
  const headers = new Headers({
    "x-time-zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
    "x-build-id": buildId,
  });
  const session = await SecureStore.getItemAsync("session");
  if (session !== null) {
    headers.set("authorization", `Bearer ${session}`);
  }
  return fetch(`${server}${path}`, { headers });
}
