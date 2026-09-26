import { createJsxElement } from "@backtickjs/bundler";
import type { ClientHandle, Spliceable } from "@backtickjs/core";
import type { JSX as Solid } from "solid-js";

// What the JSX transform reaches for in a file drawn with this adapter, and
// what TypeScript reads a tag through: Solid's elements, each attribute a
// `Prop` — host data, or a script standing for it — so what a script hands an
// element is checked the way a host's is.

/**
 * Children with no element of their own: `<>` and `<Fragment>`. Solid has no
 * component for it — its compiler writes a fragment as an array — so this is a
 * server component whose drawing is that array. Always an array, so a single
 * child that is a script stays a child, read where it stands, rather than a
 * script the component drew.
 */
export function Fragment(props: { children?: Children }): JSX.Element {
  // What JSX types a drawing as; the bundler writes the array as it is.
  return [props.children] as unknown as JSX.Element;
}

declare const ElementBrand: unique symbol;

/**
 * What a prop admits: what the server wrote, or a script standing in for it. A
 * function has no written form — client behaviour is `cs`...` — so a handler
 * prop is left with the script arm alone.
 */
export type Prop<T> = Spliceable<T>;

/**
 * What may stand inside an element: one thing, or several. A script may stand
 * where a value is written; a list that changes is drawn with `<For />`.
 */
export type Children =
  | Prop<JSX.Element | string | number | null>
  | readonly Children[];

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
  /**
   * A drawing, as a host builds one from a tag or a script evaluates to one.
   * Opaque: what it is made of belongs to whichever side made it.
   */
  export interface Element extends ClientHandle {
    readonly [ElementBrand]: never;
  }
  export interface IntrinsicElements extends Elements {}
  /** A tag: an element to draw, or a component that answers a drawing. */
  export type ElementType =
    | string
    | ((props: never) => Prop<Element | null>)
    | ((props: never) => Promise<Prop<Element | null>>);
  export interface ElementChildrenAttribute {
    children: unknown;
  }
}

export function jsx(
  type: JSX.ElementType,
  props: { [key: string]: unknown },
): JSX.Element {
  return createJsxElement(type, props) as unknown as JSX.Element;
}

export const jsxs = jsx;
