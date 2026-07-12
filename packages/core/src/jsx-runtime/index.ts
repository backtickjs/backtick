import type { JSXElement, Prop } from "../cs-runtime/index.js";
import { create } from "../cs-runtime/JSXElement.js";

export declare namespace JSX {
  export type Element = JSXElement;
  export interface IntrinsicElements {
    flexbox: {
      direction?: Prop<"row" | "column">;
      children?: Element | readonly Element[];
    };
  }
  export interface ElementChildrenAttribute {
    children: unknown;
  }
  export interface IntrinsicAttributes {
    key?: string | number;
  }
}

export function jsx(
  type: string,
  props: { [key: string]: unknown },
  key?: string | number,
): JSXElement {
  return create(type, props, key);
}

export const jsxs = jsx;
