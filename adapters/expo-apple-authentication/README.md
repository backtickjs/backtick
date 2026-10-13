# @backtickjs/expo-apple-authentication

The Expo Apple Authentication adapter for [Backtick](https://backtickjs.com): `expo-apple-authentication`'s API as client values your scripts splice (`$signInAsync(…)`, `<$AppleAuthenticationButton>`), each typed with its own declarations. Its version tracks the expo-apple-authentication it supports: `57.0.2` works with `expo-apple-authentication` `^57.0.2`, as in Expo SDK 57. It pairs with [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react) and [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native).

## Install

```sh
npm install @backtickjs/expo-apple-authentication @backtickjs/react-native @backtickjs/react @backtickjs/core @backtickjs/bundler @backtickjs/node-plugin
npm install -D @backtickjs/tsc
```

The app itself needs `expo-apple-authentication`: `npx expo install expo-apple-authentication`, with `"usesAppleSignIn": true` under `ios` in `app.json`. The [repository's README](https://github.com/backtickjs/backtick#packages) says what each package is.

## Usage

A client component that signs in with Apple, on iOS, and hands the identity token to the server:

```tsx
// server/SignIn.tsx
import { cs } from "@backtickjs/core";
import {
  AppleAuthenticationScope,
  signInAsync,
} from "@backtickjs/expo-apple-authentication";
import { Pressable, Text } from "@backtickjs/react-native";
const SignInWithApple = cs`(props: { onToken: (token: string) => void }) => (
  <$Pressable
    onPress={async () => {
      const credential = await $signInAsync({
        requestedScopes: [$AppleAuthenticationScope.EMAIL],
      });
      if (credential.identityToken !== null) {
        props.onToken(credential.identityToken);
      }
    }}
  >
    <$Text>Sign in with Apple</$Text>
  </$Pressable>
)`;
```

On each request, bundle it for the versions the app provides, `"expo-apple-authentication": "57.0.2"` among them. In the app, offer it to bundles by the name the adapter imports it from:

```tsx
const moduleMap = {
  // …react, react/jsx-runtime, react-native
  "expo-apple-authentication": () => require("expo-apple-authentication"),
};
```

## What it exports

- `@backtickjs/expo-apple-authentication`: `expo-apple-authentication`'s exports, name for name, as client values (`signInAsync`, `isAvailableAsync`, `AppleAuthenticationButton`, `AppleAuthenticationScope`, …), and its types.

## Related

- [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native): the React Native adapter
- [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react): the React adapter
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): builds bundles

## License

MIT
