export {
  type Children,
  type Client,
  type ClientUnknown,
  type ClientValue,
  type JsxElement,
  type Prop,
  type ReadonlyState,
  type Spliceable,
  type State,
  cs,
  state,
} from "@backtickjs/cs-runtime";
// `For` is the language's, not a target's: what it draws is whatever the
// elements around it are, and every client answers for it. A target's own
// vocabulary lives in that target's SDK.
export { For } from "@backtickjs/cs-runtime";
