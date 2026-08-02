import type {
  ClientElement,
  JsxElement,
  ServerComponent,
} from "@backtickjs/cs-runtime";
import { createJsxElement } from "@backtickjs/cs-runtime";

export declare namespace JSX {
  export interface Element extends JsxElement {}
  export type ElementType = ClientElement<never> | ServerComponent<never>;
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

// Named `Fragment` here because that is what the JSX transform imports for
// `<>…</>`, so the shorthand and the tag are one component.
export { Fragment } from "../components/Fragment.js";
