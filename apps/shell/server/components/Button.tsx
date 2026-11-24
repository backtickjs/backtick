import { cs } from "@backtickjs/core";
import { useColors } from "./look.js";
import { Pressable, StyleSheet, Text } from "react-native" with {
  backtick: "client",
};

const styles = cs`$StyleSheet.create({
  button: {
    borderRadius: 999,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  label: { fontSize: 16, fontWeight: "600" },
})`;

// A sheet's action: filled for the main one, outlined, or a danger's text.
export const Button = cs`(props: {
  label: string;
  kind: "filled" | "outlined" | "danger";
  onPress: () => void;
  disabled?: boolean;
}) => {
  const { label, kind, onPress, disabled } = props;
  const colors = $useColors();
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
    >
      <$Text
        style={[
          $styles.label,
          {
            color: {
              filled: colors.paper,
              outlined: colors.ink,
              danger: colors.danger,
            }[kind],
          },
        ]}
      >
        {label}
      </$Text>
    </$Pressable>
  );
}`;
