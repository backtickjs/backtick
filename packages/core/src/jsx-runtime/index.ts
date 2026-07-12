import type { JSXElement, Prop } from "../cs-runtime/index.js";

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
  if (key !== undefined && typeof key !== "string" && typeof key !== "number") {
    throw new Error("Key must be a string or a number");
  }
  return {
    "@backtickjs": "JSXElement",
    type,
    key: key ?? null,
    props,
  };
}

export const jsxs = jsx;
