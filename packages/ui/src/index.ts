export type * from "./declarations.generated.js";

// Components, because a tag has nowhere to bind a type parameter: these check a
// list's child against its array, and a bundle's props against what it takes.
// The tags stay writable on their own, unchecked.
export { For } from "./For.js";
export { Backtick } from "./Backtick.js";
export { BacktickWithProps } from "./BacktickWithProps.js";

// A drawing as a host builds one: the runtime a target's JSX compiles to, and
// what a component is. Here rather than below, because what these are made of
// is what this schema declares.
export type { ServerComponent } from "./ServerComponent.js";
export {
  createJsxElement,
  isJsxElement,
  type JsxElement,
  type JsxElementType,
} from "./JsxElement.js";
export { createFragment, type Fragment } from "./Fragment.js";

// What a prop admits. Here rather than with the language, because a prop is a
// position in a drawing: the wrapper is JSX's rule, and JSX is what this is.
export type { Prop } from "./Prop.js";
