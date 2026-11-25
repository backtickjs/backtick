import { cs } from "@backtickjs/core";
import { connectionsOf } from "../account.js";
import { assistantIds, assistants } from "../components/assistants.js";
import type { Assistant } from "../components/assistants.js";
import { connecting, ConnectSheet } from "../components/ConnectSheet.js";
import { Menu, MenuItem } from "../components/Menu.js";
import { useColors } from "../components/look.js";
import { reloadScreen } from "./navigator.js";
import { Ionicons } from "@expo/vector-icons" with { backtick: "client" };
import { selectionAsync } from "expo-haptics" with { backtick: "client" };
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native" with {
  backtick: "client",
};
import { useCallback, useState } from "react" with {
  backtick: "client",
};
import {
  Alert,
  AppState,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native" with { backtick: "client" };

// The home's own origin, where the screen's requests go.
const home = process.env.BACKTICK_HOME_ORIGIN!;

const styles = cs`$StyleSheet.create({
  screen: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40 },
  heading: {
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "800",
    letterSpacing: -1.6,
    marginBottom: 20,
  },
  noRadio: { width: 22 },
  // Connect, filled, and Disconnect, outlined.
  pill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  pillLabel: { fontSize: 14, fontWeight: "600" },
  // Under the title, until an assistant is connected.
  lede: { fontSize: 15, lineHeight: 21, marginTop: -8, marginBottom: 24 },
})`;

// The assistants that build the user's apps, from the account sheet: those
// connected, with the selected one, which New and Edit open, and those not
// connected.
const AssistantsScreen = cs`(props: {
  connected: Assistant[];
  assistant: Assistant | null;
}) => {
  const { connected } = props;
  const colors = $useColors();
  const route = $useRoute();
  const navigation = $useNavigation();
  // The apps under this screen load again: their account sheet and New read
  // the user's assistants too.
  const reloadApps = () => {
    const apps = navigation
      .getState()
      ?.routes.find(({ name }) => name === "Apps");
    if (apps !== undefined) {
      $reloadScreen(apps.key);
    }
  };
  // Connections changed: this screen loads again, and the apps too.
  const reload = () => {
    $reloadScreen(route.key);
    reloadApps();
  };
  // The one New and Edit open: shown chosen at once, kept by the home's
  // server, and back as it was if that fails. Each load with other
  // connections starts over from the server's (the screen's key).
  const [assistant, setAssistant] = $useState(props.assistant);
  const choose = async (id: Assistant) => {
    const before = assistant;
    setAssistant(id);
    void $selectionAsync();
    const response = await fetch($home + "/assistants/" + id + "/choose", {
      method: "POST",
    }).catch(() => null);
    if (response === null || !response.ok) {
      setAssistant(before);
      $Alert.alert("Couldn't choose " + $assistants[id].name, "Try again.");
      return;
    }
    reload();
  };
  const [connectingTo, setConnectingTo] = $useState<Assistant | null>(null);
  // Back from an assistant a connect sheet sent the user to: load again,
  // which reads the new connection. Only from the background, once, and only
  // while this screen is on top.
  $useFocusEffect(
    $useCallback(() => {
      let last = $AppState.currentState;
      const subscription = $AppState.addEventListener("change", (state) => {
        if (
          $connecting.current &&
          last === "background" &&
          state === "active"
        ) {
          $connecting.current = false;
          reload();
        }
        last = state;
      });
      return () => subscription.remove();
    }, [route.key, navigation]),
  );
  // The home's own server revokes it, then the screens load again. A
  // failure says so, and changes nothing.
  const disconnect = (id: Assistant) => {
    const { name } = $assistants[id];
    $Alert.alert("Disconnect " + name + "?", undefined, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Disconnect",
        style: "destructive",
        onPress: async () => {
          const response = await fetch(
            $home + "/assistants/" + id + "/disconnect",
            { method: "POST" },
          ).catch(() => null);
          if (response === null || !response.ok) {
            $Alert.alert("Couldn't disconnect " + name, "Try again.");
            return;
          }
          reload();
        },
      },
    ]);
  };
  const unconnected = $assistantIds.filter((id) => !connected.includes(id));
  // An assistant's row: its radio and Disconnect once connected, or Connect.
  const item = (id: Assistant) => {
    const { name } = $assistants[id];
    if (!connected.includes(id)) {
      return (
        <$MenuItem
          key={id}
          label={name}
          // Where its radio will be, so the names line up.
          leading={<$View style={$styles.noRadio} />}
          trailing={
            <$Pressable
              onPress={() => setConnectingTo(id)}
              style={[
                $styles.pill,
                { borderColor: colors.ink, backgroundColor: colors.ink },
              ]}
              accessibilityRole="button"
              accessibilityLabel={"Connect " + name}
            >
              <$Text style={[$styles.pillLabel, { color: colors.paper }]}>
                Connect
              </$Text>
            </$Pressable>
          }
        />
      );
    }
    const chosen = id === assistant;
    return (
      <$MenuItem
        key={id}
        label={name}
        onPress={() => {
          if (!chosen) {
            void choose(id);
          }
        }}
        accessibilityRole="radio"
        checked={chosen}
        leading={
          <$Ionicons
            name={chosen ? "radio-button-on" : "radio-button-off"}
            size={22}
            color={chosen ? colors.ink : colors.muted}
          />
        }
        trailing={
          <$Pressable
            onPress={() => disconnect(id)}
            style={[$styles.pill, { borderColor: colors.line }]}
            accessibilityRole="button"
            accessibilityLabel={"Disconnect " + name}
          >
            <$Text style={[$styles.pillLabel, { color: colors.ink }]}>
              Disconnect
            </$Text>
          </$Pressable>
        }
      />
    );
  };
  return (
    <$ScrollView contentContainerStyle={$styles.screen}>
      <$Text style={[$styles.heading, { color: colors.ink }]}>
        Your assistants
      </$Text>
      {connected.length === 0 ? (
        <$Text style={[$styles.lede, { color: colors.muted }]}>
          Connect one to create apps.
        </$Text>
      ) : null}
      {connected.length === 0 ? null : (
        // One of them is chosen, for screen readers too.
        <$Menu title="Connected" accessibilityRole="radiogroup">
          {$assistantIds.filter((id) => connected.includes(id)).map(item)}
        </$Menu>
      )}
      {unconnected.length === 0 ? null : (
        <$Menu title="Not connected">{unconnected.map(item)}</$Menu>
      )}
      {connectingTo === null ? null : (
        <$ConnectSheet
          assistant={connectingTo}
          onClose={() => setConnectingTo(null)}
        />
      )}
    </$ScrollView>
  );
}`;

// The Assistants screen, from the server: the user's assistants, and the one
// New and Edit open. Read each time the screen loads.
export async function Assistants(props: { user: string }) {
  const { connected, assistant } = await connectionsOf(props.user);
  // What the screen shows, so it starts over when that changes.
  const shows = [...connected, assistant].join(" ");
  return cs`(
    <$AssistantsScreen
      key={$shows}
      connected={$connected}
      assistant={$assistant}
    />
  )`;
}
