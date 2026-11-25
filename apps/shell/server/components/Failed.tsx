import { cs } from "@backtickjs/core";
import { useColors } from "./look.js";
import { Button } from "./Button.js";
import { Ionicons } from "@expo/vector-icons" with { backtick: "client" };
import { setStringAsync } from "expo-clipboard" with { backtick: "client" };
import { useEffect, useState } from "react" with { backtick: "client" };
import {
  AccessibilityInfo,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native" with { backtick: "client" };

// Said first, and to screen readers as the view appears.
const headline = "Something went wrong";

const styles = cs`$StyleSheet.create({
  // In the middle of whatever holds it, a screen or a sheet, and scrolling
  // when large text makes it taller.
  failed: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  headline: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
    letterSpacing: -0.4,
    textAlign: "center",
    marginTop: 16,
  },
  body: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: "center",
    maxWidth: 300,
    marginTop: 8,
  },
  actions: { alignSelf: "stretch", maxWidth: 320, marginTop: 24 },
  toggle: { minHeight: 44, justifyContent: "center", alignItems: "center" },
  toggleLabel: { fontSize: 15, fontWeight: "600" },
  details: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    maxHeight: 160,
    marginTop: 4,
    marginBottom: 12,
  },
  message: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: $Platform.select({ ios: "Menlo", default: "monospace" }),
  },
})`;

// A screen or sheet that didn't load, whatever the cause: that it didn't,
// Try again, and what went wrong behind Details, to copy.
export const Failed = cs`(props: { error: unknown; retry: () => void }) => {
  const colors = $useColors();
  const [open, setOpen] = $useState(false);
  const details =
    props.error instanceof Error
      ? props.error.name + ": " + props.error.message
      : String(props.error);
  $useEffect(() => {
    $AccessibilityInfo.announceForAccessibility($headline);
  }, []);
  return (
    <$ScrollView contentContainerStyle={$styles.failed}>
      <$View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        <$Ionicons name="alert-circle-outline" size={44} color={colors.muted} />
      </$View>
      <$Text
        accessibilityRole="header"
        style={[$styles.headline, { color: colors.ink }]}
      >
        {$headline}
      </$Text>
      <$Text style={[$styles.body, { color: colors.muted }]}>
        This didn't load. Check your connection, or try again in a moment.
      </$Text>
      <$View style={$styles.actions}>
        <$Button label="Try again" kind="filled" onPress={props.retry} />
        <$Pressable
          onPress={() => setOpen((shown) => !shown)}
          style={$styles.toggle}
          accessibilityRole="button"
        >
          <$Text style={[$styles.toggleLabel, { color: colors.muted }]}>
            {open ? "Hide details" : "Details"}
          </$Text>
        </$Pressable>
        {open ? (
          <>
            <$ScrollView
              style={[
                $styles.details,
                { borderColor: colors.line, backgroundColor: colors.wash },
              ]}
            >
              <$Text
                selectable
                style={[$styles.message, { color: colors.ink }]}
              >
                {details}
              </$Text>
            </$ScrollView>
            <$Button
              label="Copy"
              kind="outlined"
              onPress={() => void $setStringAsync(details)}
            />
          </>
        ) : null}
      </$View>
    </$ScrollView>
  );
}`;
