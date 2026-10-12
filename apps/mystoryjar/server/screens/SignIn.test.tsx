import assert from "node:assert/strict";
import { it } from "node:test";
import { CommonActions } from "@react-navigation/routers";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { readSession } from "../auth/session.js";
import { drawScreen, navigated, secureStore } from "../test/drawScreen.js";
import { account } from "../test/fetch.js";
import { request } from "../test/request.js";
import { SignIn } from "./SignIn.js";

async function signIn(email: string, password: string) {
  render(await drawScreen(<SignIn request={request} />));
  await userEvent.type(screen.getByPlaceholderText("email"), email);
  await userEvent.type(screen.getByPlaceholderText("password"), password);
  await userEvent.click(screen.getByRole("button", { name: "Sign in" }));
}

it("keeps the session, and starts over signed in", async () => {
  await signIn(account.email, account.password);
  await waitFor(() =>
    assert.deepEqual(navigated, [
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Screen", params: { path: "/" } }],
      }),
    ]),
  );
  const user = await readSession(secureStore.get("session"));
  assert.equal(user?.uid, account.uid);
});

it("shows why it couldn't, in place of the logo", async () => {
  await signIn(account.email, "wrong password");
  assert.ok(await screen.findByText("Wrong email or password."));
  assert.equal(secureStore.size, 0);
});

it("waits for four characters of each", async () => {
  render(await drawScreen(<SignIn request={request} />));
  await userEvent.type(screen.getByPlaceholderText("email"), "a@b");
  await userEvent.type(screen.getByPlaceholderText("password"), "1234");
  assert.equal(
    screen
      .getByRole("button", { name: "Sign in" })
      .getAttribute("aria-disabled"),
    "true",
  );
});

it("emails a password reset", async () => {
  render(await drawScreen(<SignIn request={request} />));
  await userEvent.type(screen.getByPlaceholderText("email"), account.email);
  await userEvent.click(screen.getByText("Forgot Password?"));
  assert.ok(await screen.findByText("Success. Check your inbox"));
});
