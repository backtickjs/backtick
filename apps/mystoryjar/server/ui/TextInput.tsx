import { cs } from "@backtickjs/core";
import { TextInput as NativeTextInput, View } from "react-native" with {
  backtick: "client",
};
import type { ReactNode } from "react";
import type { TextInputProps as NativeTextInputProps } from "react-native";
import { fontFamilies } from "./fonts.js";
import { Icon } from "./Icon.js";
import { useColors } from "./theme.js";

export type TextInputProps = NativeTextInputProps & {
  // an icon before the text, from `icons`
  icon?: string;
  // what follows the text, such as a button that clears it
  after?: ReactNode;
};

// The website's input: a pill on the surface colour, its icon on the left.
export const TextInput = cs`({
  icon,
  after,
  style,
  ...props
}: TextInputProps) => {
  const colors = $useColors();
  return (
    <$View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        borderRadius: 20,
        paddingHorizontal: 16,
        backgroundColor: colors.surface,
        boxShadow: colors.smallShadow || undefined,
      }}
    >
      {icon !== undefined && <$Icon shapes={icon} color="secondaryText" />}
      <$NativeTextInput
        placeholderTextColor={colors.tertiaryText}
        style={[
          // 40 high, the text centred by the platform: a line height on a
          // one-line input pushes its text up on iOS.
          {
            flex: 1,
            height: 40,
            paddingVertical: 0,
            fontFamily: ${fontFamilies.medium},
            fontSize: 14,
            color: colors.primaryText,
            textAlignVertical: "center",
            includeFontPadding: false,
          },
          style,
        ]}
        {...props}
      />
      {after}
    </$View>
  );
}`;
