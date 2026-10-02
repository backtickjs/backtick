// `solid-js/store`, name for name, in the order its `index.ts` exports them.
import type { Client } from "@backtickjs/core";
import type * as Store from "solid-js/store";
import { store } from "./imports.js";

export const $RAW: Client<typeof Store.$RAW> = store("$RAW");
export const createStore: Client<typeof Store.createStore> =
  store("createStore");
export const unwrap: Client<typeof Store.unwrap> = store("unwrap");
export type {
  ArrayFilterFn,
  DeepMutable,
  DeepReadonly,
  NotWrappable,
  Part,
  SetStoreFunction,
  SolidStore,
  Store,
  StoreNode,
  StoreReturn,
  StorePathRange,
  StoreSetter,
} from "solid-js/store";
export const createMutable: Client<typeof Store.createMutable> =
  store("createMutable");
export const modifyMutable: Client<typeof Store.modifyMutable> =
  store("modifyMutable");
export type { ReconcileOptions } from "solid-js/store";
export const reconcile: Client<typeof Store.reconcile> = store("reconcile");
export const produce: Client<typeof Store.produce> = store("produce");

// dev
export const DEV: Client<typeof Store.DEV> = store("DEV");
