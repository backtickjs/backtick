import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// The string members after ES2015 that read a string without changing
// anything: padding, trimming one end, reading by position, and replacing
// every occurrence.
it("stringMembersEs2017", async (t) => {
  await snapshotCase(
    t,
    "stringMembersEs2017",
    cs.lift((() => {
      const __cs_word = "ab";
      return {
        padded: __cs_word.padStart(4) + "|" + __cs_word.padEnd(5, "-="),
        trimmed: "  x  ".trimStart() + "|" + "  x  ".trimEnd() + "|",
        at: [__cs_word.at(0), __cs_word.at(-1), __cs_word.at(5)],
        replaced: "a.b.c".replaceAll(".", "/"),
        replacedBy: "a.b".replaceAll(".", (__cs_found, __cs_offset) => "" + __cs_offset),
      };
    })()),
  );
});
