import {
  createClientElement,
  createJsxElement,
  type ClientElement,
  type JsxElement,
  type Key,
  type ServerComponent,
} from "@backtickjs/cs-runtime";
import type { IntrinsicElements as Html } from "./elements.js";

// The JSX a web app writes: HTML tags, and the components built from them.
//
// A target's elements are the target's, so they are declared here rather than
// in core — TypeScript reads the `JSX` namespace from whatever module
// `jsxImportSource` names, so an app choosing this one gets `<div>` and, by
// the same rule, does not get `<View>`. An app that means to run on more than
// the web points `jsxImportSource` at `@backtickjs/core` instead and gets the
// portable vocabulary, which no browser tag can leak into.
//
//   // tsconfig.json
//   "jsx": "react-jsx",
//   "jsxImportSource": "@backtickjs/web-sdk"

export declare namespace JSX {
  export interface Element extends JsxElement {}
  export interface IntrinsicElements extends Html {}
  // A tag, or a component of the app's own. `<>…</>` needs no place here —
  // TypeScript resolves a fragment through the `Fragment` export rather than
  // through this type.
  //
  // The portable components are not this target's vocabulary, and leaving
  // `ClientElement` out of the union is not enough to say so: one is callable
  // and returns `never`, which makes it assignable to `ServerComponent`
  // anyway. So the brand every `ClientElement` carries is excluded by hand,
  // and `<View />` in a web app is a type error rather than something that
  // quietly renders.
  export type ElementType = keyof IntrinsicElements | ServerComponent<never>;
  export interface ElementChildrenAttribute {
    children: unknown;
  }
  export interface IntrinsicAttributes {
    key?: Key;
  }
}

// A tag is an element whose id is the tag name — the same shape a component
// like `View` has, built here instead of being declared one by one. Interned,
// so every `<div>` in a bundle is the one element and the bundler's sharing
// works on tags as it does on components.
const tags = new Map<string, ClientElement<never>>();

function tag(name: string): ClientElement<never> {
  const known = tags.get(name);
  if (known !== undefined) {
    return known;
  }
  const made = createClientElement<never>(name);
  tags.set(name, made);
  return made;
}

export function jsx(
  type: JSX.ElementType,
  props: { [key: string]: unknown },
  key?: Key,
): JSX.Element {
  return createJsxElement(
    typeof type === "string" ? tag(type) : type,
    props,
    key,
  );
}

export const jsxs = jsx;

export { Fragment } from "@backtickjs/core";
