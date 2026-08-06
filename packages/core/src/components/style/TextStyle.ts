import type { ViewStyleProps } from "./ViewStyle.js";
import type { Color } from "./Color.js";
import type { Styled } from "./values.js";

type TextStyleProps = ViewStyleProps & {
  color: Color;
  fontFamily: string;
  fontSize: number;
  fontStyle: "normal" | "italic";
  fontWeight:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
    | number;
  fontVariant: (
    | "small-caps"
    | "oldstyle-nums"
    | "lining-nums"
    | "tabular-nums"
    | "proportional-nums"
  )[];
  letterSpacing: number;
  lineHeight: number;
  textAlign: "auto" | "left" | "right" | "center" | "justify";
  textAlignVertical: "auto" | "top" | "bottom" | "center";
  textDecorationColor: Color;
  textDecorationLine:
    | "none"
    | "underline"
    | "line-through"
    | "underline line-through";
  textDecorationStyle: "solid" | "double" | "dotted" | "dashed";
  textShadowColor: Color;
  textShadowOffset: { width: number; height: number };
  textShadowRadius: number;
  textTransform: "none" | "uppercase" | "lowercase" | "capitalize";
  includeFontPadding: boolean;
  verticalAlign: "auto" | "top" | "bottom" | "middle";
  writingDirection: "auto" | "ltr" | "rtl";
  userSelect: "auto" | "text" | "none" | "contain" | "all";
};

export type TextStyle = Styled<TextStyleProps>;
