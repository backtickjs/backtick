export type {
  Client,
  ClientUnknown,
  ClientValue,
  Spliceable,
} from "@backtickjs/language";
export type {
  ReadonlyState,
  RequestInit,
  Response,
  State,
} from "@backtickjs/language";
export { fetch, state } from "@backtickjs/language";
export type { Prop } from "@backtickjs/language";
export type { BacktickElement, BacktickNode } from "@backtickjs/ui-schema";
export type { Bundle } from "@backtickjs/language";

export { cs } from "@backtickjs-internal/client-script";
// `For` is the language's, not a target's: what it draws is whatever the
// elements around it are, and every client answers for it. A target's own
// vocabulary lives in that target's SDK.
export { Backtick, BacktickWithProps, For } from "@backtickjs/ui-schema";
