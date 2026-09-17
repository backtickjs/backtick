import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A property literally named `...`, in a literal a spread also runs through —
// which is the one shape where a spread and a pair holding `...` sit in the
// same list. A pair is an array of its own, so its `...` is only a string.
it("objectDotsKey", async (t) => {
  await snapshotCase(
    t,
    "objectDotsKey",
    cs`{
      const base = { a: 1 };
      return { ...base, "...": 2 };
    }`,
  );
});
