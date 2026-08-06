import type { LayoutStyleProps } from "./LayoutStyle.js";
import type { Transform } from "./Transform.js";
import type { Color } from "./Color.js";
import type { Dimension } from "./Dimension.js";
import type { Styled } from "./values.js";

export type ViewStyleProps = LayoutStyleProps & {
  backgroundColor: Color;
  opacity: number;

  borderColor: Color;
  borderTopColor: Color;
  borderBottomColor: Color;
  borderLeftColor: Color;
  borderRightColor: Color;
  borderStartColor: Color;
  borderEndColor: Color;

  borderRadius: Dimension;
  borderTopLeftRadius: Dimension;
  borderTopRightRadius: Dimension;
  borderBottomLeftRadius: Dimension;
  borderBottomRightRadius: Dimension;
  borderTopStartRadius: Dimension;
  borderTopEndRadius: Dimension;
  borderBottomStartRadius: Dimension;
  borderBottomEndRadius: Dimension;

  borderStyle: "solid" | "dotted" | "dashed";
  borderCurve: "circular" | "continuous";

  // iOS shadow
  shadowColor: Color;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  // Android shadow
  elevation: number;

  backfaceVisibility: "visible" | "hidden";
  transform: Transform[];
};

export type ViewStyle = Styled<ViewStyleProps>;
