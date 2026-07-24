import type { Client, ClientComponent, Prop } from "@backtickjs/cs-runtime";
import type { Children } from "./Children.js";
import type { TextStyle } from "./style/index.js";

type Props = {
  children?: Children<Prop<string>>;
  style?: TextStyle;
  onPress?: Client<() => void>;
};

export const Text: ClientComponent<Props> = (props) => ({
  "@backtickjs": "ClientElement",
  id: "Text",
  props,
});
