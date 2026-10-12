import { type Client, cs } from "@backtickjs/core";
import { useFonts } from "@backtickjs/expo-font";
import { View } from "@backtickjs/react-native";
import type { JSX } from "@backtickjs/react/jsx-runtime";
import type { ReactNode } from "react";
import type { ScreenRequest } from "../request.js";
import { fontSources } from "./fonts.js";
import { type Colors, palettes, type Theme, ThemeContext } from "./theme.js";

// Every screen's root: its palette, for the components inside to read, its
// background, and the fonts it draws with. A screen waits for its fonts,
// which the app downloads once and keeps for its session.
const Themed = cs`(props: {
  colors: Colors;
  fonts: Record<string, string>;
  children: ReactNode;
}) => {
  const [loaded, error] = $useFonts(props.fonts);
  return (
    <$ThemeContext.Provider value={props.colors}>
      <$View style={{ flex: 1, backgroundColor: props.colors.wash }}>
        {loaded || error ? props.children : null}
      </$View>
    </$ThemeContext.Provider>
  );
}`;

export function Screen({
  request,
  theme,
  children,
}: {
  request: ScreenRequest;
  theme: Theme;
  children: Client<JSX.Element>;
}) {
  const colors = palettes[theme];
  const fonts = fontSources(request.origin);
  return cs`(
    <$Themed colors={$colors} fonts={$fonts}>
      {$children}
    </$Themed>
  )`;
}
