import type { ClientComponent } from "@backtickjs/cs-runtime";
import type { JSX } from "../jsx-runtime/index.js";
import type { Children } from "./Children.js";
import type { Style } from "./Style.js";

type Props = {
  children?: Children<JSX.Element>;
  style?: Style;
};

/** A container. Lays out its children; carries no content of its own. */
export const View: ClientComponent<Props> = (props) => ({
  "@backtickjs": "ClientElement",
  id: "View",
  props,
});
