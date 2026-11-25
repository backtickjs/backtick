import { cs } from "@backtickjs/core";
import type { ReactNode } from "react";
import { useColors } from "./look.js";
import { Ionicons } from "@expo/vector-icons" with { backtick: "client" };
import { Children, Fragment } from "react" with { backtick: "client" };
import { Pressable, StyleSheet, Text, View } from "react-native" with {
  backtick: "client",
};

const styles = cs`$StyleSheet.create({
  menu: { marginBottom: 16 },
  // Further from the card above than from its own.
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 10,
    marginLeft: 2,
  },
  card: { borderWidth: 1, borderRadius: 16 },
  // Inside the card's border, not touching it.
  divider: { height: 1, marginHorizontal: 18 },
  item: { flexDirection: "row", alignItems: "center", minHeight: 56 },
  press: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    alignSelf: "stretch",
    paddingLeft: 18,
  },
  label: { flex: 1, fontSize: 17, fontWeight: "500" },
  value: { fontSize: 16 },
  trailing: { paddingRight: 12 },
})`;

// Rows in a card, as iOS's Settings groups them, with a title above if
// there's one: what every list of choices and actions in the home looks like.
export const Menu = cs`(props: {
  title?: string;
  // "radiogroup" for items where one is chosen.
  accessibilityRole?: "radiogroup";
  children: ReactNode;
}) => {
  const colors = $useColors();
  const items = $Children.toArray(props.children);
  return (
    <$View style={$styles.menu}>
      {props.title === undefined ? null : (
        <$Text style={[$styles.title, { color: colors.ink }]}>
          {props.title}
        </$Text>
      )}
      <$View
        style={[
          $styles.card,
          { borderColor: colors.line, backgroundColor: colors.paper },
        ]}
        accessibilityRole={props.accessibilityRole}
      >
        {items.map((item, index) => (
          <$Fragment key={index}>
            {index === 0 ? null : (
              <$View
                style={[$styles.divider, { backgroundColor: colors.line }]}
              />
            )}
            {item}
          </$Fragment>
        ))}
      </$View>
    </$View>
  );
}`;

// A row: what it is, and its value with a chevron when it opens a screen,
// red for a destructive action. Something before the label (a radio), or a
// control at the end (a button), sits outside the row's own tap.
export const MenuItem = cs`(props: {
  label: string;
  onPress?: () => void;
  value?: string;
  chevron?: boolean;
  danger?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
  // "radio" for one of a radiogroup's items, with whether it's chosen.
  accessibilityRole?: "radio";
  checked?: boolean;
}) => {
  const { label, onPress, value, chevron, danger, leading, trailing } = props;
  const colors = $useColors();
  return (
    <$View style={$styles.item}>
      <$Pressable
        onPress={onPress}
        disabled={onPress === undefined}
        style={[$styles.press, { paddingRight: trailing ? 8 : 18 }]}
        // Only a row that does something is a button.
        accessibilityRole={
          props.accessibilityRole ??
          (onPress === undefined ? undefined : "button")
        }
        accessibilityState={
          props.checked === undefined ? undefined : { checked: props.checked }
        }
      >
        {leading}
        <$Text
          numberOfLines={1}
          style={[
            $styles.label,
            { color: danger ? colors.danger : colors.ink },
          ]}
        >
          {label}
        </$Text>
        {value === undefined ? null : (
          <$Text style={[$styles.value, { color: colors.muted }]}>
            {value}
          </$Text>
        )}
        {chevron ? (
          <$Ionicons name="chevron-forward" size={18} color={colors.muted} />
        ) : null}
      </$Pressable>
      {trailing ? <$View style={$styles.trailing}>{trailing}</$View> : null}
    </$View>
  );
}`;
