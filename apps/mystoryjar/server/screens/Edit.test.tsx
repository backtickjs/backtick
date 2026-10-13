import assert from "node:assert/strict";
import { it } from "node:test";
import { StackActions } from "@react-navigation/routers";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Story } from "../stories.js";
import { drawScreen, navigated, stackBelow } from "../test/drawScreen.js";
import { request } from "../test/request.js";
import { sent } from "../test/server.js";
import { EditView } from "./Edit.js";

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

it("saves the edit, then shows Read again, fetched with it", async () => {
  render(await drawScreen(<EditView request={signedIn} story={story} />));
  const text = screen.getByDisplayValue("Ran the half marathon.");
  await userEvent.clear(text);
  await userEvent.type(text, "Ran the full marathon.");
  await userEvent.click(screen.getByRole("button", { name: "Save" }));
  await waitFor(() => assert.equal(navigated.length, 1));
  assert.deepEqual(sent, [
    {
      path: "/api/stories/update",
      body: {
        id: "s1",
        text: "Ran the full marathon.",
        day: "2026-10-05",
        favorite: false,
        tags: ["running"],
        location: "",
        photoId: null,
      },
    },
  ]);
  const [back] = navigated as {
    type: string;
    payload: { name: string; params: Record<string, unknown>; merge: boolean };
  }[];
  assert.equal(back!.type, "POP_TO");
  assert.equal(back!.payload.params.path, "/read");
  assert.equal(typeof back!.payload.params.fresh, "number");
  assert.equal(back!.payload.merge, true);
});

it("goes back as it was when the changes are discarded", async () => {
  render(await drawScreen(<EditView request={signedIn} story={story} />));
  stackBelow(true);
  await userEvent.type(
    screen.getByDisplayValue("Ran the half marathon."),
    "!!",
  );
  await userEvent.click(
    screen.getByRole("button", { name: "Discard Changes" }),
  );
  assert.deepEqual(navigated, [{ type: "GO_BACK" }]);
  assert.deepEqual(sent, []);
});

it("says so for a story that's gone", async () => {
  render(await drawScreen(<EditView request={signedIn} story={null} />));
  assert.ok(screen.getByText("That story is gone."));
});
