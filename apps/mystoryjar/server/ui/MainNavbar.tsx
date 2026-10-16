import { cs } from "@backtickjs/core";
import { useEffect } from "react" with { backtick: "client" };
import { deleteItemAsync } from "expo-secure-store" with { backtick: "client" };
import { Pressable, View } from "react-native" with { backtick: "client" };
import { useIsFocused } from "@react-navigation/native" with {
  backtick: "client",
};
import { useStack } from "../navigation.js";
import { Dropdown } from "./Dropdown.js";
import { usePost } from "./server.js";
import { ToggleSwitch } from "./ToggleSwitch.js";
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
  // The other tabs, drawn out of sight, so switching shows them at once:
  // once this one is shown, as a screen drawn out of sight can't preload.
  const shown = $useIsFocused();
  $useEffect(() => {
    if (!shown) return;
    for (const tab of $tabs) {
      if (tab.path !== props.selected) stack.preload(tab.path);
    }
  }, [shown]);
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

// The website's hamburger menu. Dark Mode is saved for the account, then
// the screen drawn again in it.
const Menu = cs`(props: { selected: string; dark: boolean }) => {
  const stack = $useStack();
  const post = $usePost();
  const signOut = async () => {
    await $deleteItemAsync("session");
    stack.restart("/");
  };
  const toggleDark = async () => {
    const answer = await post("/api/preferences", {
      theme: props.dark ? "light" : "dark",
    });
    if (answer.error === undefined) stack.restart(props.selected);
  };
  return (
    <$Dropdown
      accessibilityLabel="Menu"
      items={[
        {
          label: "My Account",
          icon: ${icons.avatar},
          onPress: () => stack.navigate("/account"),
        },
        {
          label: "Dark Mode",
          icon: ${icons.moon},
          after: <$ToggleSwitch on={props.dark} />,
          onPress: toggleDark,
        },
        {
          label: "Give Feedback",
          icon: ${icons.lamp},
          onPress: () => stack.navigate("/feedback"),
        },
        { label: "Sign Out", icon: ${icons.exit}, onPress: signOut },
      ]}
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

export const MainNavbar = cs`(props: {
  selected: "/write" | "/read";
  dark: boolean;
}) => (
  <$Navbar>
    {${(<Logo withText={false} />)}}
    <$Tabs selected={props.selected} />
    <$Menu selected={props.selected} dark={props.dark} />
  </$Navbar>
)`;
