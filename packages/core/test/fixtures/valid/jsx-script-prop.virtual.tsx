import { cs } from "@backtickjs/core";

// A script prop references the function table from the tree's JSON via
// `#call`; the free host reference `console` resolves as a `#global` leaf
// instead of threading through the tree's slots.
//
// @ts-expect-error -- the compiler transform supports free host references,
// but its typechecker can't resolve them inside a script body yet; drop this
// once it can.
export default <button onClick={cs.lift(() => __cs_console.log("hi"))} />;
