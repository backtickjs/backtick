import assert from "node:assert/strict";
import { it } from "node:test";
import { Timestamp } from "firebase-admin/firestore";
import { Refusal } from "./refusal.js";
import { checkStory, storyOf } from "./stories.js";

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
    date: "2026-10-05",
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

it("takes a story the composer sends", () => {
  assert.deepEqual(
    checkStory(
      {
        text: "Beach day.",
        day: "2026-07-04",
        favorite: true,
        tags: ["summer"],
        location: "Rockaway",
        photoId: null,
      },
      "America/New_York",
    ),
    {
      text: "Beach day.",
      day: "2026-07-04",
      favorite: true,
      tags: ["summer"],
      location: "Rockaway",
      photoId: null,
    },
  );
});

it("refuses what the composer wouldn't send", () => {
  const story = { text: "x", day: "2026-07-04", tags: [], location: "" };
  const refused = (fields: object) =>
    assert.throws(() => checkStory({ ...story, ...fields }, "UTC"), Refusal);
  refused({ text: "" });
  // 281 characters, counted as JavaScript counts them
  refused({ text: "a".repeat(281) });
  refused({ day: "2999-01-01" });
  refused({ day: "July 4th" });
  refused({ tags: "summer" });
  // 280 is fine, an emoji counting as two
  checkStory({ ...story, text: "😀".repeat(140) }, "UTC");
});
