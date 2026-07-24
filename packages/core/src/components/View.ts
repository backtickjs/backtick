import type { ClientComponent } from "@backtickjs/cs-runtime";
import type { JSX } from "../jsx-runtime/index.js";
import type { Children } from "./Children.js";
import type { ViewStyle } from "./style/index.js";

type Props = {
  children?: Children<JSX.Element>;
  style?: ViewStyle;
};

export const View: ClientComponent<Props> = (props) => ({
  "@backtickjs": "ClientElement",
  id: "View",
  props,
});
