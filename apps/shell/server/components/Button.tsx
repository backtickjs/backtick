import { cs } from "@backtickjs/core";
import type { ComponentProps } from "react";
import type { Ionicons as Icons } from "@expo/vector-icons";
import { useColors } from "./look.js";
import { Ionicons } from "@expo/vector-icons" with { backtick: "client" };
import { Pressable, StyleSheet, Text, View } from "react-native" with {
  backtick: "client",
};

// The icons a button can show: Ionicons', by name.
type Icon = ComponentProps<typeof Icons>["name"];

const styles = cs`$StyleSheet.create({
  button: {
    borderRadius: 999,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  label: { fontSize: 16, fontWeight: "600" },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
})`;

// A sheet's action: filled for the main one, outlined, or a danger's text.
export const Button = cs`(props: {
  label: string;
  kind: "filled" | "outlined" | "danger";
  onPress: () => void;
  disabled?: boolean;
  // After the label, as for a link out of Backtick.
  trailingIcon?: Icon;
}) => {
  const { label, kind, onPress, disabled, trailingIcon } = props;
  const colors = $useColors();
  // The label's, and its icon's.
  const color = {
    filled: colors.paper,
    outlined: colors.ink,
    danger: colors.danger,
  }[kind];
  return (
    <$Pressable
      disabled={disabled}
      style={[
        $styles.button,
        kind === "filled" && { backgroundColor: colors.ink },
        kind === "outlined" && { borderWidth: 1, borderColor: colors.line },
        disabled && { opacity: 0.4 },
      ]}
      onPress={onPress}
      accessibilityRole="button"
    >
      <$View style={$styles.row}>
        <$Text style={[$styles.label, { color }]}>{label}</$Text>
        {trailingIcon === undefined ? null : (
          // Says what the label already says: hidden from screen readers.
          <$View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            <$Ionicons name={trailingIcon} size={20} color={color} />
          </$View>
        )}
      </$View>
    </$Pressable>
  );
}`;
