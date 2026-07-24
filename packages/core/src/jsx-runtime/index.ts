import type { Component, JsxElement } from "@backtickjs/cs-runtime";
import { _jsx } from "@backtickjs/cs-runtime";

export declare namespace JSX {
  // An interface, not an alias: aliases erase in displays, and this is the
  // name hovers and errors should say — `JsxElement` stays internal.
  export interface Element extends JsxElement {}
  // Every tag is a component — a client component names an element, a server
  // component builds one. There are no intrinsic elements, so
  // `IntrinsicElements` is deliberately absent rather than empty: declaring
  // it, even empty, lets a consumer augment intrinsics back in.
  export type ElementType = Component;
  export interface ElementChildrenAttribute {
    children: unknown;
  }
  export interface IntrinsicAttributes {
    key?: string | number;
  }
}

export function jsx(
  type: JSX.ElementType,
  props: { [key: string]: unknown },
  key?: string | number,
): JSX.Element {
  // The tag is stored as written: bundling is what runs it, so a server
  // component never runs for a tree nobody bundles.
  return _jsx(type, props, key);
}

export const jsxs = jsx;
