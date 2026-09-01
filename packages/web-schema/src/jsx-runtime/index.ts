import type { BacktickElementType } from "@backtickjs/boundary";
import { createElement, createFragment } from "@backtickjs/boundary";
import type { Elements as Web, HtmlNode } from "@backtickjs/web-schema";
import type { Children, ClientElement } from "@backtickjs/boundary";

// What the JSX transform reaches for, and what TypeScript reads a tag through.
//
// Written by hand where `declarations.generated.ts` next door is not: what a
// target draws with is its decision, and the tags and their props are the
// schema's.
// The one rule here is that JSX's `IntrinsicElements` is this target's schema
// `Elements` and nothing else: that name extends every base's in turn, so a tag
// a base adds arrives without either end being told, and a tag two of them
// declare is a conflict TypeScript reports rather than a silent winner.

/**
 * Children with no element of their own.
 *
 * The schema does not declare a fragment: it draws no node and has no tag, so
 * what it holds is this runtime's to say, and it says the same as any element
 * of this target.
 */
export interface FragmentProps {
  children?: Children<HtmlNode>;
}

export const Fragment = createFragment<FragmentProps>();

export declare namespace JSX {
  export interface Element extends ClientElement {}
  export interface IntrinsicElements extends Web {}
  export type ElementType = BacktickElementType<HtmlNode>;
  export interface ElementChildrenAttribute {
    children: unknown;
  }
}

export function jsx(
  type: JSX.ElementType,
  props: { [key: string]: unknown },
): JSX.Element {
  return createElement(type, props);
}

export const jsxs = jsx;
