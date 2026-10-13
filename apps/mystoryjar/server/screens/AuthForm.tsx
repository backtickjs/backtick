import { cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";
import { setItemAsync } from "@backtickjs/expo-secure-store";
import { Linking, Pressable, ScrollView, View } from "@backtickjs/react-native";
import { useSafeAreaInsets } from "@backtickjs/react-native-safe-area-context";
import type { IdpToken } from "../auth/firebaseAuth.js";
import { useStack } from "../navigation.js";
import { Button } from "../ui/Button.js";
import { Icon } from "../ui/Icon.js";
import { icons } from "../ui/icons.js";
import { Logo } from "../ui/Logo.js";
import { Notice } from "../ui/Notice.js";
import { usePost } from "../ui/server.js";
import { Text } from "../ui/Text.js";
import { TextInput } from "../ui/TextInput.js";
import { TextLink } from "../ui/TextLink.js";
import type { Packages } from "../packages.js";
import { socialSignIn } from "./SocialSignIn.js";

// The website's sign-in and sign-up form, one column 300 points wide: the
// logo, or what went wrong in its place, then email and password.

export type AuthFormProps = {
  greeting: string;
  // what the main button says, and the API it posts to
  action: "Sign in" | "Sign up";
  // the line under the form: "No account? Create one"
  other: { question: string; link: string; path: string };
};

const ForgotPassword = cs`(props: {
  email: string;
  onError: (error: string) => void;
}) => {
  const post = $usePost();
  const [sent, setSent] = $useState(false);
  if (sent) {
    return <$Text color="secondaryText">Success. Check your inbox</$Text>;
  }
  return (
    <$TextLink
      onPress={async () => {
        const answer = await post("/api/auth/reset", { email: props.email });
        if (answer.error !== undefined) props.onError(answer.error);
        else setSent(true);
      }}
    >
      Forgot Password?
    </$TextLink>
  );
}`;

const Legal = cs`() => (
  <$Text size={12} color="secondaryText" style={{ textAlign: "center" }}>
    By clicking Sign Up, you agree to the MyStoryJar{" "}
    <$TextLink
      size={12}
      onPress={() =>
        $Linking.openURL("https://www.mystoryjar.com/terms-and-conditions.pdf")
      }
    >
      Terms and Conditions
    </$TextLink>{" "}
    and{" "}
    <$TextLink
      size={12}
      onPress={() =>
        $Linking.openURL("https://www.mystoryjar.com/privacy-policy.pdf")
      }
    >
      Privacy Policy
    </$TextLink>
    .
  </$Text>
)`;

/** The form, for a build with `packages`, whose sign-in buttons it shows. */
export function authForm(packages: Packages) {
  const SocialSignIn = socialSignIn(packages);
  return cs`(props: AuthFormProps) => {
    const stack = $useStack();
    const post = $usePost();
    const insets = $useSafeAreaInsets();
    const [email, setEmail] = $useState("");
    const [password, setPassword] = $useState("");
    const [error, setError] = $useState<string | null>(null);
    const [busy, setBusy] = $useState(false);
    const signIn = props.action === "Sign in";

    // Signs in through the server, which answers a session to keep.
    const signInWith = async (path: string, body: object) => {
      setBusy(true);
      const answer = await post<{ session: string }>(path, body);
      setBusy(false);
      if (answer.error !== undefined) {
        setError(answer.error);
        return;
      }
      await $setItemAsync("session", answer.session);
      stack.restart("/");
    };
    const submit = () =>
      signInWith(signIn ? "/api/auth/signin" : "/api/auth/signup", {
        email,
        password,
      });

    return (
      <$ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 20,
          paddingHorizontal: 16,
        }}
      >
        <$Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={stack.back}
          style={{ width: 40, height: 50, justifyContent: "center" }}
        >
          <$Icon shapes={${icons["chevron-left"]}} color="secondaryText" />
        </$Pressable>
        <$View style={{ width: "100%", maxWidth: 300, alignSelf: "center" }}>
          <$View
            style={{
              minHeight: 100,
              marginVertical: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {error === null ? (
              ${(<Logo size={50} />)}
            ) : (
              <$Notice>{error}</$Notice>
            )}
          </$View>
          <$Text size={16} style={{ textAlign: "center", marginBottom: 8 }}>
            {props.greeting}
          </$Text>
          <$View style={{ gap: 8 }}>
            <$TextInput
              icon={${icons.email}}
              placeholder="email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            <$TextInput
              icon={${icons.lock}}
              placeholder="password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete={signIn ? "current-password" : "new-password"}
              textContentType={signIn ? "password" : "newPassword"}
              onSubmitEditing={submit}
            />
            <$Button
              label={props.action}
              primary
              disabled={busy || email.length < 4 || password.length < 4}
              onPress={submit}
            />
          </$View>
          <$View style={{ alignItems: "center", gap: 12, marginTop: 12 }}>
            {signIn && <$ForgotPassword email={email} onError={setError} />}
          </$View>
          <$View style={{ marginTop: 12, gap: 12 }}>
            <$Text style={{ textAlign: "center" }}>or</$Text>
            <$SocialSignIn
              verb={props.action}
              onToken={(token: IdpToken) => signInWith("/api/auth/idp", token)}
              onError={setError}
            />
          </$View>
          <$View style={{ alignItems: "center", gap: 12, marginTop: 20 }}>
            <$Text>
              {props.other.question}{" "}
              <$TextLink onPress={() => stack.replace(props.other.path)}>
                {props.other.link}
              </$TextLink>
            </$Text>
            {!signIn && <$Legal />}
          </$View>
        </$View>
      </$ScrollView>
    );
  }`;
}
