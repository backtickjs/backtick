import { cs } from "@backtickjs/core";
import { shellURL } from "./links.js";
import { Logo, useColors } from "./look.js";
import { Link } from "expo-router" with { backtick: "client" };
import { Pressable, StyleSheet, Text, View } from "react-native" with {
  backtick: "client",
};

// What a phone without a session sees: the wordmark and the button, in
// backtickjs.com's look. The button is the shell's `sign-in` link, which runs
// Google's sign-in on the phone, where the session is kept.
export function SignIn() {
  return cs`{
    const styles = $StyleSheet.create({
      screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
      },
      button: { borderRadius: 999, paddingHorizontal: 24, paddingVertical: 15 },
      label: { fontSize: 16, fontWeight: "600" },
    });

    function SignIn() {
      const colors = $useColors();
      return (
        <$View style={[styles.screen, { backgroundColor: colors.paper }]}>
          <$Logo width={180} color={colors.ink} />
          <$Link href={$shellURL("sign-in")} asChild>
            <$Pressable
              // One style object: Link's asChild drops an array.
              style={$StyleSheet.flatten([
                styles.button,
                { backgroundColor: colors.ink },
              ])}
            >
              <$Text style={[styles.label, { color: colors.paper }]}>
                Sign in with Google
              </$Text>
            </$Pressable>
          </$Link>
        </$View>
      );
    }

    return <SignIn />;
  }`;
}
