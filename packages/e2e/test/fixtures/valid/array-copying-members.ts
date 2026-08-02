import { cs } from "@backtickjs/core";

// The copying members: each answers with a new array and leaves the one it was
// given alone, which is what lets an array be a value here. `sort`, `reverse`
// and `splice` — the ones that write into the array instead — are absent.
export default cs`{
  const rows = [3, 1, 2];
  const sorted = rows.toSorted((a, b) => a - b);
  const reversed = rows.toReversed();
  const spliced = rows.toSpliced(1, 1);
  const inserted = rows.toSpliced(1, 0, 9);
  return (
    sorted.join(",") +
    "|" +
    reversed.join(",") +
    "|" +
    spliced.join(",") +
    "|" +
    inserted.join(",") +
    "|" +
    rows.join(",")
  );
}`;
