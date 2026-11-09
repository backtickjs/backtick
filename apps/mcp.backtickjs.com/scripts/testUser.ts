// A signed-in token for scripts, as the test user, and its user id. The test
// user signs in with a one-time code Supabase's admin API makes, sending no
// email, which only the service role's key can ask for.
import { createClient } from "@supabase/supabase-js";

const email = "test@backtickjs.app";
const options = { auth: { persistSession: false } };
const url = process.env.SUPABASE_URL!;

export async function testUser(): Promise<{ token: string; id: string }> {
  const admin = createClient(
    url,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    options,
  );
  // The first time, asking makes the user, and the code is a sign-up's.
  const link = await admin.auth.admin.generateLink({
    type: "magiclink",
    email,
  });
  if (link.error) {
    throw new Error(`A sign-in code for ${email}: ${link.error.message}`);
  }
  const user = createClient(
    url,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    options,
  );
  // As auth.backtickjs.com checks a code: "email" takes a sign-up's or a
  // sign-in's.
  const { data, error } = await user.auth.verifyOtp({
    type: "email",
    email,
    token: link.data.properties.email_otp,
  });
  if (error || data.session === null) {
    throw new Error(`Signing in ${email}: ${error?.message ?? "no session"}`);
  }
  return { token: data.session.access_token, id: data.session.user.id };
}
