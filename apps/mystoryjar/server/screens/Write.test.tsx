import assert from "node:assert/strict";
import { afterEach, beforeEach, it } from "node:test";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { dayIn } from "../dates.js";
import { drawScreen, navigated, pickPhoto } from "../test/drawScreen.js";
import { request } from "../test/request.js";
import { Write } from "./Write.js";

// The server as Write talks to it: a story is taken and answered with an id,
// a photo with links to it; what each was sent, kept.
const sent: { path: string; body: unknown }[] = [];
const real = globalThis.fetch;

beforeEach(() => {
  sent.length = 0;
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (!url.startsWith(request.origin)) return real(input, init);
    const path = url.slice(request.origin.length);
    sent.push({
      path,
      body: typeof init?.body === "string" ? JSON.parse(init.body) : "bytes",
    });
    const answer =
      path === "/api/photos"
        ? {
            id: "photo-1",
            small: "https://photos.example/s.jpg",
            large: "https://photos.example/l.jpg",
          }
        : { id: "story-1" };
    return new Response(JSON.stringify(answer), {
      headers: { "content-type": "application/json" },
    });
  };
});

afterEach(() => {
  globalThis.fetch = real;
});

const signedIn = {
  ...request,
  user: { uid: "tester", email: "tester@mystoryjar.com", signedInAt: 0 },
};

async function draw() {
  render(await drawScreen(<Write request={signedIn} />));
}

const save = () => screen.getByRole("button", { name: "Save" });

it("saves a story for today, then shows Read", async () => {
  await draw();
  assert.equal(save().getAttribute("aria-disabled"), "true");
  await userEvent.type(
    screen.getByPlaceholderText("What's your story?"),
    "Beach day.",
  );
  await userEvent.click(save());
  // Read, preloaded before this story, fetched again
  await waitFor(() => assert.equal(navigated.length, 1));
  const [shown] = navigated as {
    payload: { params: Record<string, unknown> };
  }[];
  assert.equal(shown!.payload.params.path, "/read");
  assert.equal(typeof shown!.payload.params.fresh, "number");
  // the phone's today, which in tests is this computer's
  const today = dayIn(Intl.DateTimeFormat().resolvedOptions().timeZone);
  assert.deepEqual(sent, [
    {
      path: "/api/stories",
      body: {
        text: "Beach day.",
        day: today,
        favorite: false,
        tags: [],
        location: "",
        photoId: null,
      },
    },
  ]);
});

it("won't save past 280 characters, and counts down to it", async () => {
  await draw();
  const text = screen.getByPlaceholderText("What's your story?");
  await userEvent.click(text);
  await userEvent.paste("a".repeat(281));
  assert.ok(screen.getByLabelText("-1 characters left"));
  assert.equal(save().getAttribute("aria-disabled"), "true");
});

it("sends the heart, the place and the tags", async () => {
  await draw();
  await userEvent.click(
    screen.getByRole("button", { name: "Toggle Favorite" }),
  );
  await userEvent.click(
    screen.getByRole("button", { name: "Toggle Location Input" }),
  );
  await userEvent.type(screen.getByPlaceholderText("Location"), "Rockaway");
  await userEvent.click(
    screen.getByRole("button", { name: "Toggle Tags Input" }),
  );
  // Enter takes the web build's focus away, where a phone keeps it
  await userEvent.type(screen.getByLabelText("Tags"), "summer{enter}");
  await userEvent.type(screen.getByLabelText("Tags"), "beach{enter}");
  await userEvent.click(screen.getByRole("button", { name: "Remove summer" }));
  await userEvent.type(
    screen.getByPlaceholderText("What's your story?"),
    "Sand.",
  );
  await userEvent.click(save());
  await waitFor(() => assert.equal(sent.length, 1));
  assert.deepEqual(sent[0]!.body, {
    text: "Sand.",
    day: (sent[0]!.body as { day: string }).day,
    favorite: true,
    tags: ["beach"],
    location: "Rockaway",
    photoId: null,
  });
});

it("hides an empty place again", async () => {
  await draw();
  await userEvent.click(
    screen.getByRole("button", { name: "Toggle Location Input" }),
  );
  await userEvent.click(screen.getByRole("button", { name: "Clear Location" }));
  assert.equal(screen.queryByPlaceholderText("Location"), null);
});

it("uploads a photo as soon as it's picked, and saves the story with it", async () => {
  pickPhoto({
    canceled: false,
    assets: [{ uri: "data:image/jpeg;base64,AAAA", mimeType: "image/jpeg" }],
  });
  await draw();
  await userEvent.click(screen.getByRole("button", { name: "Upload Photo" }));
  assert.ok(await screen.findByLabelText("Full Screen Image"));
  assert.equal(
    screen
      .getByRole("button", { name: "Upload Photo" })
      .getAttribute("aria-disabled"),
    "true",
  );
  await userEvent.type(
    screen.getByPlaceholderText("What's your story?"),
    "Look.",
  );
  await userEvent.click(save());
  await waitFor(() => assert.equal(sent.length, 2));
  assert.equal(sent[0]!.path, "/api/photos");
  assert.equal((sent[1]!.body as { photoId: string }).photoId, "photo-1");
});

it("picks an earlier day, never a later one", async () => {
  await draw();
  const now = new Date();
  await userEvent.click(screen.getByRole("button", { name: /\d{4}/ }));
  const day = (date: Date) =>
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0");
  // tomorrow, when it's this month
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  );
  if (tomorrow.getMonth() === now.getMonth()) {
    assert.equal(
      screen
        .getByRole("button", { name: day(tomorrow) })
        .getAttribute("aria-disabled"),
      "true",
    );
  }
  assert.equal(
    screen.getByRole("button", { name: "Next" }).getAttribute("aria-disabled"),
    "true",
  );
  await userEvent.click(screen.getByRole("button", { name: "Previous" }));
  const earlier = day(new Date(now.getFullYear(), now.getMonth() - 1, 15));
  await userEvent.click(screen.getByRole("button", { name: earlier }));
  await userEvent.click(screen.getByRole("button", { name: "Done" }));
  await userEvent.type(
    screen.getByPlaceholderText("What's your story?"),
    "Then.",
  );
  await userEvent.click(save());
  await waitFor(() => assert.equal(sent.length, 1));
  assert.equal((sent[0]!.body as { day: string }).day, earlier);
});
