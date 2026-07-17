import type { ClientElement, Prop } from "@backtickjs/cs-runtime";
import { _jsx } from "@backtickjs/cs-runtime";

export declare namespace JSX {
  // An interface, not an alias: aliases erase in displays, and this is the
  // name hovers and errors should say — `ClientElement` stays internal.
  export interface Element extends ClientElement {}
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
): JSX.Element {
  return _jsx(type, props, key);
}

export const jsxs = jsx;
