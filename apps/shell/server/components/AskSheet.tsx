import { cs } from "@backtickjs/core";
import { useColors } from "./look.js";
import { Button } from "./Button.js";
import { ConnectSheet } from "./ConnectSheet.js";
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

// What to ask Claude: a new app, or a change to one.
export type Ask = { title: string; placeholder: string; prompt: string };

// An app made or changed by Claude: a new chat there, the prompt written
// in and not yet sent. It names Backtick (and the app, for a change), so
// Claude uses the connector rather than answering in text. The card's
// Open in Backtick brings the app back here. Not connected, it shows how
// to connect instead, with nothing to write yet.
export const AskSheet = cs`(props: {
  ask: Ask;
  claude: boolean;
  onClose: () => void;
}) => {
  const { ask: what, claude, onClose } = props;
  const colors = $useColors();
  const [idea, setIdea] = $useState("");
  const ready = idea.trim().length > 0;
  if (!claude) {
    return <$ConnectSheet onClose={onClose} />;
  }
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
        label="Ask Claude"
        kind="filled"
        disabled={!ready}
        onPress={() => {
          onClose();
          $Linking.openURL(
            "https://claude.ai/new?q=" +
              encodeURIComponent(what.prompt + idea.trim()),
          );
        }}
      />
      <$Text style={[$styles.note, { color: colors.muted }]}>
        Opens a new chat with what you wrote.
      </$Text>
    </$Sheet>
  );
}`;
