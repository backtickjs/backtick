import type { BacktickElement, Children } from "@backtickjs/core-schema";
import type { JsxElementType } from "@backtickjs/cs-runtime";
import { createFragment, createJsxElement } from "@backtickjs/cs-runtime";
import type { IntrinsicElements as Web } from "../schema.generated.js";

// What the JSX transform reaches for, and what TypeScript reads a tag through.
//
// Written by hand where `schema.generated.ts` next door is not: what a target
// draws with is its decision, and the tags and their props are the schema's.
// The one rule here is that `IntrinsicElements` extends what each schema
// declared — this target's today, and every base's as they come — so a tag a
// base adds arrives without either knowing about the other, and a tag two of
// them declare is a conflict TypeScript reports rather than a silent winner.

/**
 * Children with no element of their own.
 *
 * The schema does not declare a fragment: it draws no node and has no tag, so
 * what it holds is this runtime's to say, and it says the same as any element
 * of this target.
 */
export interface FragmentProps {
  children?: Children<BacktickElement | string | number>;
}

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
