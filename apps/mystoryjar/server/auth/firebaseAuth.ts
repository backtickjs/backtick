import { Refusal } from "../refusal.js";

// Firebase Auth's REST API, the one its web SDK calls: the same accounts, so
// a user signs in to the app as they do to the website, and keeps their uid.
// The project's API key is public, as Firebase's are: it names the project,
// and the website ships it too.
const API_KEY = "AIzaSyBaw20ov_TQXu7M67bjO1vebOO7UH5xe6I";

// `FIREBASE_AUTH_EMULATOR_HOST`, as Firebase's own SDKs read it, points tests
// at the Auth emulator.
const emulator = process.env.FIREBASE_AUTH_EMULATOR_HOST;
const base = emulator
  ? `http://${emulator}/identitytoolkit.googleapis.com/v1`
  : "https://identitytoolkit.googleapis.com/v1";

/** Why Firebase refused, in words for the person signing in. */
export class AuthError extends Refusal {}

// Firebase's codes, some followed by " : " and a detail.
const messages: Record<string, string> = {
  EMAIL_NOT_FOUND: "Wrong email or password.",
  INVALID_PASSWORD: "Wrong email or password.",
  INVALID_LOGIN_CREDENTIALS: "Wrong email or password.",
  EMAIL_EXISTS: "An account already uses this email.",
  INVALID_EMAIL: "That email doesn't look right.",
  MISSING_EMAIL: "Enter your email first.",
  WEAK_PASSWORD: "Passwords need at least 6 characters.",
  TOO_MANY_ATTEMPTS_TRY_LATER: "Too many attempts. Try again later.",
  USER_DISABLED: "This account is disabled.",
  INVALID_IDP_RESPONSE: "That sign-in didn't work. Try again.",
  OPERATION_NOT_ALLOWED: "That way of signing in isn't on yet.",
};

async function call<T>(method: string, body: object): Promise<T> {
  const response = await fetch(`${base}/accounts:${method}?key=${API_KEY}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await response.json();
  if (!response.ok) {
    const code = String(json?.error?.message ?? "").split(" ")[0]!;
    throw new AuthError(messages[code] ?? "Something went wrong.");
  }
  return json as T;
}

type Account = { localId: string; email: string };

export async function signInWithPassword(email: string, password: string) {
  const { localId, email: stored } = await call<Account>("signInWithPassword", {
    email,
    password,
    returnSecureToken: true,
  });
  return { uid: localId, email: stored };
}

export async function signUp(email: string, password: string) {
  const { localId, email: stored } = await call<Account>("signUp", {
    email,
    password,
    returnSecureToken: true,
  });
  return { uid: localId, email: stored };
}

export async function sendPasswordReset(email: string): Promise<void> {
  await call("sendOobCode", { requestType: "PASSWORD_RESET", email });
}

/** A token from Google, Apple or Facebook, as their SDKs give it on a phone. */
export type IdpToken = {
  provider: "google.com" | "apple.com" | "facebook.com";
  // an OpenID token: Google's and Apple's, and Facebook's Limited Login's
  idToken?: string;
  // Facebook's classic login gives an access token instead
  accessToken?: string;
  // the nonce the token was asked for with, before hashing, for Apple and
  // Limited Login
  nonce?: string;
};

type IdpAccount = Account & { needConfirmation?: boolean };

/**
 * Signs in with a provider's token: the account that provider's user has, or
 * a new one. An email that already signs in another way is refused, as the
 * website refuses it.
 */
export async function signInWithIdp(token: IdpToken) {
  const credential = new URLSearchParams({ providerId: token.provider });
  if (token.idToken !== undefined) credential.set("id_token", token.idToken);
  if (token.accessToken !== undefined) {
    credential.set("access_token", token.accessToken);
  }
  if (token.nonce !== undefined) credential.set("nonce", token.nonce);
  const account = await call<IdpAccount>("signInWithIdp", {
    postBody: credential.toString(),
    requestUri: "http://localhost",
    returnSecureToken: true,
    returnIdpCredential: true,
  });
  if (account.needConfirmation) {
    throw new AuthError(
      "This email already signs in another way. Sign in with that.",
    );
  }
  return { uid: account.localId, email: account.email ?? "" };
}
