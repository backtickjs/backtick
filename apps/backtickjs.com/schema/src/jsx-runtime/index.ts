import type { JsxElementType } from "@backtickjs/ui";
import { createFragment, createJsxElement } from "@backtickjs/ui";
import type { BacktickElement } from "@backtickjs/ui";
import type { Elements as Site } from "../declarations.generated.js";

// What the JSX transform reaches for, and what TypeScript reads a tag through.
//
// This site's rather than `@backtickjs/web-client`'s, because this site's
// declares a tag of its own. Everything else is that one's, verbatim: only the
// `Elements` differ.
//
// Written by hand where `declarations.generated.ts` next door is not: what a
// target draws with is its decision, and the tags and their props are the
// schema's.
// The one rule here is that JSX's `IntrinsicElements` is this target's schema
// `Elements` and nothing else: that name extends every base's in turn, so a tag
// a base adds arrives without either end being told, and a tag two of them
// declare is a conflict TypeScript reports rather than a silent winner.

export const Fragment = createFragment();

export declare namespace JSX {
  export interface Element extends BacktickElement {}
  export interface IntrinsicElements extends Site {}
  export type ElementType = JsxElementType;
  export interface ElementChildrenAttribute {
    children: unknown;
  }
}

export function jsx(
  type: JSX.ElementType,
  props: { [key: string]: unknown },
): JSX.Element {
  return createJsxElement(type, props);
}

export const jsxs = jsx;
