import type { ClientElement, Element, Prop } from "../cs-runtime/index.js";

export declare namespace JSX {
  export type Element = ClientElement;
  export interface IntrinsicElements {
    flexbox: {
      direction?: Prop<"row" | "column">;
      children?: ClientElement | readonly ClientElement[];
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
  key?: unknown,
): ClientElement {
  if (key !== undefined && typeof key !== "string" && typeof key !== "number") {
    throw new Error("Key must be a string or a number");
  }
  return {
    "@backtickjs": true as unknown as Element,
    type,
    key: key ?? null,
    props,
  };
}

export const jsxs = jsx;
