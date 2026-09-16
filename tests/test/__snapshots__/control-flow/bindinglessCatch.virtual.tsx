import { cs } from "@backtickjs/core";

// A `catch` without a binding: the try node's `param` is null and the
// handler runs with no new binding in scope.
const bindinglessCatch = cs.lift((() => {
    try {
        throw "boom";
    }
    catch {
        return cs.const("caught");
    }
})());
