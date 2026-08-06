import type { Dimension } from "./Dimension.js";

export type LayoutStyleProps = {
  flex: number;
  flexDirection: "row" | "row-reverse" | "column" | "column-reverse";
  flexWrap: "wrap" | "nowrap" | "wrap-reverse";
  flexGrow: number;
  flexShrink: number;
  flexBasis: Dimension;
  justifyContent:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  alignSelf:
    | "auto"
    | "flex-start"
    | "flex-end"
    | "center"
    | "stretch"
    | "baseline";
  alignContent:
    | "flex-start"
    | "flex-end"
    | "center"
    | "stretch"
    | "space-between"
    | "space-around"
    | "space-evenly";

  width: Dimension;
  height: Dimension;
  minWidth: Dimension;
  maxWidth: Dimension;
  minHeight: Dimension;
  maxHeight: Dimension;
  aspectRatio: number | string;

  margin: Dimension;
  marginTop: Dimension;
  marginBottom: Dimension;
  marginLeft: Dimension;
  marginRight: Dimension;
  marginVertical: Dimension;
  marginHorizontal: Dimension;
  marginStart: Dimension;
  marginEnd: Dimension;

  padding: Dimension;
  paddingTop: Dimension;
  paddingBottom: Dimension;
  paddingLeft: Dimension;
  paddingRight: Dimension;
  paddingVertical: Dimension;
  paddingHorizontal: Dimension;
  paddingStart: Dimension;
  paddingEnd: Dimension;

  borderWidth: number;
  borderTopWidth: number;
  borderBottomWidth: number;
  borderLeftWidth: number;
  borderRightWidth: number;
  borderStartWidth: number;
  borderEndWidth: number;

  position: "absolute" | "relative" | "static";
  top: Dimension;
  bottom: Dimension;
  left: Dimension;
  right: Dimension;
  start: Dimension;
  end: Dimension;

  gap: number;
  rowGap: number;
  columnGap: number;

  display: "flex" | "none";
  overflow: "visible" | "hidden" | "scroll";
  zIndex: number;
  direction: "inherit" | "ltr" | "rtl";
};
