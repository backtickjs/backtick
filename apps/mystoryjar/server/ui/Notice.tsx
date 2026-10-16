import { cs } from "@backtickjs/core";
import { View } from "react-native" with { backtick: "client" };
import { Icon } from "./Icon.js";
import { icons } from "./icons.js";
import { Text } from "./Text.js";
import { useColors } from "./theme.js";

// A dark pill with a warning, as the website shows a failed sign-in.
export const Notice = cs`(props: { children: string }) => {
  const colors = $useColors();
  return (
    <$View
      accessibilityRole="alert"
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.noticeBackground,
      }}
    >
      <$Icon shapes={${icons.warning}} color="noticeText" />
      <$Text color="noticeText" style={{ flexShrink: 1 }}>
        {props.children}
      </$Text>
    </$View>
  );
}`;
