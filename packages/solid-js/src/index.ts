import { type ClientImport, createImport } from "@backtickjs/core";
import type * as Solid from "solid-js";
import type * as Store from "solid-js/store";
import type * as Web from "solid-js/web";
import type { JSX, Prop } from "./jsx-runtime.js";

// Solid's API as a script splices it — `$createSignal(0)` — each typed with
// Solid's own declarations, and each imported from Solid by the bundle that
// uses it. Every name `solid-js` exports, its types included.

export type {
  Accessor,
  AccessorArray,
  ChildrenReturn,
  Component,
  ComponentProps,
  Context,
  ContextProviderComponent,
  EffectFunction,
  EffectOptions,
  FlowComponent,
  FlowProps,
  InitializedResource,
  InitializedResourceOptions,
  InitializedResourceReturn,
  JSXElement,
  MatchProps,
  MemoOptions,
  MergeProps,
  NoInfer,
  ObservableObserver,
  OnEffectFunction,
  OnOptions,
  Owner,
  ParentComponent,
  ParentProps,
  PropsWithChildren,
  Ref,
  ResolvedChildren,
  ResolvedJSXElement,
  Resource,
  ResourceActions,
  ResourceFetcher,
  ResourceFetcherInfo,
  ResourceOptions,
  ResourceReturn,
  ResourceSource,
  ReturnTypes,
  Setter,
  Signal,
  SignalOptions,
  SplitProps,
  Task,
  Transition,
  ValidComponent,
  VoidComponent,
  VoidProps,
} from "solid-js";
// The adapter's, where Solid's names its own: what a tag is typed through here.
export type { JSX } from "./jsx-runtime.js";

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

// Internals, scheduling, hydration and development hooks
export const $DEVCOMP = solid("$DEVCOMP");
export const $PROXY = solid("$PROXY");
export const $TRACK = solid("$TRACK");
export const DEV = solid("DEV");
export const sharedConfig = solid("sharedConfig");
export const createComponent = solid("createComponent");
export const equalFn = solid("equalFn");
export const getListener = solid("getListener");
export const requestCallback = solid("requestCallback");
export const cancelCallback = solid("cancelCallback");
export const enableScheduling = solid("enableScheduling");
export const enableExternalSource = solid("enableExternalSource");
export const enableHydration = solid("enableHydration");
export const resetErrorBoundaries = solid("resetErrorBoundaries");

// Stores
export const createStore = store("createStore");
export const createMutable = store("createMutable");
export const modifyMutable = store("modifyMutable");
export const produce = store("produce");
export const reconcile = store("reconcile");
export const unwrap = store("unwrap");

// The DOM
export const Dynamic = web("Dynamic");

/** Solid's `render`, typed with the adapter's drawing: `code` into `element`. */
export const render = createImport<
  (code: () => JSX.Element, element: Node) => () => void
>({ name: "render", from: "solid-js/web" });

// Control flow, typed as components so a tag may name one in host JSX as well
// as inside a script. None is callable on the host: JSX hands the import to the
// bundler, which writes it as the tag.

/** Solid's `For`: `children` drawn once per member of `each`, keyed by it. */
export const For = solid("For") as ClientImport<typeof Solid.For> &
  (<T>(props: {
    each: Prop<readonly T[] | undefined | null | false>;
    fallback?: Prop<JSX.Element>;
    children: Prop<(item: T, index: () => number) => JSX.Element>;
  }) => JSX.Element);

/** Solid's `Index`: `children` drawn once per position of `each`. */
export const Index = solid("Index") as ClientImport<typeof Solid.Index> &
  (<T>(props: {
    each: Prop<readonly T[] | undefined | null | false>;
    fallback?: Prop<JSX.Element>;
    children: Prop<(item: () => T, index: number) => JSX.Element>;
  }) => JSX.Element);

/** Solid's `Show`: `children` while `when` holds, `fallback` otherwise. */
export const Show = solid("Show") as ClientImport<typeof Solid.Show> &
  (<T>(props: {
    when: Prop<T | undefined | null | false>;
    fallback?: Prop<JSX.Element>;
    children: Prop<JSX.Element | ((item: () => T) => JSX.Element)>;
  }) => JSX.Element);

/** Solid's `Switch`: its first `Match` whose `when` holds, or `fallback`. */
export const Switch = solid("Switch") as ClientImport<typeof Solid.Switch> &
  ((props: {
    fallback?: Prop<JSX.Element>;
    children: Prop<JSX.Element>;
  }) => JSX.Element);

/** Solid's `Match`: one case of a `Switch`. */
export const Match = solid("Match") as ClientImport<typeof Solid.Match> &
  (<T>(props: {
    when: Prop<T | undefined | null | false>;
    children: Prop<JSX.Element | ((item: () => T) => JSX.Element)>;
  }) => JSX.Element);

/** Solid's `ErrorBoundary`: `fallback` in place of `children` that threw. */
export const ErrorBoundary = solid("ErrorBoundary") as ClientImport<
  typeof Solid.ErrorBoundary
> &
  ((props: {
    fallback: Prop<
      JSX.Element | ((error: unknown, reset: () => void) => JSX.Element)
    >;
    children: Prop<JSX.Element>;
  }) => JSX.Element);

/** Solid's `Suspense`: `fallback` until the resources `children` read load. */
export const Suspense = solid("Suspense") as ClientImport<
  typeof Solid.Suspense
> &
  ((props: {
    fallback?: Prop<JSX.Element>;
    children: Prop<JSX.Element>;
  }) => JSX.Element);

/** Solid's `SuspenseList`: the order its `Suspense` children reveal in. */
export const SuspenseList = solid("SuspenseList") as ClientImport<
  typeof Solid.SuspenseList
> &
  ((props: {
    revealOrder: Prop<"forwards" | "backwards" | "together">;
    tail?: Prop<"collapsed" | "hidden">;
    children: Prop<JSX.Element>;
  }) => JSX.Element);

/** Solid's `Portal`: `children` drawn into `mount`, the body where none is given. */
export const Portal = web("Portal") as ClientImport<typeof Web.Portal> &
  ((props: {
    mount?: Prop<Node>;
    useShadow?: Prop<boolean>;
    isSVG?: Prop<boolean>;
    children: Prop<JSX.Element>;
  }) => JSX.Element);
