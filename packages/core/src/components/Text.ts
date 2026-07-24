import type { Client, ClientComponent, Prop } from "@backtickjs/cs-runtime";
import type { Children } from "./Children.js";
import type { Style } from "./Style.js";

type Props = {
  children?: Children<Prop<string>>;
  style?: Style;
  onPress?: Client<() => void>;
};

export const Text: ClientComponent<Props> = (props) => ({
  "@backtickjs": "ClientElement",
  id: "Text",
  props,
});
