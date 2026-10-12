import type { DocumentData } from "firebase-admin/firestore";
import { firestore } from "./firebase.js";

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

/** Everything `uid` wrote, newest day first, and newest first within a day. */
export async function storiesOf(
  uid: string,
  timeZone: string,
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
    .map(({ doc, data }) => storyOf(doc.id, data, timeZone));
}
