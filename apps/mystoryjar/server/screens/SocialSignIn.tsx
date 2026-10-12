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
import { Button } from "../ui/Button.js";
import { icons } from "../ui/icons.js";
import { useColors } from "../ui/theme.js";

// Signing in with Google, Apple or Facebook: each SDK asks its user on the
// phone, and the token it gives goes to the server, which signs in to
// Firebase with it. Google and Facebook need native code that Expo Go lacks;
// there they're left out, as is Apple everywhere but iOS.

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

// Which providers are registered, decided here; whether the app has their
// SDK, on the phone.
const registered = {
  google: google.webClientId !== "",
  facebook: facebook.appId !== "",
};

export const SocialSignIn = cs`(props: SocialSignInProps) => (
  <$View style={{ gap: 8 }}>
    <$Apple {...props} />
    {${registered.google} && $GoogleSignin !== undefined && (
      <$Google {...props} />
    )}
    {${registered.facebook} && $LoginManager !== undefined && (
      <$Facebook {...props} />
    )}
  </$View>
)`;
