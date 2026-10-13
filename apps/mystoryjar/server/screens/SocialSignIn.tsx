import { cs } from "@backtickjs/core";
import { useEffect, useState } from "@backtickjs/react";
import {
  AppleAuthenticationButton,
  AppleAuthenticationButtonStyle,
  AppleAuthenticationButtonType,
  AppleAuthenticationScope,
  isAvailableAsync,
  signInAsync,
} from "@backtickjs/expo-apple-authentication";
import {
  CryptoDigestAlgorithm,
  digestStringAsync,
  randomUUID,
} from "@backtickjs/expo-crypto";
import { Platform, View } from "@backtickjs/react-native";
import {
  AccessToken,
  AuthenticationToken,
  LoginManager,
} from "@backtickjs/react-native-fbsdk-next";
import { GoogleSignin } from "@backtickjs/react-native-google-signin";
import type { IdpToken } from "../auth/firebaseAuth.js";
import { facebook, google } from "../auth/providers.js";
import { supports } from "../builds.js";
import type { Packages } from "../packages.js";
import { Button } from "../ui/Button.js";
import { icons } from "../ui/icons.js";
import { useColors } from "../ui/theme.js";

// Signing in with Google, Apple or Facebook: each SDK asks its user on the
// phone, and the token it gives goes to the server, which signs in to
// Firebase with it. Google and Facebook need native code, so only builds
// whose module map has their SDK get their button; Apple is left out, on the
// phone, everywhere but iOS.

export type SocialSignInProps = {
  verb: "Sign in" | "Sign up";
  onToken: (token: IdpToken) => void;
  onError: (error: string) => void;
};

// A nonce for Apple and Facebook's Limited Login: they sign its hash into the
// token, and Firebase checks it against the original.
const nonce = cs`async () => {
  const raw = $randomUUID();
  const hashed = await $digestStringAsync($CryptoDigestAlgorithm.SHA256, raw);
  return { raw, hashed };
}`;

// What an SDK throws when the person backs out, which isn't an error to show.
const cancelled = cs`(error: unknown) => {
  const code = (error as { code?: string }).code;
  return code === "ERR_REQUEST_CANCELED" || code === "SIGN_IN_CANCELLED";
}`;

const Google = cs`(props: SocialSignInProps) => (
  <$Button
    label={props.verb + " with Google"}
    icon={${icons.google}}
    onPress={async () => {
      try {
        $GoogleSignin.configure($google);
        await $GoogleSignin.hasPlayServices();
        const response = await $GoogleSignin.signIn();
        if (response.type === "success" && response.data.idToken !== null) {
          props.onToken({
            provider: "google.com",
            idToken: response.data.idToken,
          });
        }
      } catch (error) {
        if (!$cancelled(error))
          props.onError("That sign-in didn't work. Try again.");
      }
    }}
  />
)`;

const Facebook = cs`(props: SocialSignInProps) => (
  <$Button
    label={props.verb + " with Facebook"}
    icon={${icons.facebook}}
    onPress={async () => {
      try {
        // iOS signs in with Limited Login, unless the person allowed
        // tracking: an OpenID token, for a nonce.
        if ($Platform.OS === "ios") {
          const { raw, hashed } = await $nonce();
          const result = await $LoginManager.logInWithPermissions(
            ["public_profile", "email"],
            "limited",
            hashed,
          );
          const token = await $AuthenticationToken.getAuthenticationTokenIOS();
          if (!result.isCancelled && token !== null) {
            props.onToken({
              provider: "facebook.com",
              idToken: token.authenticationToken,
              nonce: raw,
            });
          }
          return;
        }
        const result = await $LoginManager.logInWithPermissions([
          "public_profile",
          "email",
        ]);
        const token = await $AccessToken.getCurrentAccessToken();
        if (!result.isCancelled && token !== null) {
          props.onToken({
            provider: "facebook.com",
            accessToken: token.accessToken,
          });
        }
      } catch (error) {
        if (!$cancelled(error))
          props.onError("That sign-in didn't work. Try again.");
      }
    }}
  />
)`;

// Apple's own button, as its guidelines ask.
const Apple = cs`(props: SocialSignInProps) => {
  const colors = $useColors();
  const [available, setAvailable] = $useState(false);
  $useEffect(() => {
    $isAvailableAsync().then(setAvailable);
  }, []);
  if (!available) {
    return null;
  }
  return (
    <$AppleAuthenticationButton
      buttonType={
        props.verb === "Sign in"
          ? $AppleAuthenticationButtonType.SIGN_IN
          : $AppleAuthenticationButtonType.SIGN_UP
      }
      // white, with the shadow the other buttons have, as they're white on
      // the page's grey
      buttonStyle={$AppleAuthenticationButtonStyle.WHITE}
      cornerRadius={20}
      style={{
        height: 40,
        borderRadius: 20,
        boxShadow: colors.smallShadow || undefined,
      }}
      onPress={async () => {
        try {
          const { raw, hashed } = await $nonce();
          const credential = await $signInAsync({
            requestedScopes: [
              $AppleAuthenticationScope.FULL_NAME,
              $AppleAuthenticationScope.EMAIL,
            ],
            nonce: hashed,
          });
          if (credential.identityToken !== null) {
            props.onToken({
              provider: "apple.com",
              idToken: credential.identityToken,
              nonce: raw,
            });
          }
        } catch (error) {
          if (!$cancelled(error))
            props.onError("That sign-in didn't work. Try again.");
        }
      }}
    />
  );
}`;

// No button, for a provider a build can't sign in with.
const Nothing = cs`(_props: SocialSignInProps) => null`;

/**
 * The sign-in buttons for a build with `packages`: Google's and Facebook's
 * when the provider is registered and the build has its SDK. Decided here,
 * so a build without one is never sent its script.
 */
export function socialSignIn(packages: Packages) {
  const GoogleButton =
    google.webClientId !== "" &&
    supports(packages, "@react-native-google-signin/google-signin", "*")
      ? Google
      : Nothing;
  const FacebookButton =
    facebook.appId !== "" && supports(packages, "react-native-fbsdk-next", "*")
      ? Facebook
      : Nothing;
  return cs`(props: SocialSignInProps) => (
    <$View style={{ gap: 8 }}>
      <$Apple {...props} />
      <$GoogleButton {...props} />
      <$FacebookButton {...props} />
    </$View>
  )`;
}
