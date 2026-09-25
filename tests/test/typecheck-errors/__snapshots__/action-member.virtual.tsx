import { cs } from "@backtickjs/core";

// Typed code can't put an action in a container (see `Spliceable`), but an
// untyped caller can; the lowering backstop refuses to ship it.
const action = cs.lift((() => {
    const __cs_x = 1;
})());

export default cs.lift((() => {
    // @ts-expect-error: Type 'Client<void>' is not assignable to type 'Spliceable<ClientValue>'.
    const __cs_list = cs.splice([action] satisfies typeof cs.Spliceable);
    return 1;
})());
