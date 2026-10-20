// A signed-in token for scripts, as the test user. Users sign in with Google
// only; the test user is signed in with a one-time link Supabase's admin API
// makes, which only the service role's key can ask for.
import { createClient } from "@supabase/supabase-js";

const email = "test@backtickjs.app";
const options = { auth: { persistSession: false } };
const url = process.env.SUPABASE_URL!;

export async function testUserToken(): Promise<string> {
  const admin = createClient(
    url,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    options,
  );
  // The first time, asking for the link makes the user.
  const link = await admin.auth.admin.generateLink({
    type: "magiclink",
    email,
  });
  if (link.error) {
    throw new Error(`A sign-in link for ${email}: ${link.error.message}`);
  }
  const user = createClient(
    url,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    options,
  );
  const { data, error } = await user.auth.verifyOtp({
    type: "magiclink",
    token_hash: link.data.properties.hashed_token,
  });
  if (error || data.session === null) {
    throw new Error(`Signing in ${email}: ${error?.message ?? "no session"}`);
  }
  return data.session.access_token;
}
