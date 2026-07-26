import {
  type ClientElement,
  createClientElement,
} from "@backtickjs/cs-runtime";
import type { JSX } from "../jsx-runtime/index.js";
import type { Children } from "./Children.js";
import type { ViewStyle } from "./style/index.js";

export const View: ClientElement<{
  children?: Children<JSX.Element>;
  style?: ViewStyle;
}> = createClientElement("View");
