import { cs } from "@backtickjs/core";

// The one thing the language cannot do for itself: produce a sequence of a
// given length. Everything else about an array is a transformation of one that
// already exists.
//
// The mapper's first argument is always `null` — the standard library passes
// the element it found, and against a `{ length }` source there is none.
export default cs`{
  const doubled = Array.from({ length: 4 }, (_, index) => index * 2);
  const empty = Array.from({ length: 0 }, (_, index) => index);
  const absent = Array.from({ length: 2 }, (value, index) =>
    value === null ? index : -1,
  );
  return doubled.join(",") + "|" + empty.length + "|" + absent.join(",");
}`;
