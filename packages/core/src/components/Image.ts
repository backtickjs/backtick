import type { ClientComponent, Prop } from "@backtickjs/cs-runtime";
import type { ImageSource } from "./ImageSource.js";
import type { Style } from "./Style.js";

type ResizeMode = "cover" | "contain" | "stretch" | "repeat" | "center";

type Props = {
  source: ImageSource;
  style?: Style;
  resizeMode?: Prop<ResizeMode>;
};

export const Image: ClientComponent<Props> = (props) => ({
  "@backtickjs": "ClientElement",
  id: "Image",
  props,
});
