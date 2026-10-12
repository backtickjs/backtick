import { cs } from "@backtickjs/core";
import { deleteItemAsync } from "@backtickjs/expo-secure-store";
import { Pressable, View } from "@backtickjs/react-native";
import { useStack } from "../navigation.js";
import { Dropdown } from "./Dropdown.js";
import { Icon } from "./Icon.js";
import { icons } from "./icons.js";
import { Logo } from "./Logo.js";
import { Navbar } from "./Navbar.js";
import { Text } from "./Text.js";
import { useColors } from "./theme.js";

// The website's navbar for Write and Read: the jar, the two tabs, and the
// menu. A tab replaces the screen, as switching tabs does.

type Tab = { label: string; path: string; icon: string };

const tabs: Tab[] = [
  { label: "Write", path: "/write", icon: icons.pen },
  { label: "Read", path: "/read", icon: icons.book },
];

const Tabs = cs`(props: { selected: string }) => {
  const colors = $useColors();
  const stack = $useStack();
  return (
    <$View style={{ flexDirection: "row" }}>
      {$tabs.map((tab) => {
        const selected = tab.path === props.selected;
        return (
          <$Pressable
            key={tab.path}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => !selected && stack.replace(tab.path)}
            style={{
              height: 48,
              paddingHorizontal: 16,
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              borderBottomWidth: 2,
              borderBottomColor: selected ? colors.primaryText : "transparent",
            }}
          >
            <$Icon
              shapes={tab.icon}
              size={18}
              color={selected ? "primaryText" : "tertiaryText"}
            />
            <$Text
              bold
              size={16}
              color={selected ? "primaryText" : "tertiaryText"}
            >
              {tab.label}
            </$Text>
          </$Pressable>
        );
      })}
    </$View>
  );
}`;

// What the website's hamburger menu holds that the app has so far.
const Menu = cs`() => {
  const stack = $useStack();
  const signOut = async () => {
    await $deleteItemAsync("session");
    stack.restart("/");
  };
  return (
    <$Dropdown
      accessibilityLabel="Story Menu"
      items={[{ label: "Sign Out", icon: ${icons.exit}, onPress: signOut }]}
    >
      <$View
        style={{
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <$Icon shapes={${icons.hamburger}} size={20} color="secondaryText" />
      </$View>
    </$Dropdown>
  );
}`;

export const MainNavbar = cs`(props: { selected: "/write" | "/read" }) => (
  <$Navbar>
    <$Logo withText={false} />
    <$Tabs selected={props.selected} />
    <$Menu />
  </$Navbar>
)`;
