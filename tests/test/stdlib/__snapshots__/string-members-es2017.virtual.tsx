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
    const __cs_word = cs.const("ab");
    return cs.const({ padded: cs.receiver(__cs_word).padStart(4) + "|" + cs.receiver(__cs_word).padEnd(5, "-="), trimmed: cs.receiver("  x  ").trimStart() + "|" + cs.receiver("  x  ").trimEnd() + "|", at: [cs.receiver(__cs_word).at(0), cs.receiver(__cs_word).at(-cs.number(1)), cs.receiver(__cs_word).at(5)], replaced: cs.receiver("a.b.c").replaceAll(".", "/"), replacedBy: cs.receiver("a.b").replaceAll(".", (__cs_found, __cs_offset) => "" + __cs_offset) });
})()),
  );
});
