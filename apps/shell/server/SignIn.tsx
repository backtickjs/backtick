import { cs } from "@backtickjs/core";
import { shellURL } from "./links.js";
import { Logo, useColors } from "./look.js";
import { Ionicons } from "@expo/vector-icons" with { backtick: "client" };
import { Link } from "expo-router" with { backtick: "client" };
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native" with {
  backtick: "client",
};

// What a phone without a session sees: the wordmark, and one tap to sign in
// with Apple (on an iPhone) or Google, or to choose another way (email) on
// Backtick's sign-in page. Each is a shell link that opens the system's
// sign-in browser.
export function SignIn() {
  return cs`{
    const styles = $StyleSheet.create({
      screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
      },
      buttons: { alignSelf: "stretch", marginHorizontal: 32, gap: 12 },
      button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        borderRadius: 999,
        paddingHorizontal: 24,
        paddingVertical: 15,
      },
      label: { fontSize: 16, fontWeight: "600" },
      other: { fontSize: 15, textAlign: "center", paddingVertical: 8 },
    });

    function Continue(props: {
      to: string;
      icon: "logo-apple" | "logo-google";
      label: string;
    }) {
      const colors = $useColors();
      return (
        <$Link href={$shellURL(props.to)} asChild>
          <$Pressable
            // One style object: Link's asChild drops an array.
            style={$StyleSheet.flatten([
              styles.button,
              { backgroundColor: colors.ink },
            ])}
          >
            <$Ionicons name={props.icon} size={18} color={colors.paper} />
            <$Text style={[styles.label, { color: colors.paper }]}>
              {props.label}
            </$Text>
          </$Pressable>
        </$Link>
      );
    }

    function SignIn() {
      const colors = $useColors();
      return (
        <$View style={[styles.screen, { backgroundColor: colors.paper }]}>
          <$Logo width={180} color={colors.ink} />
          <$View style={styles.buttons}>
            {$Platform.OS === "ios" ? (
              <Continue
                to="sign-in?provider=apple"
                icon="logo-apple"
                label="Continue with Apple"
              />
            ) : null}
            <Continue
              to="sign-in?provider=google"
              icon="logo-google"
              label="Continue with Google"
            />
            <$Link href={$shellURL("sign-in")}>
              <$Text style={[styles.other, { color: colors.muted }]}>
                Sign in another way
              </$Text>
            </$Link>
          </$View>
        </$View>
      );
    }

    return <SignIn />;
  }`;
}
