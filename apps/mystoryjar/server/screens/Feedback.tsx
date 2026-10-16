import { cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";
import {
  ScrollView,
  TextInput as NativeTextInput,
  View,
} from "react-native" with { backtick: "client" };
import { useStack } from "../navigation.js";
import type { ScreenRequest } from "../request.js";
import { BackNavbar } from "../ui/BackNavbar.js";
import { Button } from "../ui/Button.js";
import { fontFamilies } from "../ui/fonts.js";
import { Notice } from "../ui/Notice.js";
import { Screen } from "../ui/Screen.js";
import { usePost } from "../ui/server.js";
import { Text } from "../ui/Text.js";
import { useColors } from "../ui/theme.js";

// The website's feedback form, and its thanks.
const Form = cs`() => {
  const colors = $useColors();
  const stack = $useStack();
  const post = $usePost();
  const [value, setValue] = $useState("");
  const [sent, setSent] = $useState(false);
  const [sending, setSending] = $useState(false);
  const [error, setError] = $useState<string | null>(null);
  if (sent) {
    return (
      <$View style={{ alignItems: "center", marginTop: 50, gap: 16 }}>
        <$Text size={16}>Thank you for submitting feedback!</$Text>
        <$View style={{ flexDirection: "row", gap: 8 }}>
          <$Button
            label="Give More Feedback"
            onPress={() => {
              setValue("");
              setSent(false);
            }}
          />
          <$Button label="Done" primary onPress={stack.back} />
        </$View>
      </$View>
    );
  }
  return (
    <$View style={{ gap: 8 }}>
      {error !== null && <$Notice>{error}</$Notice>}
      <$View
        style={{
          borderRadius: 20,
          backgroundColor: colors.surface,
          boxShadow: colors.smallShadow || undefined,
        }}
      >
        <$NativeTextInput
          multiline
          value={value}
          onChangeText={setValue}
          placeholder="What's on your mind?"
          placeholderTextColor={colors.tertiaryText}
          textAlignVertical="top"
          style={{
            minHeight: 112,
            paddingHorizontal: 16,
            paddingVertical: 12,
            fontFamily: ${fontFamilies.medium},
            fontSize: 14,
            includeFontPadding: false,
            color: colors.primaryText,
          }}
        />
      </$View>
      <$View
        style={{ flexDirection: "row", justifyContent: "flex-end", gap: 8 }}
      >
        <$Button label="Cancel" onPress={stack.back} />
        <$Button
          label="Submit"
          primary
          disabled={sending || value.trim() === ""}
          onPress={async () => {
            setSending(true);
            const answer = await post("/api/feedback", { value });
            setSending(false);
            if (answer.error !== undefined) setError(answer.error);
            else setSent(true);
          }}
        />
      </$View>
    </$View>
  );
}`;

export function Feedback({ request }: { request: ScreenRequest }) {
  return (
    <Screen request={request}>
      {cs`(
        <$View style={{ flex: 1 }}>
          <$BackNavbar title="Give Feedback" />
          <$ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              width: "100%",
              maxWidth: 544,
              alignSelf: "center",
              padding: 16,
            }}
          >
            <$Form />
          </$ScrollView>
        </$View>
      )`}
    </Screen>
  );
}
