import assert from "node:assert/strict";
import { it } from "node:test";
import { Timestamp } from "firebase-admin/firestore";
import { storyOf } from "./stories.js";

const today = new Date("2026-10-12T15:00:00Z");

it("dates a story where it's read, as the website wrote it", () => {
  // midnight in New York on October 5th
  const story = storyOf(
    "s1",
    {
      value: "Ran the half marathon.",
      date: Timestamp.fromDate(new Date("2026-10-05T04:00:00Z")),
      isFavorite: true,
      tags: [{ label: "running" }],
      location: "Brooklyn",
      photos: [],
    },
    "America/New_York",
    today,
  );
  assert.deepEqual(story, {
    id: "s1",
    text: "Ran the half marathon.",
    favorite: true,
    tags: ["running"],
    location: "Brooklyn",
    photo: null,
    day: "05",
    month: "October 2026",
    searchDate: "october/05/2026",
    onThisDay: false,
  });
});

it("reads older shapes, and a photo only once it's in Storage", () => {
  const story = storyOf(
    "s2",
    {
      value: "Old one.",
      date: Timestamp.fromDate(new Date("2021-10-12T04:00:00Z")),
      isFavorite: false,
      photos: [{ source: "compressed", id: "p", dataURLs: {} }],
    },
    "America/New_York",
    today,
  );
  assert.deepEqual(
    { tags: story.tags, location: story.location, photo: story.photo },
    { tags: [], location: "", photo: null },
  );
  assert.equal(story.onThisDay, true);
});
