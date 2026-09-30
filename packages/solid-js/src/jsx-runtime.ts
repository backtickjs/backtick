import { createJsxElement } from "@backtickjs/core";
import type { BacktickElement, Client, Spliceable } from "@backtickjs/core";
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
export function Fragment(props: { children?: Prop<JSX.Element> }): JSX.Element {
  // What JSX types a drawing as; the bundler writes the array as it is.
  return [props.children] as unknown as JSX.Element;
}

/**
 * What a prop admits: what the server wrote, or a script standing in for it. A
 * function has no written form — client behaviour is `cs`...` — so a handler
 * prop is left with the script arm alone.
 */
export type Prop<T> = Client<T> | SplicesTo<T>;

/**
 * What a host value of type `T` splices to: the pair to `Client<T>`, which is
 * what a host writes instead where it cannot write the value itself.
 *
 * A container member by member, a primitive as itself, and a function as a
 * host function taking and answering with scripts. Where the client wants
 * anything, any host value that splices will do.
 */
type SplicesTo<T> = unknown extends T
  ? Spliceable
  : T extends (...args: infer Args) => infer Returned
    ? (...args: { [Key in keyof Args]: Client<Args[Key]> }) => Client<Returned>
    : T extends readonly (infer Item)[]
      ? readonly Prop<Item>[]
      : T extends { readonly [key: string]: unknown }
        ? { readonly [Key in keyof T]: Prop<T[Key]> }
        : T extends null | undefined | number | boolean | string
          ? T
          : never;

// An element's props as Solid types them, each a `Prop`, and its children.
type Props<Attributes> = {
  [Key in keyof Attributes as Key extends "children" ? never : Key]?: Prop<
    Exclude<Attributes[Key], undefined>
  >;
} & { children?: Prop<JSX.Element> };

type Elements = {
  [Tag in keyof Solid.IntrinsicElements]: Props<Solid.IntrinsicElements[Tag]>;
};

export declare namespace JSX {
  /** Solid's `JSX.Element`, with a `BacktickElement` where Solid has a `Node`. */
  export type Element =
    | BacktickElement
    | ArrayElement
    | (string & {})
    | number
    | boolean
    | null
    | undefined;
  export interface ArrayElement extends Array<Element> {}
  export interface IntrinsicElements extends Elements {}
  /** A tag: an element to draw, or a component that answers a drawing. */
  export type ElementType =
    | string
    | ((props: never) => Prop<Element>)
    | ((props: never) => Promise<Prop<Element>>);
  export interface ElementChildrenAttribute {
    children: unknown;
  }
}

export function jsx(type: JSX.ElementType, props: unknown): JSX.Element {
  return createJsxElement(type, props);
}

export const jsxs = jsx;
// What a development build of the JSX transform calls, as Bun does.
export const jsxDEV = jsx;
