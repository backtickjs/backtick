export type {
  Client,
  ClientUnknown,
  ClientValue,
  Spliceable,
} from "@backtickjs/boundary";
export type { ReadonlyState, State } from "@backtickjs/language-schema";
export { state } from "@backtickjs/language-schema";
export type { BacktickElement, Children, Prop } from "@backtickjs/boundary";

// The boundary itself, which is the one thing here that is nobody else's.
export { cs } from "./cs.js";
// `For` is the language's, not a target's: what it draws is whatever the
// elements around it are, and every client answers for it. A target's own
// vocabulary lives in that target's SDK.
export { For } from "@backtickjs/ui-schema";
