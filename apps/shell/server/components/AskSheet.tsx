import { cs } from "@backtickjs/core";
import { useColors } from "./look.js";
import { assistants } from "./assistants.js";
import type { Assistant } from "./assistants.js";
import { Button } from "./Button.js";
import { Sheet, sheetStyles } from "./Sheet.js";
import { useState } from "react" with { backtick: "client" };
import { Linking, StyleSheet, Text, TextInput } from "react-native" with {
  backtick: "client",
};

const styles = cs`$StyleSheet.create({
  idea: {
    flexShrink: 1,
    minHeight: 120,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    marginBottom: 18,
    fontSize: 17,
    lineHeight: 24,
    textAlignVertical: "top",
  },
  note: { fontSize: 13, lineHeight: 19, textAlign: "center", marginTop: 4 },
})`;

// What to ask the assistant: a new app, or a change to one.
export type Ask = { title: string; placeholder: string; prompt: string };

// An app made or changed by the user's assistant: a new chat there, the
// prompt written in and not yet sent. It names Backtick (and the app, for a
// change), so the assistant uses Backtick rather than answering in text. The
// card's Open in Backtick brings the app back here.
export const AskSheet = cs`(props: {
  ask: Ask;
  assistant: Assistant;
  onClose: () => void;
}) => {
  const { ask: what, assistant, onClose } = props;
  const { name, chat } = $assistants[assistant];
  const colors = $useColors();
  const [idea, setIdea] = $useState("");
  const ready = idea.trim().length > 0;
  return (
    <$Sheet onClose={onClose}>
      <$Text style={[$sheetStyles.sheetTitle, { color: colors.ink }]}>
        {what.title}
      </$Text>
      <$TextInput
        value={idea}
        onChangeText={setIdea}
        placeholder={what.placeholder}
        placeholderTextColor={colors.muted}
        multiline
        autoFocus
        style={[
          $styles.idea,
          {
            color: colors.ink,
            borderColor: colors.line,
            backgroundColor: colors.wash,
          },
        ]}
      />
      <$Button
        label={"Ask " + name}
        kind="filled"
        disabled={!ready}
        onPress={() => {
          onClose();
          $Linking.openURL(
            chat + encodeURIComponent(what.prompt + idea.trim()),
          );
        }}
      />
      <$Text style={[$styles.note, { color: colors.muted }]}>
        Opens a new chat with what you wrote.
      </$Text>
    </$Sheet>
  );
}`;
