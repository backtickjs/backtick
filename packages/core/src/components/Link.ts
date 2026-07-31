import {
  type Children,
  type ClientElement,
  createClientElement,
  type Prop,
} from "@backtickjs/cs-runtime";
import type { TextStyle } from "./style/index.js";

export type LinkProps = {
  href: Prop<string>;
  children?: Children<string>;
  style?: TextStyle;
  testID?: string;
};

export const Link: ClientElement<LinkProps> = createClientElement("Link");
