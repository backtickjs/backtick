export type {
  Client,
  ClientUnknown,
  ClientValue,
  Spliceable,
} from "@backtickjs/platform-sdk";
export type { Signal, SignalOptions, State } from "@backtickjs/platform-sdk";
export { computed, state } from "@backtickjs/platform-sdk";
export type { Prop } from "@backtickjs/ui-platform-sdk";
export type {
  BacktickElement,
  BacktickNode,
} from "@backtickjs/ui-platform-sdk";
export type { Bundle } from "@backtickjs/platform-sdk";

export { cs } from "@backtickjs/client-script";
// `For`, `onMount` and `onCleanup` are the language's, not a target's: every
// client that draws answers for them. A target's own vocabulary lives in that
// target's SDK.
export { For, onCleanup, onMount } from "@backtickjs/ui-platform-sdk";
