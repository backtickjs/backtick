import type {
  BacktickElement,
  Children,
  JsxElementType,
  Prop,
} from "@backtickjs/ui-platform-sdk";
import { createFragment, createJsxElement } from "@backtickjs/ui-platform-sdk";
import type { JSX as Solid } from "solid-js";

// What the JSX transform reaches for in a file drawn with this adapter, and
// what TypeScript reads a tag through: Solid's elements, each attribute a
// `Prop` — host data, or a script standing for it — so what a script hands an
// element is checked the way a host's is.

export const Fragment = createFragment();

// An element's props as Solid types them, each a `Prop`, and its children.
type Props<Attributes> = {
  [Key in keyof Attributes as Key extends "children"
    ? never
    : Key]?: Prop<Exclude<Attributes[Key], undefined>>;
} & { children?: Children };

type Elements = {
  [Tag in keyof Solid.IntrinsicElements]: Props<Solid.IntrinsicElements[Tag]>;
};

export declare namespace JSX {
  export interface Element extends BacktickElement {}
  export interface IntrinsicElements extends Elements {}
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
