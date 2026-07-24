import type { ClientComponent } from "@backtickjs/cs-runtime";
import type { JSX } from "../jsx-runtime/index.js";
import type { Children } from "./Children.js";
import type { Style } from "./Style.js";

type Props = {
  children?: Children<JSX.Element>;
  style?: Style;
};

export const View: ClientComponent<Props> = (props) => ({
  "@backtickjs": "ClientElement",
  id: "View",
  props,
});
