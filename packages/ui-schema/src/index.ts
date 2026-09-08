export type * from "./declarations.generated.js";

// Components, because a tag has nowhere to bind a type parameter: these check a
// list's child against its array, and a bundle's props against what it takes.
// The tags stay writable on their own, unchecked.
export { For } from "./For.js";
export { Backtick } from "./Backtick.js";
