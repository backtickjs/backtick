import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// The members ES2015 added that this language answers for: a search that
// finds nothing reads as `undefined`, as a read past the end does, and
// everything else is what the standard library says it is.
it("stdlibEs2015", async (t) => {
  await snapshotCase(
    t,
    "stdlibEs2015",
    cs.lift((() => {
      const __cs_xs = [3, 8, 12, 5];
      const __cs_word = "backtick";
      return {
        found: __cs_xs.find((__cs_x) => __cs_x > 7),
        missing: __cs_xs.find((__cs_x) => __cs_x > 100) === undefined,
        at: __cs_xs.findIndex((__cs_x) => __cs_x > 7),
        nowhere: __cs_xs.findIndex((__cs_x) => __cs_x > 100),
        includes: __cs_word.includes("tick"),
        startsWith: __cs_word.startsWith("back"),
        endsWith: __cs_word.endsWith("tick", 4),
        repeated: "ab".repeat(3),
        codePoint: "\u{1F600}".codePointAt(0),
        keys: cs.globalThis.Object.keys({ a: 1, b: 2 }),
      };
    })()),
  );
});
