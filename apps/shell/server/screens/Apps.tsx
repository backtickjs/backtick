import { cs } from "@backtickjs/core";
import { Logo, useColors } from "../components/look.js";
import { useReloadScreen } from "./navigator.js";
import { AppSheet } from "../components/AppSheet.js";
import { Avatar } from "../components/Avatar.js";
import { Card } from "../components/Card.js";
import type { App } from "../components/Card.js";
import type { Account } from "../components/Avatar.js";
import { useCallback, useState, useTransition } from "react" with {
  backtick: "client",
};
import { StackActions, useNavigation } from "@react-navigation/native" with {
  backtick: "client",
};
import { useSafeAreaInsets } from "react-native-safe-area-context" with {
  backtick: "client",
};
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native" with { backtick: "client" };

const styles = cs`$StyleSheet.create({
  // The insets are added where it's drawn, so content scrolls under the
  // status bar and ends clear of the gesture bar.
  list: { paddingHorizontal: 20, flexGrow: 1 },
  header: { gap: 22, paddingTop: 12, paddingBottom: 24 },
  heading: {
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "800",
    letterSpacing: -1.6,
  },
  columns: { gap: 14 },
  // In the middle of what's left below the header (the list's content
  // fills the screen, so this can grow into it).
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  emptyText: {
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
    maxWidth: 320,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  new: { borderRadius: 999, paddingHorizontal: 16, paddingVertical: 9 },
  newLabel: { fontSize: 15, fontWeight: "600" },
})`;

// The home: the user's apps, last saved first, as a grid of cards the way app
// builders list projects. A card opens its app; its ⋯ opens a sheet with the
// app's details, opening, editing and deleting; the avatar opens the account,
// and + New asks the user's assistant for a new app, each a screen of its own.
// Pulled down, it loads again in place.
export const Apps = cs`(props: { apps: App[]; account: Account }) => {
  const { apps, account } = props;
  const colors = $useColors();
  const insets = $useSafeAreaInsets();
  const { width } = $useWindowDimensions();
  const navigation = $useNavigation();
  const reload = $useReloadScreen();
  // Loads the apps again, in place: the spinner stays until the new ones
  // replace these.
  const [refreshing, startRefresh] = $useTransition();
  const refresh = $useCallback(() => startRefresh(() => reload()), [reload]);
  const [selected, setSelected] = $useState<App | null>(null);
  // Two columns, 20 at the edges and 14 between.
  const cardWidth = Math.floor((width - 40 - 14) / 2);
  return (
    <>
      <$FlatList
        // Below the status bar, so the refresh spinner shows there too.
        style={{ backgroundColor: colors.paper, marginTop: insets.top }}
        contentContainerStyle={[
          $styles.list,
          { paddingBottom: insets.bottom + 32 },
        ]}
        numColumns={2}
        columnWrapperStyle={$styles.columns}
        refreshing={refreshing}
        onRefresh={refresh}
        data={apps}
        keyExtractor={(app) => app.id}
        ListHeaderComponent={
          <$View style={$styles.header}>
            <$View style={$styles.top}>
              <$Logo width={112} color={colors.ink} />
              <$Pressable
                onPress={() =>
                  navigation.dispatch($StackActions.push("Account"))
                }
                hitSlop={10}
                accessibilityLabel="Account"
              >
                <$Avatar size={34} account={account} />
              </$Pressable>
            </$View>
            <$View style={$styles.top}>
              <$Text style={[$styles.heading, { color: colors.ink }]}>
                Your apps
              </$Text>
              <$Pressable
                onPress={() => navigation.dispatch($StackActions.push("New"))}
                style={[$styles.new, { backgroundColor: colors.ink }]}
                accessibilityLabel="New app"
              >
                <$Text style={[$styles.newLabel, { color: colors.paper }]}>
                  + New
                </$Text>
              </$Pressable>
            </$View>
          </$View>
        }
        // No apps yet: where to start.
        ListEmptyComponent={
          <$View style={$styles.empty}>
            <$Text style={[$styles.emptyText, { color: colors.muted }]}>
              Tap + New to create your first app.
            </$Text>
          </$View>
        }
        renderItem={({ item }) => (
          <$Card
            app={item}
            width={cardWidth}
            onMore={() => setSelected(item)}
          />
        )}
      />
      {selected === null ? null : (
        <$AppSheet
          app={selected}
          onClose={() => setSelected(null)}
          onDelete={refresh}
          onEdit={() => {
            setSelected(null);
            navigation.dispatch(
              $StackActions.push("Edit", { id: selected.id }),
            );
          }}
        />
      )}
    </>
  );
}`;
