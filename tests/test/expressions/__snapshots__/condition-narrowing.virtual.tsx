import { it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A condition narrows in the virtual code: `text !== null` narrows `text` in
// the branch it guards and from a `&&` left operand into the right, a braced
// splice included.
const flags = { strict: cs.lift(true) };

const label: Client<(text: string | null, upper: boolean) => string> = cs.lift((__cs_text: string | null, __cs_upper: boolean) => {
    if (__cs_upper && __cs_text !== null) {
        return __cs_text.toUpperCase();
    }
    if (cs.splice(flags.strict) && __cs_text !== null && __cs_text.charAt(0) === "!") {
        return __cs_text.concat("?");
    }
    return "none";
});

it("conditionNarrowing", async (t) => {
  await snapshotCase(
    t,
    "conditionNarrowing",
    cs.lift({ missing: cs.splice((label))(null, true), loud: cs.splice((label))("!hi", true), quiet: cs.splice((label))("!hi", false), plain: cs.splice((label))("zz", false) }),
  );
});
