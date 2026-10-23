import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";
import * as Crypto from "expo-crypto";
import * as WebBrowser from "expo-web-browser";
import { shellURL } from "../server/links";
import { sessionStorage } from "./sessionStorage";

// Public values, from app.json: Supabase's browser client signs in with them.
const extra = Constants.expoConfig?.extra as {
  home: string;
  apps: string;
  supabaseUrl: string;
  supabasePublishableKey: string;
};

// Where screens come from: Backtick's home at `home`, each app at
// <id>.`apps`, as a Vercel project is at <name>.vercel.app.
export const home = extra.home;
export const apps = extra.apps;

// Hermes has no WebCrypto, and without it Supabase's PKCE falls back to the
// `plain` method: expo-crypto's random values and SHA-256 make it S256.
const webCrypto = (globalThis.crypto ??= {} as Crypto);
webCrypto.getRandomValues ??=
  Crypto.getRandomValues as Crypto["getRandomValues"];
(webCrypto as { subtle?: Partial<SubtleCrypto> }).subtle ??= {
  digest: (_algorithm: AlgorithmIdentifier, data: BufferSource) =>
    Crypto.digest(Crypto.CryptoDigestAlgorithm.SHA256, data),
};

// The session stays on the phone, sealed, refreshed while the app is open.
export const supabase = createClient(
  extra.supabaseUrl,
  extra.supabasePublishableKey,
  {
    auth: {
      storage: sessionStorage,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      flowType: "pkce",
    },
  },
);

// Where Google's sign-in comes back: the shell's own link (server/links.ts),
// which the browser session below catches and hands back. A code caught
// elsewhere is useless without this phone's PKCE verifier.
const redirectTo = shellURL("auth/callback");

// Google's sign-in in the system browser, then the code it brings back traded
// for a session. Resolves without one if the user closed the browser.
export async function signInWithGoogle(): Promise<void> {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo, skipBrowserRedirect: true },
  });
  if (error) {
    throw error;
  }
  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  if (result.type !== "success") {
    return;
  }
  const code = new URL(result.url).searchParams.get("code");
  if (code === null) {
    throw new Error("Google's sign-in came back without a code.");
  }
  const session = await supabase.auth.exchangeCodeForSession(code);
  if (session.error) {
    throw session.error;
  }
}
