import { cs } from "@backtickjs/core";
import { useColors } from "./look.js";
import { Button } from "./Button.js";
import { Sheet, sheetStyles } from "./Sheet.js";
import { ago, date } from "./format.js";
import type { App } from "./Card.js";
import {
  Link,
  StackActions,
  useNavigation,
} from "@react-navigation/native" with { backtick: "client" };
import { Alert, StyleSheet, Text, View } from "react-native" with {
  backtick: "client",
};

// The home's own origin, where its sheet's requests go.
const home = process.env.BACKTICK_HOME_ORIGIN!;

const styles = cs`$StyleSheet.create({
  details: { marginTop: 14, marginBottom: 22, gap: 6 },
})`;

// The app's details, and what can be done with it.
export const AppSheet = cs`(props: {
  app: App;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const { app, onClose, onEdit, onDelete } = props;
  const colors = $useColors();
  const navigation = $useNavigation();
  const open = () => {
    onClose();
    navigation.dispatch($StackActions.push("App", { appId: app.id }));
  };
  const remove = () =>
    $Alert.alert(
      "Delete " + app.title + "?",
      "It leaves your apps, and its link stops working.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          // The home's own server deletes it, then the apps load again.
          onPress: async () => {
            onClose();
            await fetch($home + "/apps/" + app.id + "/delete", {
              method: "POST",
            });
            onDelete();
          },
        },
      ],
    );
  return (
    <$Sheet onClose={onClose}>
      <$Text style={[$sheetStyles.sheetTitle, { color: colors.ink }]}>
        {app.title}
      </$Text>
      <$View style={$styles.details}>
        {/* Tapped, it shows the version's source: for the curious, so
            it looks like the rest of the details. */}
        <$Link
          action={$StackActions.push("Source", { id: app.id })}
          onPress={onClose}
          style={[$sheetStyles.detail, { color: colors.muted }]}
        >
          {"Version " + app.version + " · saved " + $ago(app.savedAt)}
        </$Link>
        <$Text style={[$sheetStyles.detail, { color: colors.muted }]}>
          {"Created " + $date(app.createdAt)}
        </$Text>
      </$View>
      <$Button label="Open" kind="filled" onPress={open} />
      <$Button label="Edit" kind="outlined" onPress={onEdit} />
      <$Button label="Delete" kind="danger" onPress={remove} />
    </$Sheet>
  );
}`;
