import type { ClientUIElement, Prop } from "@backtickjs/cs-runtime";
import { create } from "@backtickjs/cs-runtime/ClientUIElement";

export declare namespace JSX {
  export type Element = ClientUIElement;
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
): ClientUIElement {
  return create(type, props, key);
}

export const jsxs = jsx;
