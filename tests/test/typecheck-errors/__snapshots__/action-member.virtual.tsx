import { cs } from "@backtickjs/core";

// Typed code can't put an action in a container (see `Spliceable`), but an
// untyped caller can; the lowering backstop refuses to ship it.
const action = cs.lift((() => {
    const __cs_x = cs.const(1);
})());

export default cs.lift((() => {
    // @ts-expect-error: Argument of type 'Client<void>[]' is not assignable to parameter of type 'ClientValue'.
    const __cs_list = cs.const((cs.splice([action]) satisfies typeof cs.ClientUnknown));
    return cs.const(1);
})());
