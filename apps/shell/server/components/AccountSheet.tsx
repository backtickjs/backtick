import { cs } from "@backtickjs/core";
import { shellURL } from "../links.js";
import { useColors } from "./look.js";
import { assistants } from "./assistants.js";
import type { Assistant } from "./assistants.js";
import { Avatar } from "./Avatar.js";
import { Menu, MenuItem } from "./Menu.js";
import { Sheet, sheetStyles } from "./Sheet.js";
import type { Account } from "./Avatar.js";
import Constants from "expo-constants" with { backtick: "client" };
import { StackActions, useNavigation } from "@react-navigation/native" with {
  backtick: "client",
};
import {
  nativeApplicationVersion,
  nativeBuildVersion,
} from "expo-application" with { backtick: "client" };
import { setStringAsync } from "expo-clipboard" with { backtick: "client" };
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics" with {
  backtick: "client",
};
import { Linking, Pressable, StyleSheet, Text, View } from "react-native" with {
  backtick: "client",
};

const styles = cs`$StyleSheet.create({
  account: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
  },
  // The email as the account's title, without a name.
  emailTitle: { fontSize: 17, fontWeight: "600" },
})`;

// The Backtick app's version, for people: its version, and when the
// update it runs was published. A tap copies what debugging needs: its
// runtime version (EAS's fingerprint), its update, and the modules it
// offers apps.
// What the phone runs, for support: copied by a long press on the
// avatar in the account sheet, never shown.
export const copyDebugInfo = cs`(modules: Record<string, string>) => {
  const update = $Constants.manifest2;
  $impactAsync($ImpactFeedbackStyle.Light);
  void $setStringAsync(
    JSON.stringify(
      {
        version: $nativeApplicationVersion,
        build: $nativeBuildVersion,
        runtimeVersion: update?.runtimeVersion ?? null,
        update: update ? { id: update.id, createdAt: update.createdAt } : null,
        modules,
      },
      null,
      2,
    ),
  );
}`;

// Who's signed in, their assistant, signing out, and deleting the account.
export const AccountSheet = cs`(props: {
  account: Account;
  modules: Record<string, string>;
  assistant: Assistant | null;
  onClose: () => void;
}) => {
  const { account, modules, assistant, onClose } = props;
  const colors = $useColors();
  const navigation = $useNavigation();
  const signOut = () => {
    onClose();
    $Linking.openURL($shellURL("sign-out"));
  };
  // The shell asks first, deletes, and signs out.
  const deleteAccount = () => {
    onClose();
    $Linking.openURL($shellURL("delete-account"));
  };
  return (
    <$Sheet onClose={onClose}>
      <$View style={$styles.account}>
        <$Pressable onLongPress={() => $copyDebugInfo(modules)}>
          <$Avatar size={56} account={account} />
        </$Pressable>
        <$View style={{ flex: 1 }}>
          {account.name ? (
            <$Text
              numberOfLines={1}
              style={[$sheetStyles.sheetTitle, { color: colors.ink }]}
            >
              {account.name}
            </$Text>
          ) : null}
          <$Text
            numberOfLines={1}
            style={
              account.name
                ? [$sheetStyles.detail, { color: colors.muted }]
                : [$styles.emailTitle, { color: colors.ink }]
            }
          >
            {account.email}
          </$Text>
        </$View>
      </$View>
      {/* The assistant and signing out, then deleting on its own. */}
      <$Menu>
        <$MenuItem
          label="Assistant"
          value={
            assistant === null ? "Not connected" : $assistants[assistant].name
          }
          chevron
          onPress={() => {
            onClose();
            navigation.dispatch($StackActions.push("Assistants"));
          }}
        />
        <$MenuItem label="Sign out" onPress={signOut} />
      </$Menu>
      <$Menu>
        <$MenuItem label="Delete account" danger onPress={deleteAccount} />
      </$Menu>
    </$Sheet>
  );
}`;
