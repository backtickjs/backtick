import {
  type Client,
  type ClientElement,
  createClientElement,
} from "@backtickjs/cs-runtime";
import type { Children } from "./Children.js";
import type { TextStyle } from "./style/index.js";

export type TextProps = {
  children?: Children<string>;
  style?: TextStyle;
  onPress?: Client<() => void>;
  testID?: string;
};

export const Text: ClientElement<TextProps> = createClientElement("Text");
