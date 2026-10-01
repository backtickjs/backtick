// `solid-js/store`, name for name, in the order its `index.ts` exports them.
import { store } from "./imports.js";

export const $RAW = store("$RAW");
export const createStore = store("createStore");
export const unwrap = store("unwrap");
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
export const createMutable = store("createMutable");
export const modifyMutable = store("modifyMutable");
export type { ReconcileOptions } from "solid-js/store";
export const reconcile = store("reconcile");
export const produce = store("produce");

// dev
export const DEV = store("DEV");
