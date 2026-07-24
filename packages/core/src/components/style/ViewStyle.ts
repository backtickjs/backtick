import type { LayoutProps } from "./layout.js";
import type { Transform } from "./Transform.js";
import type { Color, Dimension, Styled } from "./values.js";

export type ViewProps = LayoutProps & {
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
  transform: readonly Transform[];
};

export type ViewStyle = Styled<ViewProps>;
