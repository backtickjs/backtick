import type { JsxElementType } from "@backtickjs/boundary";
import { createFragment, createJsxElement } from "@backtickjs/boundary";
import type { Elements as Web, FragmentProps } from "@backtickjs/web-schema";
import type { BacktickElement } from "@backtickjs/boundary";

// What the JSX transform reaches for, and what TypeScript reads a tag through.
//
// Written by hand where `declarations.generated.ts` next door is not: what a
// target draws with is its decision, and the tags and their props are the
// schema's.
// The one rule here is that JSX's `IntrinsicElements` is this target's schema
// `Elements` and nothing else: that name extends every base's in turn, so a tag
// a base adds arrives without either end being told, and a tag two of them
// declare is a conflict TypeScript reports rather than a silent winner.

// The fragment is the schema's, like every other element the language owns —
// what it holds is `FragmentProps` there. What is this runtime's is the binding
// TypeScript resolves `<>` to, which is what this is.
export const Fragment = createFragment<FragmentProps>();

export declare namespace JSX {
  export interface Element extends BacktickElement {}
  export interface IntrinsicElements extends Web {}
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
