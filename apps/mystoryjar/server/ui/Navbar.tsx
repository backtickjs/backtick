import { cs } from "@backtickjs/core";
import { View } from "react-native" with { backtick: "client" };
import { useSafeAreaInsets } from "react-native-safe-area-context" with {
  backtick: "client",
};
import type { ReactNode } from "react";
import { useColors } from "./theme.js";

// The bar along the top of a screen, under the status bar: the website's
// navbar, 50 points high on the surface colour, a divider below it.
export const Navbar = cs`(props: { children: ReactNode }) => {
  const colors = $useColors();
  const insets = $useSafeAreaInsets();
  return (
    <$View
      style={{
        paddingTop: insets.top,
        paddingHorizontal: 16,
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.divider,
      }}
    >
      <$View
        style={{
          minHeight: 50,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {props.children}
      </$View>
    </$View>
  );
}`;
