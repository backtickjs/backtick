// Renews the client secret Supabase signs in with Apple with: an ES256 token
// from the Sign in with Apple key, which Apple lets last 6 months at most.
// Run monthly (.github/workflows/apple-secret.yml), each new one good for 6
// months, so five failed runs in a row still leave sign-in working.
//   APPLE_SIGN_IN_KEY      the key's .p8, as text
//   SUPABASE_ACCESS_TOKEN  a Supabase access token for the project's settings
import { createPrivateKey, sign } from "node:crypto";

const team = "BM4485734W";
const keyId = "4H69MTWHA9";
const servicesId = "com.backtickjs.app.signin";
const project = "evgfuotcvraqxvdtutso";
const lifetime = 180 * 86_400;

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set.`);
  }
  return value;
}

const key = createPrivateKey(required("APPLE_SIGN_IN_KEY"));
const now = Math.floor(Date.now() / 1000);
const part = (value: object) =>
  Buffer.from(JSON.stringify(value)).toString("base64url");
const input = `${part({ alg: "ES256", kid: keyId })}.${part({
  iss: team,
  iat: now,
  exp: now + lifetime,
  aud: "https://appleid.apple.com",
  sub: servicesId,
})}`;
const secret = `${input}.${sign("sha256", Buffer.from(input), {
  key,
  dsaEncoding: "ieee-p1363",
}).toString("base64url")}`;

// Apple says whether it takes the secret: a made-up code with a good secret
// is `invalid_grant`, with a bad one `invalid_client`.
const apple = await fetch("https://appleid.apple.com/auth/token", {
  method: "POST",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    client_id: servicesId,
    client_secret: secret,
    grant_type: "authorization_code",
    code: "not-a-code",
  }),
});
const { error } = (await apple.json()) as { error?: string };
if (error !== "invalid_grant") {
  throw new Error(`Apple refused the new secret: ${error ?? apple.status}.`);
}

const settings = `https://api.supabase.com/v1/projects/${project}/config/auth`;
const answer = await fetch(settings, {
  method: "PATCH",
  headers: {
    authorization: `Bearer ${required("SUPABASE_ACCESS_TOKEN")}`,
    "content-type": "application/json",
  },
  body: JSON.stringify({ external_apple_secret: secret }),
});
if (!answer.ok) {
  throw new Error(
    `Supabase refused the new secret: ${answer.status} ${await answer.text()}`,
  );
}
const expires = new Date((now + lifetime) * 1000).toISOString().slice(0, 10);
console.log(`Apple's client secret renewed, good until ${expires}.`);
