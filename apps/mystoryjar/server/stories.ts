import {
  type DocumentData,
  FieldValue,
  Timestamp,
} from "firebase-admin/firestore";
import { dayIn, startOfDay } from "./dates.js";
import { firestore, storageLink } from "./firebase.js";
import { storedPhoto } from "./photos.js";
import { Refusal } from "./refusal.js";

/** A story as a screen shows it: what it says, and its day where it's read. */
export type Story = {
  id: string;
  text: string;
  favorite: boolean;
  tags: string[];
  location: string;
  photo: { small: string; large: string } | null;
  // its day, "05", and its month's heading, "October 2026"
  day: string;
  month: string;
  // what a search matches the date against, "october/05/2026", as the
  // website's does
  searchDate: string;
  // written on today's day and month, some year
  onThisDay: boolean;
};

const parts = (date: Date, timeZone: string) => {
  const [month, day, year] = date
    .toLocaleDateString("en-US", {
      timeZone,
      month: "long",
      day: "2-digit",
      year: "numeric",
    })
    .replace(",", "")
    .split(" ");
  return { month: month!, day: day!, year: year! };
};

/**
 * A story document as the website writes it, older shapes included: missing
 * tags, photos or synced, and the photo still being processed.
 */
export function storyOf(
  id: string,
  data: DocumentData,
  timeZone: string,
  today: Date = new Date(),
): Story {
  const date = parts(data.date.toDate(), timeZone);
  const now = parts(today, timeZone);
  const photo = (data.photos ?? [])[0];
  return {
    id,
    text: data.value ?? "",
    favorite: data.isFavorite === true,
    tags: (data.tags ?? []).map((tag: { label: string }) => tag.label),
    location: data.location ?? "",
    photo:
      photo?.source === "storage"
        ? { small: photo.urls.small, large: photo.urls.large }
        : null,
    day: date.day,
    month: `${date.month} ${date.year}`,
    searchDate: `${date.month}/${date.day}/${date.year}`.toLowerCase(),
    onThisDay: date.month === now.month && date.day === now.day,
  };
}

/**
 * Everything `uid` wrote, newest day first, and newest first within a day,
 * its photos linked for a phone that reached the server at `origin`.
 */
export async function storiesOf(
  uid: string,
  timeZone: string,
  origin: string,
): Promise<Story[]> {
  const snapshot = await firestore
    .collection("stories")
    .where("author", "==", uid)
    .get();
  return snapshot.docs
    .map((doc) => ({ doc, data: doc.data() }))
    .sort(
      (a, b) =>
        b.data.date.toMillis() - a.data.date.toMillis() ||
        (b.data.createdAt?.toMillis() ?? 0) -
          (a.data.createdAt?.toMillis() ?? 0),
    )
    .map(({ doc, data }) => storyOf(doc.id, data, timeZone))
    .map((story) =>
      story.photo === null
        ? story
        : {
            ...story,
            photo: {
              small: storageLink(story.photo.small, origin),
              large: storageLink(story.photo.large, origin),
            },
          },
    );
}

/** A new story as the composer sends it. */
export type NewStory = {
  text: string;
  // the day it's for where the phone is, "2026-10-12"
  day: string;
  favorite: boolean;
  tags: string[];
  location: string;
  // a photo the phone uploaded, by the id the upload answered
  photoId: string | null;
};

const LIMIT = 280;

/**
 * Checks a story as the website's composer did: some text and no more than
 * 280 characters (UTF-16 units, as JavaScript counts them), a day no later
 * than today where the phone is, one photo at most. Anything else is refused.
 */
export function checkStory(input: unknown, timeZone: string): NewStory {
  const story = (input ?? {}) as Record<string, unknown>;
  const strings = (value: unknown) =>
    Array.isArray(value) && value.every((each) => typeof each === "string")
      ? (value as string[])
      : null;
  const text = typeof story.text === "string" ? story.text : "";
  if (text.length === 0) {
    throw new Refusal("Write something first.");
  }
  if (text.length > LIMIT) {
    throw new Refusal(`Stories are ${LIMIT} characters at most.`);
  }
  const day = typeof story.day === "string" ? story.day : "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || day > dayIn(timeZone)) {
    throw new Refusal("Pick a day that's already happened.");
  }
  const tags = strings(story.tags);
  if (
    tags === null ||
    tags.length > 50 ||
    tags.some((tag) => tag.length > 100)
  ) {
    throw new Refusal("Those tags can't be saved.");
  }
  const location = typeof story.location === "string" ? story.location : "";
  if (location.length > 200) {
    throw new Refusal("That place is too long.");
  }
  return {
    text,
    day,
    favorite: story.favorite === true,
    tags,
    location,
    photoId: typeof story.photoId === "string" ? story.photoId : null,
  };
}

/** Writes `story` as `uid`'s, in the shape the website writes: its id. */
export async function addStory(
  uid: string,
  story: NewStory,
  timeZone: string,
): Promise<string> {
  const photos =
    story.photoId === null ? [] : [await storedPhoto(uid, story.photoId)];
  const doc = await firestore.collection("stories").add({
    author: uid,
    value: story.text,
    date: Timestamp.fromDate(startOfDay(timeZone, story.day)),
    isFavorite: story.favorite,
    tags: story.tags.map((label) => ({ label })),
    location: story.location,
    photos,
    // the photo is already in Storage, so there's nothing for the website's
    // Cloud Function to do
    synced: true,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  return doc.id;
}
