import { cs } from "@backtickjs/core";

// A spread in an object literal, which is the one place the format cannot ship
// an object as the data it spells: an object in a value slot *is* its own keys
// and none of them is reserved, so there is nowhere to write "and every key of
// that one". A literal a spread runs through is a node instead — a name slot of
// `null` marking the spread — and a literal without one is data still.
//
// Later wins, both ways round, the way it does in the language this mirrors.
export default cs.lift((() => {
    const __cs_base = cs.const({ a: 1, b: 2 });
    const __cs_over = cs.const({ b: 9 });
    return cs.const({ ...__cs_base, ...__cs_over, c: 3 });
})());
