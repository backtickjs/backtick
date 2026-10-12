import {
  createJsxElement,
  cs,
  type Client,
  type JsxElementOf,
  type JsxElementTypeOf,
  type Spliceable,
} from "@backtickjs/core";
import type { JSX as React, ReactElement, ReactNode } from "react";
import { createElement, Fragment as ReactFragment } from "./index.js";

// JSX as React types it, for a host's JSX and a script's alike: an element is
// also a client value, so a host hands one over, and a tag may also name a
// server component, which answers a script.
export declare namespace JSX {
  export type Element = JsxElementOf<React.Element>;
  export type ElementType = JsxElementTypeOf<ReactNode> | React.ElementType;
  export type ElementClass = React.ElementClass;
  export type ElementAttributesProperty = React.ElementAttributesProperty;
  export type ElementChildrenAttribute = React.ElementChildrenAttribute;
  export type LibraryManagedAttributes<C, P> = React.LibraryManagedAttributes<
    C,
    P
  >;
  export type IntrinsicAttributes = React.IntrinsicAttributes;
  export type IntrinsicClassAttributes<T> = React.IntrinsicClassAttributes<T>;
  export type IntrinsicElements = React.IntrinsicElements;
}

/**
 * `<>` and `<Fragment>` on the host: its children as React's fragment's, each
 * an argument rather than an array, so React asks none of them for a key.
 */
export function Fragment(props: {
  children?: Spliceable;
}): Client<ReactElement> {
  const children: readonly Spliceable[] =
    props.children === undefined
      ? []
      : Array.isArray(props.children)
        ? props.children
        : [props.children];
  return cs`$createElement(
    $ReactFragment,
    null,
    ...($children as ReactNode[]),
  )`;
}

// A server component's element: expanded on the host when a bundle is built,
// what it answers standing where it stood. Hooks belong to client components,
// as in React: a server component's output is a node, never rendered as one.
// Its `key`, which the JSX transform passes apart from the props, keys a
// fragment around that node, so React can tell a list's entries apart.
export function jsx(
  type: JSX.ElementType,
  props: unknown,
  key?: string | number,
): JSX.Element {
  // Core's element, as this adapter types it: a stand-in for a React element.
  const element = createJsxElement(
    type as (props: never) => unknown,
    props,
  ) as unknown as JSX.Element;
  if (key === undefined) {
    return element;
  }
  return cs`$createElement(
    $ReactFragment,
    { key: $key },
    $element,
  )` as JSX.Element;
}

export const jsxs = jsx;
// What a development build of the JSX transform calls, as Bun does.
export const jsxDEV = jsx;
