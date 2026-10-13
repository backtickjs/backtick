import assert from "node:assert/strict";
import { it } from "node:test";
import { CommonActions, StackActions } from "@react-navigation/routers";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signedInRecently } from "../account.js";
import { drawScreen, navigated, secureStore } from "../test/drawScreen.js";
import { request } from "../test/request.js";
import { answer, sent } from "../test/server.js";
import { Account } from "./Account.js";
import { Feedback } from "./Feedback.js";
import { Write } from "./Write.js";

const user = (signedInAt: number) => ({
  ...request,
  user: { uid: "tester", email: "tester@mystoryjar.com", signedInAt },
});

it("counts a sign-in as recent for three minutes", () => {
  const now = Date.parse("2026-10-12T12:00:00Z");
  const at = (minutesAgo: number) => ({
    uid: "u",
    email: "e",
    signedInAt: now - minutesAgo * 60_000,
  });
  assert.equal(signedInRecently(at(2), now), true);
  assert.equal(signedInRecently(at(4), now), false);
});

it("asks to sign in again before deleting, past a few minutes", async () => {
  render(await drawScreen(<Account request={user(0)} />));
  assert.ok(
    screen.getByText(
      "In order to delete your account, please reauthenticate first.",
    ),
  );
  await userEvent.click(screen.getByRole("button", { name: "Reauthenticate" }));
  await waitFor(() =>
    assert.deepEqual(navigated, [
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Screen", params: { path: "/signin" } }],
      }),
    ]),
  );
});

it("deletes the account once Delete unblocks, and starts over", async () => {
  secureStore.set("session", "s");
  render(await drawScreen(<Account request={user(Date.now())} />));
  await userEvent.click(screen.getByRole("button", { name: "Delete Account" }));
  const blocked = screen.getByRole("button", {
    name: "Delete blocked for 10s",
  });
  assert.equal(blocked.getAttribute("aria-disabled"), "true");
  // ten seconds, a second at a time
  for (let second = 0; second < 10; second++) {
    await act(() => new Promise((resolve) => setTimeout(resolve, 1000)));
  }
  await userEvent.click(screen.getByRole("button", { name: "Delete" }));
  await waitFor(() => assert.equal(secureStore.has("session"), false));
  assert.deepEqual(sent, [{ path: "/api/account/delete", body: {} }]);
  assert.deepEqual(navigated, [
    CommonActions.reset({
      index: 0,
      routes: [{ name: "Screen", params: { path: "/" } }],
    }),
  ]);
});

it("opens the backup by the link the server answers", async () => {
  const opened: string[] = [];
  window.open = ((url: string) => {
    opened.push(url);
    return null;
  }) as typeof window.open;
  answer("/api/backup", () => ({
    url: "http://localhost:3000/backup.pdf?token=t",
  }));
  render(await drawScreen(<Account request={user(0)} />));
  await userEvent.click(
    screen.getByRole("button", { name: "Download Backup" }),
  );
  await waitFor(() =>
    assert.deepEqual(opened, ["http://localhost:3000/backup.pdf?token=t"]),
  );
});

it("sends feedback, and thanks for it", async () => {
  render(await drawScreen(<Feedback request={user(0)} />));
  await userEvent.type(
    screen.getByPlaceholderText("What's on your mind?"),
    "Love it.",
  );
  await userEvent.click(screen.getByRole("button", { name: "Submit" }));
  assert.ok(await screen.findByText("Thank you for submitting feedback!"));
  assert.deepEqual(sent, [
    { path: "/api/feedback", body: { value: "Love it." } },
  ]);
  await userEvent.click(
    screen.getByRole("button", { name: "Give More Feedback" }),
  );
  assert.equal(
    (screen.getByPlaceholderText("What's on your mind?") as HTMLTextAreaElement)
      .value,
    "",
  );
});

it("turns dark mode on from the menu, and draws the screen again", async () => {
  render(await drawScreen(<Write request={user(0)} />));
  await userEvent.click(screen.getByRole("button", { name: "Menu" }));
  await userEvent.click(screen.getByText("Dark Mode"));
  await waitFor(() =>
    assert.deepEqual(sent, [
      { path: "/api/preferences", body: { theme: "dark" } },
    ]),
  );
  await waitFor(() =>
    assert.deepEqual(navigated, [
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Screen", params: { path: "/write" } }],
      }),
    ]),
  );
});

it("opens My Account and Give Feedback from the menu", async () => {
  render(await drawScreen(<Write request={user(0)} />));
  await userEvent.click(screen.getByRole("button", { name: "Menu" }));
  await userEvent.click(screen.getByText("My Account"));
  await userEvent.click(screen.getByRole("button", { name: "Menu" }));
  await userEvent.click(screen.getByText("Give Feedback"));
  assert.deepEqual(navigated, [
    StackActions.push("Screen", { path: "/account" }),
    StackActions.push("Screen", { path: "/feedback" }),
  ]);
});
