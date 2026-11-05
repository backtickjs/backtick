// The stores' and the directory's reviewers' account, as auth.backtickjs.com
// has it: a random address and a fixed six-digit code, both secret, set only
// while a review is in progress. The consent page tries an emailed code
// first, then this.
import { createHash, timingSafeEqual } from "node:crypto";
import { failed, supabase } from "./supabase.ts";

// A one-time sign-in for the review account, which the consent page redeems
// with Supabase, or nothing if `email` and `code` aren't its.
export async function reviewSignIn(
  email: unknown,
  code: unknown,
): Promise<string | undefined> {
  const review = reviewAccount();
  if (
    review === undefined ||
    typeof email !== "string" ||
    typeof code !== "string" ||
    !sameText(email.trim().toLowerCase(), review.email) ||
    !sameText(code.replace(/\s/g, ""), review.code)
  ) {
    return undefined;
  }
  // A magic link's token, never emailed: the page verifies it at once.
  const { data, error } = await supabase.auth.admin.generateLink({
    type: "magiclink",
    email: review.email,
  });
  if (error) {
    throw failed(error);
  }
  return data.properties.hashed_token;
}

function reviewAccount(): { email: string; code: string } | undefined {
  const email = process.env.BACKTICK_REVIEW_EMAIL?.trim().toLowerCase();
  const code = process.env.BACKTICK_REVIEW_CODE?.trim();
  return email && code && /^\d{6}$/.test(code) ? { email, code } : undefined;
}

function sameText(a: string, b: string): boolean {
  const hash = (text: string) => createHash("sha256").update(text).digest();
  return timingSafeEqual(hash(a), hash(b));
}
