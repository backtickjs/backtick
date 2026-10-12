import { jwtVerify, SignJWT } from "jose";

// The session a sign-in gives the phone, which it sends with every request:
// the user, signed by this server. Firebase checked the credential once, at
// sign-in; from then on the server acts for that uid.
export type User = {
  uid: string;
  email: string;
  // when they last proved who they are, which deleting the account asks to be
  // recent
  signedInAt: number;
};

const development = process.env.NODE_ENV === "development";
const secret = process.env.SESSION_SECRET ?? (development ? "development" : "");
if (secret === "") {
  throw new Error("Set SESSION_SECRET: the key sessions are signed with.");
}
const key = new TextEncoder().encode(secret);

export function issueSession(user: Omit<User, "signedInAt">): Promise<string> {
  return new SignJWT({ email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.uid)
    .setIssuedAt()
    .sign(key);
}

/** The user a session names, or null for none, or one this server didn't sign. */
export async function readSession(
  token: string | undefined,
): Promise<User | null> {
  if (token === undefined) {
    return null;
  }
  try {
    const { payload } = await jwtVerify<{ email: string }>(token, key, {
      algorithms: ["HS256"],
    });
    return {
      uid: payload.sub!,
      email: payload.email,
      signedInAt: payload.iat! * 1000,
    };
  } catch {
    return null;
  }
}
