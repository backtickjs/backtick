import { cs } from "@backtickjs/core";

// A script prop references the function table from the tree's JSON via
// `#call`; the free host reference `console` resolves as a `#global` leaf
// instead of threading through the tree's slots.
export default <button onClick={cs.lift(() => cs.virtualize(console).log("hi"))} />;
