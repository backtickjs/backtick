import type { ClientComponent, Prop } from "@backtickjs/cs-runtime";
import type { Style } from "./Style.js";

type Props = {
  source: Prop<string>;
  style?: Style;
};

/** Displays an image, addressed by URI. */
export const Image: ClientComponent<Props> = (props) => ({
  "@backtickjs": "ClientElement",
  id: "Image",
  props,
});
