import {
  type Client,
  type ClientElement,
  createClientElement,
} from "@backtickjs/cs-runtime";
import type { Children } from "./Children.js";
import type { TextStyle } from "./style/index.js";

export const Text: ClientElement<{
  children?: Children<string>;
  style?: TextStyle;
  onPress?: Client<() => void>;
}> = createClientElement("Text");
