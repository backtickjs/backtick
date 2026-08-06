import type { LayoutStyleProps } from "./LayoutStyle.js";
import type { Color } from "./Color.js";
import type { Dimension } from "./Dimension.js";
import type { Styled } from "./values.js";

type ImageStyleProps = LayoutStyleProps & {
  backgroundColor: Color;
  opacity: number;
  backfaceVisibility: "visible" | "hidden";

  borderColor: Color;
  borderRadius: Dimension;
  borderTopLeftRadius: Dimension;
  borderTopRightRadius: Dimension;
  borderBottomLeftRadius: Dimension;
  borderBottomRightRadius: Dimension;

  overflow: "visible" | "hidden";
  resizeMode: "cover" | "contain" | "stretch" | "repeat" | "center";
  objectFit: "cover" | "contain" | "fill" | "scale-down";
  tintColor: Color;
  overlayColor: string;
};

export type ImageStyle = Styled<ImageStyleProps>;
