import { cs, once } from "@backtickjs/core";
import { createContext, useContext } from "@backtickjs/react";
import { Text, View } from "react-native" with { backtick: "client" };

// One context for the bundle, as `createContext` at module level is one.
const ThemeContext = once(cs`$createContext("light")`);

const Label = cs`() => {
  const theme = $useContext($ThemeContext);
  return <$Text>{theme}</$Text>;
}`;

export async function Home({ dark }: { dark: boolean }) {
  const theme = dark ? "dark" : "light";
  return cs`(
    <$View>
      <$ThemeContext.Provider value={$theme}>
        <$Label />
      </$ThemeContext.Provider>
    </$View>
  )`;
}
