# @backtickjs/react-native-google-signin

The Google Sign-In adapter for [Backtick](https://backtickjs.com): `@react-native-google-signin/google-signin`'s API as client values your scripts splice (`$GoogleSignin.signIn()`, `<$GoogleSigninButton>`), each typed with its own declarations. Its version tracks the @react-native-google-signin/google-signin it supports: `16.1.5` works with `@react-native-google-signin/google-signin` `^16.1.5`. It pairs with [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react) and [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native).

## Install

```sh
npm install @backtickjs/react-native-google-signin @backtickjs/react-native @backtickjs/react @backtickjs/core @backtickjs/bundler @backtickjs/node-plugin
npm install -D @backtickjs/tsc
```

The app itself needs `@react-native-google-signin/google-signin`: `npx expo install @react-native-google-signin/google-signin`, with its config plugin and your OAuth client IDs in `app.json`. The [repository's README](https://github.com/backtickjs/backtick#packages) says what each package is.

## Usage

A client component that signs in with Google and hands the ID token to the server, which checks it:

```tsx
// server/SignIn.tsx
import { cs } from "@backtickjs/core";
import { GoogleSignin } from "@backtickjs/react-native-google-signin";
import { Pressable, Text } from "@backtickjs/react-native";
const webClientId = "1234-abcd.apps.googleusercontent.com";

const SignInWithGoogle = cs`(props: { onToken: (idToken: string) => void }) => (
  <$Pressable
    onPress={async () => {
      $GoogleSignin.configure({ webClientId: $webClientId });
      const response = await $GoogleSignin.signIn();
      if (response.type === "success" && response.data.idToken !== null) {
        props.onToken(response.data.idToken);
      }
    }}
  >
    <$Text>Sign in with Google</$Text>
  </$Pressable>
)`;
```

On each request, bundle it for the versions the app provides, `"@react-native-google-signin/google-signin": "16.1.5"` among them. In the app, offer it to bundles by the name the adapter imports it from:

```tsx
import * as GoogleSignIn from "@react-native-google-signin/google-signin";

const modules = {
  // …react, react/jsx-runtime, react-native
  "@react-native-google-signin/google-signin": GoogleSignIn,
};
```

## What it exports

- `@backtickjs/react-native-google-signin`: the names `@react-native-google-signin/google-signin`'s declarations export under Node's resolution, as client values (`GoogleSignin`, `GoogleSigninButton`, `statusCodes`), and its types.

Its declarations re-export the rest (`isSuccessResponse`, `isErrorWithCode`, `ConfigureParams`, …) with `export * from './functions'`, without an extension, which TypeScript drops under `"moduleResolution": "nodenext"`; this adapter is built that way, so it mirrors what that resolution sees. Compare `response.type` with `"success"` in place of `isSuccessResponse`.

## Related

- [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native): the React Native adapter
- [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react): the React adapter
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): builds bundles

## License

MIT
