import { cs } from "@backtickjs/core";

const one = 1;

// An assertion needs no check of its own: TypeScript already refuses to
// assert a value to `void`.
const asserted = cs.lift((() => {
    // @ts-expect-error: Conversion of type 'number' to type 'void' may be a mistake because neither type sufficiently overlaps with the other.
    const __cs_a = (cs.splice((one)) satisfies typeof cs.ClientUnknown) as void;
    return "" + __cs_a;
})());
