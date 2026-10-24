import { cs } from "@backtickjs/core";
import { shellURL } from "./links.js";
import { Logo, Shine, useColors } from "./look.js";
import { Link } from "expo-router" with { backtick: "client" };
import { Pressable, StyleSheet, Text, View } from "react-native" with {
  backtick: "client",
};

// What a phone without a session sees, in backtickjs.com's look. The button is
// the shell's `sign-in` link, which runs Google's sign-in on the phone, where
// the session is kept.
export function SignIn() {
  return cs`{
    const styles = $StyleSheet.create({
      screen: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 28,
        gap: 28,
      },
      headline: {
        fontSize: 44,
        lineHeight: 47,
        fontWeight: "800",
        letterSpacing: -1.9,
      },
      lede: { fontSize: 18, lineHeight: 28 },
      button: {
        alignSelf: "flex-start",
        borderRadius: 999,
        paddingHorizontal: 24,
        paddingVertical: 15,
      },
      label: { fontSize: 16, fontWeight: "600" },
    });

    function SignIn() {
      const colors = $useColors();
      return (
        <$View style={[styles.screen, { backgroundColor: colors.paper }]}>
          <$Logo width={140} color={colors.ink} />
          <$View>
            <$Text style={[styles.headline, { color: colors.ink }]}>
              The apps you ask for,
            </$Text>
            <$Shine size={44} colors={colors.shine}>
              on your phone.
            </$Shine>
          </$View>
          <$Text style={[styles.lede, { color: colors.muted }]}>
            Ask Claude for an app, and it opens here: native, from a link.
          </$Text>
          <$Link href={$shellURL("sign-in")} asChild>
            <$Pressable
              style={[styles.button, { backgroundColor: colors.ink }]}
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
