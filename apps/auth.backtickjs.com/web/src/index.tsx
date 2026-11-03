// auth.backtickjs.com's page as HTML, for the function to serve: the same for
// every visitor, so it's bundled once per instance. Its Supabase URL and
// publishable key are public: Supabase's browser client signs the user in
// with them.
import { cs } from "@backtickjs/core";
import { SignIn } from "./SignIn.tsx";
import { toHtml } from "./document.ts";

export const signInPage = once(() => {
  const url = process.env.SUPABASE_URL!;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return toHtml(
    "Sign in to Backtick",
    cs`() => <$SignIn url={${url}} publishableKey={${publishableKey}} />`,
  );
});

function once(make: () => Promise<string>): () => Promise<string> {
  let page: Promise<string> | undefined;
  return () => (page ??= make());
}
