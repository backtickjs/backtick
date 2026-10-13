# @backtickjs/react-native-fbsdk-next

The React Native FBSDK Next adapter for [Backtick](https://backtickjs.com): `react-native-fbsdk-next`'s API as client values your scripts splice (`$LoginManager.logInWithPermissions(…)`, `$AccessToken`), each typed with its own declarations. Its version tracks the react-native-fbsdk-next it supports: `13.4.3` works with `react-native-fbsdk-next` `^13.4.3`. It pairs with [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react) and [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native).

## Install

```sh
npm install @backtickjs/react-native-fbsdk-next @backtickjs/react-native @backtickjs/react @backtickjs/core @backtickjs/bundler @backtickjs/node-plugin
npm install -D @backtickjs/tsc
```

The app itself needs `react-native-fbsdk-next`: `npx expo install react-native-fbsdk-next`, with its config plugin and your Facebook app ID and client token in `app.json`. The [repository's README](https://github.com/backtickjs/backtick#packages) says what each package is.

## Usage

A client component that signs in with Facebook and hands the access token to the server:

```tsx
// server/SignIn.tsx
import { cs } from "@backtickjs/core";
import { AccessToken, LoginManager } from "@backtickjs/react-native-fbsdk-next";
import { Pressable, Text } from "@backtickjs/react-native";
const SignInWithFacebook = cs`(props: { onToken: (token: string) => void }) => (
  <$Pressable
    onPress={async () => {
      const result = await $LoginManager.logInWithPermissions(["email"]);
      const token = await $AccessToken.getCurrentAccessToken();
      if (!result.isCancelled && token !== null) {
        props.onToken(token.accessToken);
      }
    }}
  >
    <$Text>Sign in with Facebook</$Text>
  </$Pressable>
)`;
```

On each request, bundle it for the versions the app provides, `"react-native-fbsdk-next": "13.4.3"` among them. In the app, offer it to bundles by the name the adapter imports it from:

```tsx
import * as Fbsdk from "react-native-fbsdk-next";

const moduleMap = {
  // …react, react/jsx-runtime, react-native
  "react-native-fbsdk-next": Fbsdk,
};
```

## What it exports

- `@backtickjs/react-native-fbsdk-next`: `react-native-fbsdk-next`'s exports, name for name, as client values (`LoginManager`, `AccessToken`, `AuthenticationToken`, `LoginButton`, `Settings`, …), and its types.

## Related

- [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native): the React Native adapter
- [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react): the React adapter
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): builds bundles

## License

MIT
