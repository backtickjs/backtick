import { cs } from "@backtickjs/core";
import { useColors } from "./look.js";
import { Button } from "./Button.js";
import { Sheet, sheetStyles } from "./Sheet.js";
import { useState } from "react" with { backtick: "client" };
import { setStringAsync } from "expo-clipboard" with { backtick: "client" };
import { Ionicons } from "@expo/vector-icons" with { backtick: "client" };
import {
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native" with { backtick: "client" };

// Set when the connect sheet opens Claude, for the apps to load again on
// the way back.
export const connecting = cs`({ current: false })`;

const styles = cs`$StyleSheet.create({
  lede: { fontSize: 15, lineHeight: 21, marginTop: 6 },
  steps: { gap: 18, marginTop: 22, marginBottom: 26 },
  step: { flexDirection: "row", gap: 12 },
  stepNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  stepDigit: { fontSize: 14, fontWeight: "700" },
  stepText: { fontSize: 16, lineHeight: 22, paddingTop: 2 },
  server: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 14,
    paddingRight: 4,
    paddingVertical: 6,
  },
  // iOS has no font named monospace.
  serverUrl: {
    flex: 1,
    fontFamily: $Platform.select({ ios: "Menlo", default: "monospace" }),
    fontSize: 14,
  },
  copy: { padding: 8 },
})`;

// How to connect Backtick to Claude, as Claude's app asks it
// (2026-10-24), and the button to its Connectors screen.
export const ConnectSheet = cs`(props: { onClose: () => void }) => {
  const { onClose } = props;
  const colors = $useColors();
  const server = "https://mcp.backtickjs.com";
  const [copied, setCopied] = $useState(false);
  const steps = [
    "Open Claude's connectors.",
    "Tap +, then Add custom connector.",
    "Name it Backtick and paste this URL:",
    "Tap Continue, sign in, and allow Backtick.",
  ];
  return (
    <$Sheet onClose={onClose}>
      <$Text style={[$sheetStyles.sheetTitle, { color: colors.ink }]}>
        Connect Backtick to Claude
      </$Text>
      <$Text style={[$styles.lede, { color: colors.muted }]}>
        One time, about a minute. Claude builds your apps, so Backtick is free.
      </$Text>
      <$View style={$styles.steps}>
        {steps.map((step, index) => (
          <$View key={step} style={$styles.step}>
            <$View
              style={[$styles.stepNumber, { backgroundColor: colors.wash }]}
            >
              <$Text style={[$styles.stepDigit, { color: colors.ink }]}>
                {index + 1}
              </$Text>
            </$View>
            <$View style={{ flex: 1, gap: 8 }}>
              <$Text style={[$styles.stepText, { color: colors.ink }]}>
                {step}
              </$Text>
              {index === 2 ? (
                // Tapped, it's copied, for Claude's form.
                <$Pressable
                  onPress={async () => {
                    await $setStringAsync(server);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  style={[
                    $styles.server,
                    {
                      backgroundColor: colors.wash,
                      borderColor: colors.line,
                    },
                  ]}
                  accessibilityLabel="Copy the MCP server URL"
                >
                  <$Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.75}
                    style={[$styles.serverUrl, { color: colors.ink }]}
                  >
                    {server}
                  </$Text>
                  <$Ionicons
                    name={copied ? "checkmark" : "copy-outline"}
                    size={20}
                    color={colors.muted}
                    style={$styles.copy}
                  />
                </$Pressable>
              ) : null}
            </$View>
          </$View>
        ))}
      </$View>
      <$Button
        label="Open Claude's connectors"
        kind="filled"
        onPress={() => {
          $connecting.current = true;
          onClose();
          $Linking.openURL("https://claude.ai/settings/connectors");
        }}
      />
    </$Sheet>
  );
}`;
