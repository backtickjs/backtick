import type {
  ClientElement,
  JsxElement,
  Key,
  ServerComponent,
} from "@backtickjs/cs-runtime";
import { createJsxElement } from "@backtickjs/cs-runtime";

export declare namespace JSX {
  export interface Element extends JsxElement {}
  export type ElementType = ClientElement<never> | ServerComponent<never>;
  export interface ElementChildrenAttribute {
    children: unknown;
  }
  export interface IntrinsicAttributes {
    key?: Key;
  }
}

export function jsx(
  type: JSX.ElementType,
  props: { [key: string]: unknown },
  key?: Key,
): JSX.Element {
  return createJsxElement(type, props, key);
}

export const jsxs = jsx;
