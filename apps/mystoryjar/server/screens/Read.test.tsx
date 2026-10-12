import assert from "node:assert/strict";
import { it } from "node:test";
import { StackActions } from "@react-navigation/routers";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Story } from "../stories.js";
import { drawScreen, navigated, preloaded } from "../test/drawScreen.js";
import { request } from "../test/request.js";
import { ReadView } from "./Read.js";

const story = (fields: Partial<Story> & Pick<Story, "id" | "text">): Story => ({
  favorite: false,
  tags: [],
  location: "",
  photo: null,
  day: "05",
  month: "October 2026",
  searchDate: "october/05/2026",
  onThisDay: false,
  ...fields,
});

const stories = [
  story({
    id: "marathon",
    text: "Ran the half marathon.",
    favorite: true,
    tags: ["running"],
    location: "Brooklyn",
  }),
  story({ id: "puzzle", text: "Finished the puzzle.", onThisDay: true }),
  story({
    id: "snow",
    text: "First snow of the year.",
    day: "02",
    month: "January 2026",
    searchDate: "january/02/2026",
  }),
];

const signedIn = {
  ...request,
  user: { uid: "tester", email: "tester@mystoryjar.com", signedInAt: 0 },
};

async function draw(list: Story[] = stories) {
  render(await drawScreen(<ReadView request={signedIn} stories={list} />));
}

it("lists stories under their month, with their details", async () => {
  await draw();
  assert.ok(screen.getByText("October 2026"));
  assert.ok(screen.getByText("January 2026"));
  assert.ok(screen.getByText("Brooklyn"));
  assert.ok(screen.getByText("running"));
  assert.ok(screen.getByLabelText("Favorite, 05"));
});

it("searches every word, in the text, tags, place and date", async () => {
  await draw();
  await userEvent.type(
    screen.getByPlaceholderText("Search"),
    "brooklyn running",
  );
  assert.ok(await screen.findByText("Ran the half marathon."));
  assert.equal(screen.queryByText("Finished the puzzle."), null);
  await userEvent.clear(screen.getByPlaceholderText("Search"));
  await userEvent.type(screen.getByPlaceholderText("Search"), "january");
  assert.ok(await screen.findByText("First snow of the year."));
  assert.equal(screen.queryByText("Ran the half marathon."), null);
});

it("says so when nothing matches", async () => {
  await draw();
  await userEvent.type(screen.getByPlaceholderText("Search"), "zebra");
  assert.ok(await screen.findByText("No Stories to Show."));
});

it("filters favorites, and this day in other years", async () => {
  await draw();
  await userEvent.click(screen.getByRole("button", { name: "Filter: All" }));
  await userEvent.click(screen.getByText("Favorites"));
  assert.ok(screen.getByText("Ran the half marathon."));
  assert.equal(screen.queryByText("Finished the puzzle."), null);
  await userEvent.click(
    screen.getByRole("button", { name: "Filter: Favorites" }),
  );
  await userEvent.click(screen.getByText("On this day"));
  assert.ok(screen.getByText("Finished the puzzle."));
  assert.equal(screen.queryByText("Ran the half marathon."), null);
});

it("invites a first story when there are none", async () => {
  await draw([]);
  assert.ok(screen.getByText("Your jar is waiting."));
  await userEvent.click(screen.getByRole("button", { name: "Write a Story" }));
  assert.deepEqual(navigated, [
    StackActions.replace("Screen", { path: "/write", animation: "none" }),
  ]);
});

it("switches to Write from its tab, drawn ahead of time", async () => {
  await draw();
  assert.deepEqual(preloaded, ["/write"]);
  await userEvent.click(screen.getByRole("tab", { name: /Write/ }));
  assert.deepEqual(navigated, [
    StackActions.replace("Screen", { path: "/write", animation: "none" }),
  ]);
});

it("shows a story's photo, at its small size", async () => {
  await draw([
    story({
      id: "beach",
      text: "Beach day.",
      photo: {
        small: "https://photos.example/small.jpg",
        large: "https://photos.example/large.jpg",
      },
    }),
  ]);
  const image = screen.getByLabelText("Full Screen Image");
  assert.ok(image.innerHTML.includes("https://photos.example/small.jpg"));
});
