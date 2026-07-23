import { cs } from "@backtickjs/core";

// A container ships verbatim, so an action inside one has no place — the
// splice rejects it.
const action = cs.lift((() => {
    const __cs_x = cs.const(1);
})());

export const listed = cs.lift((() => {
    const __cs_list = cs.const(cs.splice([action]));
    return cs.const(1);
})());

export const keyed = cs.lift((() => {
    const __cs_map = cs.const(cs.splice({ press: action }));
    return cs.const(1);
})());
