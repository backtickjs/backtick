import { cs } from "@backtickjs/core";

// A container ships verbatim, so an action inside one has no place — the
// splice rejects it.
const action = cs.lift((() => {
    const __cs_x = 1;
})());

export const listed = cs.lift((() => {
    // @ts-expect-error: Type 'Client<void>[]' does not satisfy the expected type 'ClientUnknown'.
    const __cs_list = (cs.splice([action]) satisfies typeof cs.ClientUnknown);
    return 1;
})());

export const keyed = cs.lift((() => {
    // @ts-expect-error: Type '{ press: Client<void>; }' does not satisfy the expected type 'ClientUnknown'.
    const __cs_map = (cs.splice({ press: action }) satisfies typeof cs.ClientUnknown);
    return 1;
})());
