import {
  createJsxElement,
  type JsxElement,
  type ServerComponent,
} from "@backtickjs/cs-runtime";
import { For } from "@backtickjs/cs-runtime";
import { Fragment } from "./elements.js";
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
  // A tag, a component of the app's own, or one of the two that arrange rather
  // than name — and nothing else. A tag is a key of `IntrinsicElements`, so a
  // name this target does not declare is a type error rather than something
  // that quietly renders.
  export type ElementType =
    | keyof IntrinsicElements
    | typeof Fragment
    | typeof For
    | ServerComponent<never>;
  export interface ElementChildrenAttribute {
    children: unknown;
  }
}

// A tag is its own id, so nothing stands for one: `<div>` reaches the bundler
// as `"div"`, which is the string the wire carries and the one a client
// script's element already writes.
export function jsx(
  type: JSX.ElementType,
  props: { [key: string]: unknown },
): JSX.Element {
  return createJsxElement(type, props);
}

export const jsxs = jsx;

// The one element no vocabulary owns: every target re-exports it under this
// name because that is what the JSX transform imports for `<>…</>`.
export { Fragment, type FragmentProps } from "./elements.js";
