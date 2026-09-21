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
    cs`{
      const word = "ab";
      return {
        padded: word.padStart(4) + "|" + word.padEnd(5, "-="),
        trimmed: "  x  ".trimStart() + "|" + "  x  ".trimEnd() + "|",
        at: [word.at(0), word.at(-1), word.at(5)],
        replaced: "a.b.c".replaceAll(".", "/"),
        replacedBy: "a.b".replaceAll(".", (found, offset) => "" + offset),
      };
    }`,
  );
});
