export type {
  Client,
  ClientUnknown,
  ClientValue,
  Spliceable,
} from "@backtickjs/language";
export type { HttpResponse, ReadonlyState, State } from "@backtickjs/language";
export { http, state, vm } from "@backtickjs/language";
export type { Prop } from "@backtickjs/ui";
export type { BacktickElement, BacktickNode } from "@backtickjs/ui";
export type { Bundle } from "@backtickjs/language";

export { cs } from "@backtickjs/client-script";
// `For` is the language's, not a target's: what it draws is whatever the
// elements around it are, and every client answers for it. A target's own
// vocabulary lives in that target's SDK.
export { For } from "@backtickjs/ui";
