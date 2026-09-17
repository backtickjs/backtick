import { cs } from "@backtickjs/core";

// A computed key is a string: JavaScript would convert a number, and a client
// that isn't JavaScript has no such conversion to agree on.
// @ts-expect-error: Argument of type 'number' is not assignable to parameter of type 'string'.
export default cs`(at: number) => ({ [at]: "one" })`;
