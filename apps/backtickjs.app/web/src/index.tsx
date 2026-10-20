// backtickjs.app's pages as HTML, for the function to serve. Each is the same
// for every visitor, so it's bundled once per instance.
import { cs } from "@backtickjs/core";
import { Consent } from "./Consent.tsx";
import { toHtml } from "./document.ts";
import { Home } from "./Home.tsx";
import { Privacy } from "./Privacy.tsx";

export const homePage = once(() => toHtml("Backtick", Home));

export const privacyPage = once(() =>
  toHtml("Backtick · Privacy policy", Privacy),
);

// Its Supabase URL and publishable key are public: Supabase's browser client
// signs the user in with them.
export const consentPage = once(() => {
  const url = process.env.SUPABASE_URL!;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return toHtml(
    "Connect to Backtick",
    cs`() => <$Consent url={${url}} publishableKey={${publishableKey}} />`,
  );
});

function once(make: () => Promise<string>): () => Promise<string> {
  let page: Promise<string> | undefined;
  return () => (page ??= make());
}
