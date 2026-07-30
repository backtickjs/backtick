import {
  type ClientElement,
  createClientElement,
  type Prop,
} from "@backtickjs/cs-runtime";
import type { ImageSource } from "./ImageSource.js";
import type { ImageStyle } from "./style/index.js";

type ResizeMode = "cover" | "contain" | "stretch" | "repeat" | "center";

/**
 * Keep aligned with:
 * https://github.com/react/react-native/blob/main/packages/react-native/Libraries/Image/Image.d.ts
 */
export type ImageProps = {
  source: ImageSource;
  style?: ImageStyle;
  resizeMode?: Prop<ResizeMode>;
  testID?: string;
};

export const Image: ClientElement<ImageProps> = createClientElement("Image");
