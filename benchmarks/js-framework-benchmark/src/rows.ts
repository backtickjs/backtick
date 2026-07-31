// A type alias, not an `interface`: an interface has no implicit index
// signature, so it does not satisfy `SpliceableValue` and a value typed by one
// cannot cross into a script at all. See GAPS.md.
export type Row = {
  readonly id: number;
  readonly label: string;
};

const ADJECTIVES = [
  "pretty",
  "large",
  "big",
  "small",
  "tall",
  "short",
  "long",
  "handsome",
  "plain",
  "quaint",
  "clean",
  "elegant",
  "easy",
  "angry",
  "crazy",
  "helpful",
  "mushy",
  "odd",
  "unsightly",
  "adorable",
  "important",
  "inexpensive",
  "cheap",
  "expensive",
  "fancy",
];

const COLOURS = [
  "red",
  "yellow",
  "blue",
  "green",
  "pink",
  "brown",
  "purple",
  "brown",
  "white",
  "black",
  "orange",
];

const NOUNS = [
  "table",
  "chair",
  "house",
  "bbq",
  "desk",
  "car",
  "pony",
  "cookie",
  "sandwich",
  "burger",
  "pizza",
  "mouse",
  "keyboard",
];

// The benchmark's own generator, kept verbatim in shape: three draws per row in
// the order adjective, colour, noun, and ids counting up from 1 — so that a
// vanillajs drawing from the same seeded stream builds the same rows. It runs on
// the server here: see GAPS.md, the client language reaches no globals, so a
// script can't call `Math.random()` and has no way to build an array element by
// element either.
export function generate(count: number, draw: () => number): Row[] {
  const random = (max: number): number => Math.round(draw() * 1000) % max;
  const rows: Row[] = [];
  for (let index = 0; index < count; index++) {
    rows.push({
      id: index + 1,
      label:
        `${ADJECTIVES[random(ADJECTIVES.length)]} ` +
        `${COLOURS[random(COLOURS.length)]} ` +
        `${NOUNS[random(NOUNS.length)]}`,
    });
  }
  return rows;
}
