// The values a script splices, the same way the layer below exposes its own.
export { onCleanup, onMount } from "./builtins.js";

export type {
  ArrayLike,
  BacktickElement,
  BacktickNode,
  Builtins,
  ClientFunction,
  ClientHandle,
  ClientUnknown,
  ClientValue,
  Elements,
  ForProps,
  FragmentProps,
  Signal,
  SignalOptions,
  State,
  UiPlatformBuiltins,
  UiPlatformElements,
} from "./declarations.js";

// A component, because a tag has nowhere to bind a type parameter: it checks a
// list's child against its array. The tag stays writable on its own, unchecked.
export { For } from "./For.js";

// A drawing as a host builds one: the runtime a target's JSX compiles to, and
// what a component is. Here rather than below, because what these are made of
// is what this schema declares.
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
export type { Children } from "./Children.js";
