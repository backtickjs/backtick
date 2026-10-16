import { cs } from "@backtickjs/core";
import { useRef, useState } from "@backtickjs/react";
import { Modal, Pressable, View } from "react-native" with {
  backtick: "client",
};
import type { ReactNode } from "react";
import type { View as NativeView } from "react-native";
import { Icon } from "./Icon.js";
import { Text } from "./Text.js";
import { useColors } from "./theme.js";

export type DropdownItem = {
  label: string;
  // from `icons`
  icon?: string;
  // what the row shows at its right, such as a switch
  after?: ReactNode;
  onPress: () => void;
};

export type DropdownProps = {
  // what's tapped to open it
  children: ReactNode;
  accessibilityLabel: string;
  items: DropdownItem[];
};

// The website's dropdown: rows of 44 points on the surface colour, opening
// under its button's right edge, closed by a choice or a tap elsewhere.
export const Dropdown = cs`(props: DropdownProps) => {
  const colors = $useColors();
  const anchor = $useRef<NativeView>(null);
  const [at, setAt] = $useState<{ top: number; right: number } | null>(null);
  const open = () =>
    anchor.current?.measureInWindow((x, y, width, height) =>
      setAt({ top: y + height + 4, right: x + width }),
    );
  return (
    <>
      <$Pressable
        ref={anchor}
        accessibilityRole="button"
        accessibilityLabel={props.accessibilityLabel}
        onPress={open}
      >
        {props.children}
      </$Pressable>
      <$Modal
        transparent
        visible={at !== null}
        onRequestClose={() => setAt(null)}
      >
        <$Pressable style={{ flex: 1 }} onPress={() => setAt(null)}>
          {at !== null && (
            <$View
              accessibilityRole="menu"
              style={{
                position: "absolute",
                top: at.top,
                left: at.right - 200,
                width: 200,
                borderRadius: 12,
                backgroundColor: colors.surface,
                boxShadow: colors.largeShadow,
                overflow: "hidden",
              }}
            >
              {props.items.map((item, index) => (
                <$Pressable
                  key={item.label}
                  accessibilityRole="menuitem"
                  onPress={() => {
                    setAt(null);
                    item.onPress();
                  }}
                  style={{
                    height: 44,
                    paddingLeft: 12,
                    paddingRight: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    borderTopWidth: index === 0 ? 0 : 1,
                    borderTopColor: colors.divider,
                  }}
                >
                  {item.icon !== undefined && (
                    <$Icon shapes={item.icon} size={20} color="secondaryText" />
                  )}
                  <$Text color="secondaryText" style={{ flex: 1 }}>
                    {item.label}
                  </$Text>
                  {item.after}
                </$Pressable>
              ))}
            </$View>
          )}
        </$Pressable>
      </$Modal>
    </>
  );
}`;
