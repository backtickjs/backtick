import {
  type ClientElement,
  createClientElement,
} from "@backtickjs/cs-runtime";
import type { JSX } from "../jsx-runtime/index.js";
import type { Children } from "./Children.js";

export type FragmentProps = {
  children?: Children<JSX.Element>;
};

export const Fragment: ClientElement<FragmentProps> =
  createClientElement("Fragment");
