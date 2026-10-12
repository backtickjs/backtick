import { cs } from "@backtickjs/core";
import { Pressable } from "@backtickjs/react-native";
import { Icon } from "./Icon.js";
import { type Colors, useColors } from "./theme.js";

export type RoundButtonProps = {
  // from `icons`
  icon: string;
  accessibilityLabel: string;
  onPress: () => void;
  disabled?: boolean;
  // filled with the accent
  primary?: boolean;
  // without its shadow or fill
  flat?: boolean;
  size?: number;
  iconSize?: number;
  iconColor?: keyof Colors;
};

// The website's round button: 40 points, an icon in place of a label.
export const RoundButton = cs`(props: RoundButtonProps) => {
  const colors = $useColors();
  const size = props.size ?? 40;
  return (
    <$Pressable
      accessibilityRole="button"
      accessibilityLabel={props.accessibilityLabel}
      accessibilityState={{ disabled: props.disabled === true }}
      disabled={props.disabled}
      onPress={props.onPress}
      style={({ pressed }) => ({
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: props.primary
          ? colors.primaryButton
          : props.flat
            ? "transparent"
            : colors.regularButton,
        boxShadow: props.flat ? undefined : colors.smallShadow || undefined,
        opacity: props.disabled ? 0.4 : 1,
        transform: [{ scale: pressed ? 0.96 : 1 }],
      })}
    >
      <$Icon
        shapes={props.icon}
        size={props.iconSize ?? 22}
        color={
          props.primary
            ? "primaryButtonText"
            : (props.iconColor ?? "secondaryText")
        }
      />
    </$Pressable>
  );
}`;
