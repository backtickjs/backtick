import assert from "node:assert/strict";
import type { IncomingMessage } from "node:http";
import { Readable } from "node:stream";
import { it } from "node:test";
import { answer, api } from "./api.js";
import { readSession } from "./auth/session.js";
import { account, asked } from "./test/fetch.js";

const post = (path: string, body: object) =>
  answer(
    api[path]!,
    Readable.from([JSON.stringify(body)]) as unknown as IncomingMessage,
  );

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
