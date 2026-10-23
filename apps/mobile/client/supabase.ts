import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

// Public values, from app.json: Supabase's browser client signs in with them.
const extra = Constants.expoConfig?.extra as {
  server: string;
  supabaseUrl: string;
  supabasePublishableKey: string;
};

export const server = extra.server;

// The session stays on the phone, refreshed while the app is open.
export const supabase = createClient(
  extra.supabaseUrl,
  extra.supabasePublishableKey,
  {
    auth: {
      storage: AsyncStorage,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      flowType: "pkce",
    },
  },
);

// Google's sign-in in the system browser, back into the app by its link, then
// the code it brings traded for a session.
export async function signInWithGoogle(): Promise<void> {
  const redirectTo = Linking.createURL("auth");
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
  const code = Linking.parse(result.url).queryParams?.code;
  if (typeof code !== "string") {
    throw new Error("Google's sign-in came back without a code.");
  }
  const exchanged = await supabase.auth.exchangeCodeForSession(code);
  if (exchanged.error) {
    throw exchanged.error;
  }
}
