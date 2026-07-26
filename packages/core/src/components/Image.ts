import {
  type ClientElement,
  createClientElement,
  type Prop,
} from "@backtickjs/cs-runtime";
import type { ImageSource } from "./ImageSource.js";
import type { ImageStyle } from "./style/index.js";

type ResizeMode = "cover" | "contain" | "stretch" | "repeat" | "center";

export const Image: ClientElement<{
  source: ImageSource;
  style?: ImageStyle;
  resizeMode?: Prop<ResizeMode>;
}> = createClientElement("Image");
