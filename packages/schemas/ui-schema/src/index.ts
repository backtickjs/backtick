// Passed along from the language, because a schema built on this one reaches
// for it here: a generated builtin is made the same way at every layer, and the
// layer above imports it from the layer it extends.
export {
  createBuiltin,
  isBuiltin,
  type Builtin,
} from "@backtickjs/language-schema";
export { For } from "./For.js";
export { createFragment, type Fragment } from "./Fragment.js";
export {
  createJsxElement,
  isJsxElement,
  type JsxElement,
  type JsxElementType,
} from "./JsxElement.js";
export type { ServerComponent } from "./ServerComponent.js";
export type { Children } from "./Children.js";
export type { Prop } from "./Prop.js";
export type * from "./declarations.generated.js";
