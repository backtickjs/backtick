import { cs } from "@backtickjs/core";
import { Text as NativeText } from "@backtickjs/react-native";
import type { ReactNode } from "react";
import type { StyleProp, TextStyle } from "react-native";
import { fontFamilies } from "./fonts.js";
import { type Colors, useColors } from "./theme.js";

// The website's type scale: 12, 14 and 16, each with its line height, in
// Noto Sans JP's medium or bold.
const sizes = {
  12: { fontSize: 12, lineHeight: 18 },
  14: { fontSize: 14, lineHeight: 22 },
  16: { fontSize: 16, lineHeight: 26 },
};

export type TextProps = {
  children: ReactNode;
  size?: keyof typeof sizes;
  bold?: boolean;
  // a palette colour, `primaryText` unless said
  color?: keyof Colors;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  accessibilityRole?: "link";
};

export const Text = cs`(props: TextProps) => {
  const colors = $useColors();
  return (
    <$NativeText
      numberOfLines={props.numberOfLines}
      onPress={props.onPress}
      accessibilityRole={props.accessibilityRole}
      style={[
        $sizes[props.size ?? 14],
        {
          fontFamily: props.bold
            ? ${fontFamilies.bold}
            : ${fontFamilies.medium},
          color: colors[props.color ?? "primaryText"],
          // without Android's font padding, which sits Noto Sans JP low in
          // its line, beside the icons it's centred with
          includeFontPadding: false,
        },
        props.style,
      ]}
    >
      {props.children}
    </$NativeText>
  );
}`;
