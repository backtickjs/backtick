// The feed's items, as a database would hold them: each of a kind the feed
// knows nothing of. Only `/items/:id` reads one, to draw it.
export type Item =
  | { id: string; kind: "post"; author: string; text: string }
  | {
      id: string;
      kind: "photo";
      author: string;
      caption: string;
      color: string;
    }
  | { id: string; kind: "poll"; question: string; options: string[] };

const written: Item[] = [
  {
    id: "1",
    kind: "post",
    author: "Ada",
    text: "Shipped a new screen without a store review.",
  },
  {
    id: "2",
    kind: "photo",
    author: "Grace",
    caption: "Sunset over the harbour",
    color: "#f4a261",
  },
  {
    id: "3",
    kind: "poll",
    question: "Tabs or spaces?",
    options: ["Tabs", "Spaces", "Whatever Prettier says"],
  },
  {
    id: "4",
    kind: "post",
    author: "Linus",
    text: "Each item here is its own bundle, from its own request.",
  },
  {
    id: "5",
    kind: "photo",
    author: "Margaret",
    caption: "Launch day",
    color: "#2a9d8f",
  },
  {
    id: "6",
    kind: "poll",
    question: "Dark mode or light?",
    options: ["Dark", "Light", "Whatever the phone says"],
  },
  {
    id: "7",
    kind: "post",
    author: "Barbara",
    text: "Everything below here is made up by the server.",
  },
];

const authors = ["Ada", "Grace", "Linus", "Margaret", "Barbara", "Alan"];
const topics = ["a new screen", "the feed", "a poll", "launch day", "a fix"];
const colors = ["#f4a261", "#2a9d8f", "#e76f51", "#264653", "#e9c46a"];

// One more item, made up from its number, so the feed is long enough to
// scroll: kinds, authors and colors in turn.
function madeUp(n: number): Item {
  const id = String(n);
  const author = authors[n % authors.length]!;
  const topic = topics[n % topics.length]!;
  switch (n % 3) {
    case 0:
      return { id, kind: "post", author, text: `Post ${n}, about ${topic}.` };
    case 1:
      return {
        id,
        kind: "photo",
        author,
        caption: `Photo ${n}, of ${topic}`,
        color: colors[n % colors.length]!,
      };
    default:
      return {
        id,
        kind: "poll",
        question: `Poll ${n}: ship ${topic} today?`,
        options: ["Yes", "No", "After lunch"],
      };
  }
}

const items: Item[] = [
  ...written,
  ...Array.from({ length: 200 - written.length }, (_, index) =>
    madeUp(written.length + 1 + index),
  ),
];

const PAGE_SIZE = 3;

/**
 * One page of the feed's ids, newest first, counting from 1, and whether
 * another follows: all the feed knows of its items.
 */
export function readPage(page: number): { ids: string[]; more: boolean } {
  const start = (page - 1) * PAGE_SIZE;
  return {
    ids: items.slice(start, start + PAGE_SIZE).map((item) => item.id),
    more: start + PAGE_SIZE < items.length,
  };
}

// How many likes each item has, as a database would count them.
const likes = new Map<string, number>();

/** One more like for the item, and how many it now has. */
export function addLike(id: string): number {
  readItem(id);
  const count = (likes.get(id) ?? 0) + 1;
  likes.set(id, count);
  return count;
}

export function likesOf(id: string): number {
  return likes.get(id) ?? 0;
}

// Each item's comments, oldest first.
const comments = new Map<string, string[]>();

/** One more comment on the item, and how many it now has. */
export function addComment(id: string, text: string): number {
  readItem(id);
  const list = [...commentsOf(id), text];
  comments.set(id, list);
  return list.length;
}

export function commentsOf(id: string): string[] {
  return comments.get(id) ?? [];
}

export function readItem(id: string): Item {
  const item = items.find((each) => each.id === id);
  if (item === undefined) throw new Error(`No item ${id}.`);
  return item;
}
