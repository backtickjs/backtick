import { createImport } from "@backtickjs/platform-sdk";
import type * as Solid from "solid-js";
import type * as Store from "solid-js/store";
import type * as Web from "solid-js/web";

// Solid's API as a script splices it — `$createSignal(0)` — each typed with
// Solid's own declarations, and each imported from Solid by the bundle that
// uses it.

const solid = <Name extends keyof typeof Solid>(name: Name) =>
  createImport<(typeof Solid)[Name]>({ name, from: "solid-js" });
const store = <Name extends keyof typeof Store>(name: Name) =>
  createImport<(typeof Store)[Name]>({ name, from: "solid-js/store" });
const web = <Name extends keyof typeof Web>(name: Name) =>
  createImport<(typeof Web)[Name]>({ name, from: "solid-js/web" });

// Reactivity
export const createSignal = solid("createSignal");
export const createMemo = solid("createMemo");
export const createEffect = solid("createEffect");
export const createRenderEffect = solid("createRenderEffect");
export const createComputed = solid("createComputed");
export const createReaction = solid("createReaction");
export const createDeferred = solid("createDeferred");
export const createSelector = solid("createSelector");
export const createResource = solid("createResource");
export const batch = solid("batch");
export const untrack = solid("untrack");
export const on = solid("on");
export const startTransition = solid("startTransition");
export const useTransition = solid("useTransition");
export const observable = solid("observable");
export const from = solid("from");

// Lifecycle and ownership
export const onMount = solid("onMount");
export const onCleanup = solid("onCleanup");
export const onError = solid("onError");
export const catchError = solid("catchError");
export const createRoot = solid("createRoot");
export const getOwner = solid("getOwner");
export const runWithOwner = solid("runWithOwner");

// Context, props and children
export const createContext = solid("createContext");
export const useContext = solid("useContext");
export const children = solid("children");
export const mergeProps = solid("mergeProps");
export const splitProps = solid("splitProps");
export const createUniqueId = solid("createUniqueId");
export const lazy = solid("lazy");
export const mapArray = solid("mapArray");
export const indexArray = solid("indexArray");

// Control flow
export const For = solid("For");
export const Index = solid("Index");
export const Show = solid("Show");
export const Switch = solid("Switch");
export const Match = solid("Match");
export const ErrorBoundary = solid("ErrorBoundary");
export const Suspense = solid("Suspense");
export const SuspenseList = solid("SuspenseList");

// Stores
export const createStore = store("createStore");
export const createMutable = store("createMutable");
export const modifyMutable = store("modifyMutable");
export const produce = store("produce");
export const reconcile = store("reconcile");
export const unwrap = store("unwrap");

// The DOM
export const Dynamic = web("Dynamic");
export const Portal = web("Portal");
