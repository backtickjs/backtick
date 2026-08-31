import { cs } from "@backtickjs/core";

// A negative literal is written as one, and reaches the wire as one: `-1` is a
// prefix operator on `1` in TypeScript's AST and in this one, and a number on
// the wire, where every literal carries itself.
//
// Negating something computed is the same operator with nothing to fold.
export default cs.lift(cs.const((__cs_count: number) => {
    const __cs_floor = cs.const(-cs.number(1));
    const __cs_step = cs.const(-cs.number(__cs_count));
    return cs.const(__cs_floor + __cs_step + -cs.number(2));
}));
