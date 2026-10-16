import { cs } from "@backtickjs/core";
import { Pressable, View } from "react-native" with { backtick: "client" };
import { Icon } from "./Icon.js";
import { Text } from "./Text.js";
import { useColors } from "./theme.js";

export type ButtonProps = {
  label: string;
  onPress: () => void;
  // filled with the accent, for the screen's main action
  primary?: boolean;
  // without its shadow
  flat?: boolean;
  disabled?: boolean;
  // an icon before the label, from `icons`
  icon?: string;
};

// The website's button: a pill 40 points high that shrinks a little as it's
// pressed.
export const Button = cs`(props: ButtonProps) => {
  const colors = $useColors();
  const background = props.primary
    ? props.disabled
      ? colors.primaryButtonDisabled
      : colors.primaryButton
    : colors.regularButton;
  const text = props.primary
    ? props.disabled
      ? "primaryButtonTextDisabled"
      : "primaryButtonText"
    : props.disabled
      ? "regularButtonTextDisabled"
      : "regularButtonText";
  return (
    <$Pressable
      accessibilityRole="button"
      onPress={props.onPress}
      disabled={props.disabled}
      style={({ pressed }) => ({
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        backgroundColor: background,
        boxShadow: props.flat ? undefined : colors.smallShadow || undefined,
        transform: [{ scale: pressed ? 0.96 : 1 }],
      })}
    >
      {props.icon !== undefined && (
        <$View>
          <$Icon shapes={props.icon} size={30} color={text} />
        </$View>
      )}
      <$Text color={text}>{props.label}</$Text>
    </$Pressable>
  );
}`;
