import assert from "node:assert/strict";
import { it } from "node:test";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Story } from "../stories.js";
import { StackActions } from "@react-navigation/routers";
import { drawScreen, navigated } from "../test/drawScreen.js";
import { request } from "../test/request.js";
import { answer, sent } from "../test/server.js";
import { ReadView } from "./Read.js";

const story: Story = {
  id: "s1",
  text: "Ran the half marathon.",
  favorite: false,
  tags: ["running"],
  location: "",
  photo: null,
  date: "2026-10-05",
  day: "05",
  month: "October 2026",
  searchDate: "october/05/2026",
  onThisDay: false,
};

const signedIn = {
  ...request,
  user: { uid: "tester", email: "tester@mystoryjar.com", signedInAt: 0 },
};

async function draw() {
  render(await drawScreen(<ReadView request={signedIn} stories={[story]} />));
}

it("favorites a story at once, and tells the server", async () => {
  await draw();
  await userEvent.click(screen.getByRole("button", { name: "05" }));
  assert.ok(screen.getByRole("button", { name: "Favorite, 05" }));
  await waitFor(() =>
    assert.deepEqual(sent, [
      { path: "/api/stories/favorite", body: { id: "s1", favorite: true } },
    ]),
  );
});

it("takes a favorite back if the server refuses", async () => {
  answer("/api/stories/favorite", () => ({
    status: 404,
    body: { error: "That story is gone." },
  }));
  await draw();
  await userEvent.click(screen.getByRole("button", { name: "05" }));
  assert.ok(await screen.findByText("That story is gone."));
  assert.ok(screen.getByRole("button", { name: "05" }));
});

it("opens a story's editor as a sheet", async () => {
  await draw();
  await userEvent.click(screen.getByRole("button", { name: "Story Menu" }));
  await userEvent.click(screen.getByText("Edit"));
  assert.deepEqual(navigated, [
    StackActions.push("Screen", { path: "/edit?id=s1", presentation: "modal" }),
  ]);
});

it("deletes a story once confirmed", async () => {
  await draw();
  await userEvent.click(screen.getByRole("button", { name: "Story Menu" }));
  await userEvent.click(screen.getByText("Delete"));
  assert.ok(screen.getByText("Are you sure you want to delete this story?"));
  await userEvent.click(screen.getByRole("button", { name: "Delete" }));
  await waitFor(() =>
    assert.equal(screen.queryByText("Ran the half marathon."), null),
  );
  assert.deepEqual(sent, [{ path: "/api/stories/delete", body: { id: "s1" } }]);
});
