import { afterEach, beforeEach } from "node:test";
import { api } from "../api.js";
import { request } from "./request.js";

// The network as tests see it. Firebase Auth's REST API answers for one
// account, and records what each call was asked; the app's server, at the
// test request's origin, is its API, run in this process.
export const account = {
  uid: "uid-1",
  email: "ada@example.com",
  password: "correct horse",
};

export const asked: { method: string; body: Record<string, unknown> }[] = [];

const real = globalThis.fetch;

function reply(status: number, body: object): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function refuse(code: string): Response {
  return reply(400, { error: { code: 400, message: code } });
}

beforeEach(() => {
  asked.length = 0;
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (url.startsWith(request.origin)) {
      return api.request(url, init);
    }
    const method = /accounts:(\w+)/.exec(url)?.[1];
    if (!url.includes("identitytoolkit") || method === undefined) {
      return real(input, init);
    }
    const body = JSON.parse(String(init?.body));
    asked.push({ method, body });
    const known = body.email === account.email;
    switch (method) {
      case "signInWithPassword":
        return known && body.password === account.password
          ? reply(200, { localId: account.uid, email: account.email })
          : refuse("INVALID_LOGIN_CREDENTIALS");
      case "signUp":
        return known
          ? refuse("EMAIL_EXISTS")
          : reply(200, { localId: "uid-new", email: body.email });
      case "signInWithIdp": {
        // a Google ID token "google:<email>", for an account of its own, or
        // one whose email already signs in with a password
        const credential = new URLSearchParams(body.postBody);
        const email = credential.get("id_token")?.split(":")[1];
        if (credential.get("providerId") !== "google.com" || !email) {
          return refuse("INVALID_IDP_RESPONSE");
        }
        return email === account.email
          ? reply(200, { localId: "uid-other", email, needConfirmation: true })
          : reply(200, { localId: "uid-google", email });
      }
      case "sendOobCode":
        return body.email === "" ? refuse("MISSING_EMAIL") : reply(200, {});
    }
    return refuse("UNKNOWN");
  };
});

afterEach(() => {
  globalThis.fetch = real;
});
