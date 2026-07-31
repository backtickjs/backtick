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
  // A tag, or a component of the app's own — and nothing else, which is how
  // `<View />` in a web app is a type error rather than something that quietly
  // renders. What keeps a portable component out is the marker on
  // `ServerComponent` itself: leaving `ClientElement` out of this union does
  // nothing on its own, because one is callable and returns `never` and so
  // satisfies any signature. `<>…</>` needs no place here either — TypeScript
  // resolves a fragment through the `Fragment` export rather than this type —
  // so `<>…</>` works and an explicit `<Fragment>` does not. Admitting it would
  // mean admitting a `ClientElement`, and the only thing then keeping `<View />`
  // out is that the two targets' `FragmentProps` happen to differ.
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

// The one element no vocabulary owns: every target re-exports it under this
// name because that is what the JSX transform imports for `<>…</>`.
export { Fragment, type FragmentProps } from "./Fragment.js";
