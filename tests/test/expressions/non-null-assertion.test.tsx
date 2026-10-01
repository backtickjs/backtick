import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A non-null assertion is the checker's alone, as `as` is: erased on the way
// to a bundle. `find` answers `number | undefined`; the script knows a row
// past 1 exists, and `!` says so.
it("nonNullAssertion", async (t) => {
  await snapshotCase(
    t,
    "nonNullAssertion",
    cs`{
      const rows = [1, 2, 3];
      const first = rows.find((row) => row > 1)!;

      return first * 10;
    }`,
  );
});
