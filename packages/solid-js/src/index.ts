// `solid-js`, name for name, in the order its `index.ts` exports them.
import { solid } from "./imports.js";

export const $DEVCOMP = solid("$DEVCOMP");
export const $PROXY = solid("$PROXY");
export const $TRACK = solid("$TRACK");
export const batch = solid("batch");
export const catchError = solid("catchError");
export const children = solid("children");
export const createComputed = solid("createComputed");
export const createContext = solid("createContext");
export const createDeferred = solid("createDeferred");
export const createEffect = solid("createEffect");
export const createMemo = solid("createMemo");
export const createReaction = solid("createReaction");
export const createRenderEffect = solid("createRenderEffect");
export const createResource = solid("createResource");
export const createRoot = solid("createRoot");
export const createSelector = solid("createSelector");
export const createSignal = solid("createSignal");
export const enableExternalSource = solid("enableExternalSource");
export const enableScheduling = solid("enableScheduling");
export const equalFn = solid("equalFn");
export const getListener = solid("getListener");
export const getOwner = solid("getOwner");
export const on = solid("on");
export const onCleanup = solid("onCleanup");
export const onError = solid("onError");
export const onMount = solid("onMount");
export const runWithOwner = solid("runWithOwner");
export const startTransition = solid("startTransition");
export const untrack = solid("untrack");
export const useContext = solid("useContext");
export const useTransition = solid("useTransition");
export type {
  Accessor,
  AccessorArray,
  ChildrenReturn,
  Context,
  ContextProviderComponent,
  EffectFunction,
  EffectOptions,
  InitializedResource,
  InitializedResourceOptions,
  InitializedResourceReturn,
  MemoOptions,
  NoInfer,
  OnEffectFunction,
  OnOptions,
  Owner,
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
  Transition,
} from "solid-js";

export type { ObservableObserver } from "solid-js";
export const observable = solid("observable");
export const from = solid("from");
export type { Task } from "solid-js";
export const requestCallback = solid("requestCallback");
export const cancelCallback = solid("cancelCallback");
export const mapArray = solid("mapArray");
export const indexArray = solid("indexArray");
export const enableHydration = solid("enableHydration");
export type {
  Component,
  VoidProps,
  VoidComponent,
  ParentProps,
  ParentComponent,
  FlowProps,
  FlowComponent,
  PropsWithChildren,
  ValidComponent,
  ComponentProps,
  Ref,
} from "solid-js";
export const createComponent = solid("createComponent");
export type { MergeProps } from "solid-js";
export const mergeProps = solid("mergeProps");
export type { SplitProps } from "solid-js";
export const splitProps = solid("splitProps");
export const lazy = solid("lazy");
export const createUniqueId = solid("createUniqueId");
export const For = solid("For");
export const Index = solid("Index");
export const Show = solid("Show");
export const Switch = solid("Switch");
export type { MatchProps } from "solid-js";
export const Match = solid("Match");
export const resetErrorBoundaries = solid("resetErrorBoundaries");
export const ErrorBoundary = solid("ErrorBoundary");
export const SuspenseList = solid("SuspenseList");
export const Suspense = solid("Suspense");
export const sharedConfig = solid("sharedConfig");

// The adapter's, where Solid's names its own: what a tag is typed through here.
export type { JSX } from "./jsx-runtime.js";
export type { JSXElement } from "solid-js";

// dev
export const DEV = solid("DEV");
