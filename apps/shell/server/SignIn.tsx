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
import { useSafeAreaInsets } from "react-native-safe-area-context" with {
  backtick: "client",
};
import { Path, Svg } from "react-native-svg" with { backtick: "client" };

// What a phone without a session sees, in backtickjs.com's look: the wordmark
// above, and the ways to sign in below, within the thumb's reach. Apple (on
// an iPhone) and Google are one tap; email opens Backtick's sign-in page.
// Each is a shell link that opens the system's sign-in browser.
export function SignIn() {
  return cs`{
    const styles = $StyleSheet.create({
      screen: { flex: 1, paddingHorizontal: 24 },
      // Lifted above the centre, so the group sits about 40% down.
      brand: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        paddingBottom: 96,
      },
      tagline: { fontSize: 17, textAlign: "center", lineHeight: 24 },
      buttons: { gap: 12 },
      button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        height: 54,
        borderRadius: 999,
        borderWidth: 1,
      },
      label: { fontSize: 16, fontWeight: "600" },
    });

    // Google's "G", in its own colours, as its sign-in buttons show it.
    function GoogleG() {
      return (
        <$Svg width={18} height={18} viewBox="0 0 48 48">
          <$Path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
          />
          <$Path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
          />
          <$Path
            fill="#FBBC05"
            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
          />
          <$Path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
          />
        </$Svg>
      );
    }

    // backtickjs.com's pill: solid ink, or outlined.
    function Continue(props: {
      to: string;
      label: string;
      solid: boolean;
      icon: "apple" | "google" | "email";
    }) {
      const colors = $useColors();
      const text = props.solid ? colors.paper : colors.ink;
      return (
        <$Link href={$shellURL(props.to)} asChild>
          <$Pressable
            // One style object: Link's asChild drops an array.
            style={$StyleSheet.flatten([
              styles.button,
              {
                borderColor: props.solid ? colors.ink : colors.line,
                backgroundColor: props.solid ? colors.ink : "transparent",
              },
            ])}
          >
            {props.icon === "google" ? (
              <GoogleG />
            ) : (
              <$Ionicons
                name={props.icon === "apple" ? "logo-apple" : "mail-outline"}
                size={19}
                color={text}
              />
            )}
            <$Text style={[styles.label, { color: text }]}>{props.label}</$Text>
          </$Pressable>
        </$Link>
      );
    }

    function SignIn() {
      const colors = $useColors();
      const insets = $useSafeAreaInsets();
      return (
        <$View
          style={[
            styles.screen,
            {
              backgroundColor: colors.paper,
              paddingTop: insets.top,
              paddingBottom: insets.bottom + 24,
            },
          ]}
        >
          <$View style={styles.brand}>
            <$Logo width={200} color={colors.ink} />
            <$Text style={[styles.tagline, { color: colors.muted }]}>
              {/* Broken by hand: two even lines on any phone. */}
              Build native apps with AI,{"\n"}all from your phone.
            </$Text>
          </$View>
          <$View style={styles.buttons}>
            {$Platform.OS === "ios" ? (
              <Continue
                to="sign-in?provider=apple"
                label="Continue with Apple"
                solid
                icon="apple"
              />
            ) : null}
            <Continue
              to="sign-in?provider=google"
              label="Continue with Google"
              solid
              icon="google"
            />
            <Continue
              to="sign-in"
              label="Continue with email"
              solid={false}
              icon="email"
            />
          </$View>
        </$View>
      );
    }

    return <SignIn />;
  }`;
}
