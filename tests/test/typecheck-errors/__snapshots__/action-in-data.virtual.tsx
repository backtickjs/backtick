import { cs } from "@backtickjs/core";

// A container ships verbatim, so an action inside one has no place — the
// splice rejects it.
const action = cs.lift((() => {
    const __cs_x = cs.const(1);
})());

export const listed = cs.lift((() => {
    // @ts-expect-error: Argument of type 'Client<void>[]' is not assignable to parameter of type 'ClientValue'.
    const __cs_list = cs.const((cs.splice([action]) satisfies typeof cs.ClientUnknown));
    return cs.const(1);
})());

export const keyed = cs.lift((() => {
    // @ts-expect-error: Argument of type '{ press: Client<void>; }' is not assignable to parameter of type 'ClientValue'.
    const __cs_map = cs.const((cs.splice({ press: action }) satisfies typeof cs.ClientUnknown));
    return cs.const(1);
})());
