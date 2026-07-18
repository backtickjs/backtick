import { cs, type Client } from "@backtickjs/core";

// Narrowing must survive the boolean-condition checks: the tested condition
// stays in place in the virtual code (its check reads a sequenced
// duplicate), so `text !== undefined` still narrows `text` in the branch it
// guards and from a `&&` left operand into the right. The conditions cover
// each checked shape: a bare boolean identifier, a braced splice (whose
// duplicate re-renders the host expression), and comparison/`&&` forms that
// are boolean by construction and need no check.
const flags = { strict: cs.lift(true) };

const label: Client<(text: string | undefined, upper: boolean) => string> = cs.lift((__cs_text: string | undefined, __cs_upper: boolean) => {
    if ((cs.condition(__cs_upper) && __cs_upper) && __cs_text !== undefined) {
        return cs.virtualize(__cs_text).toUpperCase();
    }
    if ((cs.condition(cs.splice(flags.strict)) && cs.splice(flags.strict)) && __cs_text !== undefined && cs.virtualize(__cs_text).charAt(0) === "!") {
        return cs.virtualize(__cs_text).concat("?");
    }
    return "none";
});

export default cs.lift({ missing: cs.splice((label))(undefined, true), loud: cs.splice((label))("!hi", true), quiet: cs.splice((label))("!hi", false), plain: cs.splice((label))("zz", false) });
