import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";
import * as Crypto from "expo-crypto";
import * as WebBrowser from "expo-web-browser";
import { sessionStorage } from "./sessionStorage";

// Public values, from app.json: Supabase's browser client signs in with them.
const extra = Constants.expoConfig?.extra as {
  server: string;
  screens: string;
  supabaseUrl: string;
  supabasePublishableKey: string;
};

export const server = extra.server;

// The host the phone's screens come from: Backtick's home at it, each app at
// <id>.<it>.
export const screens = extra.screens;

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

// Where Google's sign-in comes back: an App Link, so the phone's verified
// claim on backtickjs.app opens the app, not a scheme any app can register.
// If the browser shows the page instead, its button hands the code over by
// `backtick://auth/callback` (client/app/auth/callback.tsx), which PKCE keeps
// useless to anyone without this phone's verifier.
const redirectTo = `${server}/auth/callback`;

// Google's sign-in in the system browser, back into the app by its link, then
// the code it brings traded for a session. Resolves without one if the user
// closed the browser.
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
  await finishSignIn(new URL(result.url).searchParams.get("code"));
}

// The code Google's sign-in came back with, traded for a session.
export async function finishSignIn(code: string | null): Promise<void> {
  if (code === null) {
    throw new Error("Google's sign-in came back without a code.");
  }
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    throw error;
  }
}
