import { cs } from "@backtickjs/core";
import { useStack } from "../navigation.js";
import { icons } from "./icons.js";
import { Navbar } from "./Navbar.js";
import { RoundButton } from "./RoundButton.js";
import { Text } from "./Text.js";
import { View } from "@backtickjs/react-native";

// The website's navbar for a page off the menu: back, then the page's title.
export const BackNavbar = cs`(props: { title: string }) => {
  const stack = $useStack();
  return (
    <$Navbar>
      <$View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        <$RoundButton
          flat
          icon={${icons["chevron-left"]}}
          accessibilityLabel="Back"
          onPress={stack.back}
        />
        <$Text bold size={16}>
          {props.title}
        </$Text>
      </$View>
    </$Navbar>
  );
}`;
