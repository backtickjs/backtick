import { cs } from "@backtickjs/core";
import { useColors } from "./look.js";
import { assistants } from "./assistants.js";
import type { Assistant } from "./assistants.js";
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

const styles = cs`$StyleSheet.create({
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

// How to connect Backtick to an assistant, one time: its steps
// (assistants.ts), and the button to where they start.
export const ConnectSheet = cs`(props: {
  assistant: Assistant;
  onClose: () => void;
}) => {
  const { assistant, onClose } = props;
  const { name, connect, steps } = $assistants[assistant];
  const colors = $useColors();
  const [copied, setCopied] = $useState(false);
  return (
    <$Sheet onClose={onClose}>
      <$Text style={[$sheetStyles.sheetTitle, { color: colors.ink }]}>
        {"Connect Backtick to " + name}
      </$Text>
      <$View style={$styles.steps}>
        {steps.map(({ text, copy }, index) => (
          <$View key={text} style={$styles.step}>
            <$View
              style={[$styles.stepNumber, { backgroundColor: colors.wash }]}
            >
              <$Text style={[$styles.stepDigit, { color: colors.ink }]}>
                {index + 1}
              </$Text>
            </$View>
            <$View style={{ flex: 1, gap: 8 }}>
              <$Text style={[$styles.stepText, { color: colors.ink }]}>
                {text}
              </$Text>
              {copy === undefined ? null : (
                // Tapped, it's copied, for the assistant's form.
                <$Pressable
                  onPress={async () => {
                    await $setStringAsync(copy);
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
                  accessibilityLabel={"Copy " + copy}
                >
                  <$Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.75}
                    style={[$styles.serverUrl, { color: colors.ink }]}
                  >
                    {copy}
                  </$Text>
                  <$Ionicons
                    name={copied ? "checkmark" : "copy-outline"}
                    size={20}
                    color={colors.muted}
                    style={$styles.copy}
                  />
                </$Pressable>
              )}
            </$View>
          </$View>
        ))}
      </$View>
      <$Button
        label={"Open " + name}
        kind="filled"
        // It leaves Backtick for the assistant's app.
        trailingIcon="open-outline"
        onPress={() => {
          onClose();
          $Linking.openURL(connect);
        }}
      />
    </$Sheet>
  );
}`;
