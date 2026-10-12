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
export class AuthError extends Error {}

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
