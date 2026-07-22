import { cs, type Client } from "@backtickjs/core";

// Narrowing must survive the boolean-condition checks: the tested condition
// stays in place in the virtual code (its check reads a sequenced
// duplicate), so `text !== null` still narrows `text` in the branch it
// guards and from a `&&` left operand into the right. The conditions cover
// each checked shape: a bare boolean identifier, a braced splice (whose
// duplicate re-renders the host expression), and comparison/`&&` forms that
// are boolean by construction and need no check.
const flags = { strict: cs.liftValue(true) };

const label: Client<(text: string | null, upper: boolean) => string> = cs.liftValue((__cs_text: string | null, __cs_upper: boolean) => {
    if ((cs.condition(__cs_upper) && __cs_upper) && __cs_text !== null) {
        return cs.receiver(__cs_text).toUpperCase();
    }
    if ((cs.condition(cs.spliceValue(flags.strict)) && cs.spliceValue(flags.strict)) && __cs_text !== null && cs.receiver(__cs_text).charAt(0) === "!") {
        return cs.receiver(__cs_text).concat("?");
    }
    return "none";
});

export default cs.liftValue({ missing: cs.spliceValue((label))(null, true), loud: cs.spliceValue((label))("!hi", true), quiet: cs.spliceValue((label))("!hi", false), plain: cs.spliceValue((label))("zz", false) });
