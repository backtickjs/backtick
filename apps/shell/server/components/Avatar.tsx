import { cs } from "@backtickjs/core";
import { useColors } from "./look.js";
import { Image, StyleSheet, Text, View } from "react-native" with {
  backtick: "client",
};

// Who's signed in: the name and picture their sign-in gave, and the email.
export type Account = {
  name: string;
  email: string;
  picture: string | null;
};

const styles = cs`$StyleSheet.create({
  initial: { alignItems: "center", justifyContent: "center" },
})`;

// The account's picture, or its initial in a circle.
export const Avatar = cs`(props: { size: number; account: Account }) => {
  const { size, account } = props;
  const colors = $useColors();
  const round = { width: size, height: size, borderRadius: size / 2 };
  const picture = account.picture;
  return picture ? (
    <$Image source={{ uri: picture }} style={round} />
  ) : (
    <$View style={[round, $styles.initial, { backgroundColor: colors.line }]}>
      <$Text
        style={{
          color: colors.ink,
          fontSize: size * 0.42,
          fontWeight: "700",
        }}
      >
        {(account.name || account.email || "?").slice(0, 1).toUpperCase()}
      </$Text>
    </$View>
  );
}`;
