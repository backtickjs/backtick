import { cs } from "@backtickjs/core";

// A negative literal is written as one, and reaches the wire as one: `-1` is a
// prefix operator on `1` in TypeScript's AST and in this one, and a number on
// the wire, where every literal carries itself.
//
// Negating something computed is the same operator with nothing to fold.
export default cs`(count: number) => {
  const floor = -1;
  const step = -count;
  return floor + step + -2;
}`;
