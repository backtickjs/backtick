import { it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Narrowing must survive the boolean-condition checks: the tested condition
// stays in place in the virtual code (its check reads a sequenced
// duplicate), so `text !== null` still narrows `text` in the branch it
// guards and from a `&&` left operand into the right. The conditions cover
// each checked shape: a bare boolean identifier, a braced splice (whose
// duplicate re-renders the host expression), and comparison/`&&` forms that
// are boolean by construction and need no check.
const flags = { strict: cs.lift(cs.const(true)) };

const label: Client<(text: string | null, upper: boolean) => string> = cs.lift(cs.const((__cs_text: string | null, __cs_upper: boolean) => {
    if ((cs.condition(__cs_upper) && __cs_upper) && __cs_text !== null) {
        return cs.const(__cs_text.toUpperCase());
    }
    if ((cs.condition((cs.splice(flags.strict) satisfies typeof cs.ClientUnknown)) && (cs.splice(flags.strict) satisfies typeof cs.ClientUnknown)) && __cs_text !== null && __cs_text.charAt(0) === "!") {
        return cs.const(__cs_text.concat("?"));
    }
    return cs.const("none");
}));

it("conditionNarrowing", async (t) => {
  await snapshotCase(
    t,
    "conditionNarrowing",
    cs.lift(cs.const({ missing: (cs.splice((label)) satisfies typeof cs.ClientUnknown)(null, true), loud: (cs.splice((label)) satisfies typeof cs.ClientUnknown)("!hi", true), quiet: (cs.splice((label)) satisfies typeof cs.ClientUnknown)("!hi", false), plain: (cs.splice((label)) satisfies typeof cs.ClientUnknown)("zz", false) })),
  );
});
