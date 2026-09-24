import { cs } from "@backtickjs/core";

// Checked as TypeScript checks one: a variable that isn't `const`, and operands
// the operator takes.
export const constant = cs.lift((() => {
    const __cs_n = 0;
    // @ts-expect-error: Cannot assign to 'n' because it is a constant.
    __cs_n += 1;
    return __cs_n;
})());

export const mixed = cs.lift((() => {
    let __cs_n = 1;
    // @ts-expect-error: The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
    __cs_n -= "a";
    return __cs_n;
})());
