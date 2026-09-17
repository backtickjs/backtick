import { cs } from "@backtickjs/core";

const one = 1;

// An assertion needs no check of its own. What a script asserts about is a
// value it holds, so `void` is refused where every other non-value is — at the
// `ClientValue` boundary, coarsely and after the fact, which is what a type
// nothing can hold a value of is worth. Only a parameter needs saying earlier,
// because an annotation is not a value and reaches no boundary at all.
const asserted = cs.lift((() => {
    // @ts-expect-error: Argument of type 'void' is not assignable to parameter of type 'ClientValue'.
    const __cs_a = cs.const((cs.splice((one)) satisfies typeof cs.ClientUnknown) as void);
    return cs.const("" + __cs_a);
})());
