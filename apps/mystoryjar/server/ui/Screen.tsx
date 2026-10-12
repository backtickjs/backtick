import { type Client, cs } from "@backtickjs/core";
import { useFonts } from "@backtickjs/expo-font";
import { View } from "@backtickjs/react-native";
import type { JSX } from "@backtickjs/react/jsx-runtime";
import type { ReactNode } from "react";
import type { ScreenRequest } from "../request.js";
import { fontSources } from "./fonts.js";
import { type Server, ServerContext } from "./server.js";
import { type Colors, palettes, ThemeContext } from "./theme.js";

// Every screen's root: its palette and the server, for the components inside
// to read, its background, and the fonts it draws with. A screen waits for its fonts,
// which the app downloads once and keeps for its session.
const Themed = cs`(props: {
  colors: Colors;
  fonts: Record<string, string>;
  server: Server;
  children: ReactNode;
}) => {
  const [loaded, error] = $useFonts(props.fonts);
  return (
    <$ServerContext.Provider value={props.server}>
      <$ThemeContext.Provider value={props.colors}>
        <$View style={{ flex: 1, backgroundColor: props.colors.wash }}>
          {loaded || error ? props.children : null}
        </$View>
      </$ThemeContext.Provider>
    </$ServerContext.Provider>
  );
}`;

export function Screen({
  request,
  children,
}: {
  request: ScreenRequest;
  children: Client<JSX.Element>;
}) {
  const colors = palettes[request.theme];
  const fonts = fontSources(request.origin);
  const server: Server = { origin: request.origin, session: request.session };
  return cs`(
    <$Themed colors={$colors} fonts={$fonts} server={$server}>
      {$children}
    </$Themed>
  )`;
}
