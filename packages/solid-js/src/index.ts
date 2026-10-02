// `solid-js`, name for name, in the order its `index.ts` exports them.
import type { Client } from "@backtickjs/core";
import type * as Solid from "solid-js";
import { solid } from "./imports.js";

export const $DEVCOMP: Client<typeof Solid.$DEVCOMP> = solid("$DEVCOMP");
export const $PROXY: Client<typeof Solid.$PROXY> = solid("$PROXY");
export const $TRACK: Client<typeof Solid.$TRACK> = solid("$TRACK");
export const batch: Client<typeof Solid.batch> = solid("batch");
export const catchError: Client<typeof Solid.catchError> = solid("catchError");
export const children: Client<typeof Solid.children> = solid("children");
export const createComputed: Client<typeof Solid.createComputed> =
  solid("createComputed");
export const createContext: Client<typeof Solid.createContext> =
  solid("createContext");
export const createDeferred: Client<typeof Solid.createDeferred> =
  solid("createDeferred");
export const createEffect: Client<typeof Solid.createEffect> =
  solid("createEffect");
export const createMemo: Client<typeof Solid.createMemo> = solid("createMemo");
export const createReaction: Client<typeof Solid.createReaction> =
  solid("createReaction");
export const createRenderEffect: Client<typeof Solid.createRenderEffect> =
  solid("createRenderEffect");
export const createResource: Client<typeof Solid.createResource> =
  solid("createResource");
export const createRoot: Client<typeof Solid.createRoot> = solid("createRoot");
export const createSelector: Client<typeof Solid.createSelector> =
  solid("createSelector");
export const createSignal: Client<typeof Solid.createSignal> =
  solid("createSignal");
export const enableExternalSource: Client<typeof Solid.enableExternalSource> =
  solid("enableExternalSource");
export const enableScheduling: Client<typeof Solid.enableScheduling> =
  solid("enableScheduling");
export const equalFn: Client<typeof Solid.equalFn> = solid("equalFn");
export const getListener: Client<typeof Solid.getListener> =
  solid("getListener");
export const getOwner: Client<typeof Solid.getOwner> = solid("getOwner");
export const on: Client<typeof Solid.on> = solid("on");
export const onCleanup: Client<typeof Solid.onCleanup> = solid("onCleanup");
export const onError: Client<typeof Solid.onError> = solid("onError");
export const onMount: Client<typeof Solid.onMount> = solid("onMount");
export const runWithOwner: Client<typeof Solid.runWithOwner> =
  solid("runWithOwner");
export const startTransition: Client<typeof Solid.startTransition> =
  solid("startTransition");
export const untrack: Client<typeof Solid.untrack> = solid("untrack");
export const useContext: Client<typeof Solid.useContext> = solid("useContext");
export const useTransition: Client<typeof Solid.useTransition> =
  solid("useTransition");
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
export const observable: Client<typeof Solid.observable> = solid("observable");
export const from: Client<typeof Solid.from> = solid("from");
export type { Task } from "solid-js";
export const requestCallback: Client<typeof Solid.requestCallback> =
  solid("requestCallback");
export const cancelCallback: Client<typeof Solid.cancelCallback> =
  solid("cancelCallback");
export const mapArray: Client<typeof Solid.mapArray> = solid("mapArray");
export const indexArray: Client<typeof Solid.indexArray> = solid("indexArray");
export const enableHydration: Client<typeof Solid.enableHydration> =
  solid("enableHydration");
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
export const createComponent: Client<typeof Solid.createComponent> =
  solid("createComponent");
export type { MergeProps } from "solid-js";
export const mergeProps: Client<typeof Solid.mergeProps> = solid("mergeProps");
export type { SplitProps } from "solid-js";
export const splitProps: Client<typeof Solid.splitProps> = solid("splitProps");
export const lazy: Client<typeof Solid.lazy> = solid("lazy");
export const createUniqueId: Client<typeof Solid.createUniqueId> =
  solid("createUniqueId");
export const For: Client<typeof Solid.For> = solid("For");
export const Index: Client<typeof Solid.Index> = solid("Index");
export const Show: Client<typeof Solid.Show> = solid("Show");
export const Switch: Client<typeof Solid.Switch> = solid("Switch");
export type { MatchProps } from "solid-js";
export const Match: Client<typeof Solid.Match> = solid("Match");
export const resetErrorBoundaries: Client<typeof Solid.resetErrorBoundaries> =
  solid("resetErrorBoundaries");
export const ErrorBoundary: Client<typeof Solid.ErrorBoundary> =
  solid("ErrorBoundary");
export const SuspenseList: Client<typeof Solid.SuspenseList> =
  solid("SuspenseList");
export const Suspense: Client<typeof Solid.Suspense> = solid("Suspense");
export const sharedConfig: Client<typeof Solid.sharedConfig> =
  solid("sharedConfig");

// The adapter's, where Solid's names its own: what a tag is typed through here.
export type { JSX } from "./jsx-runtime.js";
export type { JSXElement } from "solid-js";

// dev
export const DEV: Client<typeof Solid.DEV> = solid("DEV");
