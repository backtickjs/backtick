import assert from "node:assert/strict";
import type { IncomingMessage } from "node:http";
import { Readable } from "node:stream";
import { it } from "node:test";
import { answer, type Caller } from "./api.js";
import { readSession } from "./auth/session.js";
import { account, asked } from "./test/fetch.js";

const caller: Caller = {
  user: null,
  timeZone: "America/New_York",
  origin: "http://localhost:3000",
};

async function post(path: string, body: object) {
  const answered = await answer(
    path,
    Readable.from([JSON.stringify(body)]) as unknown as IncomingMessage,
    caller,
  );
  return answered!;
}

it("signs in with Firebase, and answers a session naming the user", async () => {
  const { status, body } = await post("/api/auth/signin", account);
  assert.equal(status, 200);
  const user = await readSession((body as { session: string }).session);
  assert.equal(user?.uid, account.uid);
  assert.equal(user?.email, account.email);
});

it("says a wrong password in words", async () => {
  const { status, body } = await post("/api/auth/signin", {
    email: account.email,
    password: "wrong",
  });
  assert.equal(status, 400);
  assert.deepEqual(body, { error: "Wrong email or password." });
});

it("signs up a new email, and refuses one in use", async () => {
  const created = await post("/api/auth/signup", {
    email: "grace@example.com",
    password: "secret123",
  });
  assert.equal(created.status, 200);
  const taken = await post("/api/auth/signup", account);
  assert.deepEqual(taken.body, {
    error: "An account already uses this email.",
  });
});

it("signs in with a Google token, through Firebase", async () => {
  const { body } = await post("/api/auth/idp", {
    provider: "google.com",
    idToken: "google:grace@example.com",
  });
  const user = await readSession((body as { session: string }).session);
  assert.deepEqual(
    { uid: user?.uid, email: user?.email },
    { uid: "uid-google", email: "grace@example.com" },
  );
  assert.equal(
    asked[0]?.body.postBody,
    "providerId=google.com&id_token=google%3Agrace%40example.com",
  );
});

it("refuses a provider for an email that signs in another way", async () => {
  const { status, body } = await post("/api/auth/idp", {
    provider: "google.com",
    idToken: `google:${account.email}`,
  });
  assert.equal(status, 400);
  assert.deepEqual(body, {
    error: "This email already signs in another way. Sign in with that.",
  });
});

it("refuses a provider it doesn't know", async () => {
  const { status } = await post("/api/auth/idp", { provider: "github.com" });
  assert.equal(status, 400);
});

it("writes stories only for someone signed in", async () => {
  const { status } = await post("/api/stories", { text: "Hello" });
  assert.equal(status, 401);
});

it("asks Firebase to email a password reset", async () => {
  await post("/api/auth/reset", { email: account.email });
  assert.deepEqual(asked, [
    {
      method: "sendOobCode",
      body: { requestType: "PASSWORD_RESET", email: account.email },
    },
  ]);
});

it("refuses a session it didn't sign", async () => {
  assert.equal(await readSession("not-a-session"), null);
});
