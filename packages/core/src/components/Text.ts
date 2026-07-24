import type { ClientComponent, Prop } from "@backtickjs/cs-runtime";
import type { Children } from "./Children.js";
import type { Style } from "./Style.js";

type Props = {
  children?: Children<Prop<string>>;
  style?: Style;
};

/** Displays text. Its children are the string it renders. */
export const Text: ClientComponent<Props> = (props) => ({
  "@backtickjs": "ClientElement",
  id: "Text",
  props,
});
