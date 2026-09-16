import { cs } from "@backtickjs/core";

// `-` is arithmetic, so its operand is a number — TypeScript's own rule, and
// the reason this one needs no check of the language's own.
// @ts-expect-error: Argument of type 'string' is not assignable to parameter of type 'number'.
export default cs.lift(cs.const((__cs_name: string) => -cs.number(__cs_name)));
