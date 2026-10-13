# @backtickjs/expo-secure-store

The Expo SecureStore adapter for [Backtick](https://backtickjs.com): `expo-secure-store`'s API as client values your scripts splice (`$getItemAsync`, `$setItemAsync`, `$deleteItemAsync`), each typed with its own declarations. Its version tracks the expo-secure-store it supports: `57.0.4` works with `expo-secure-store` `^57.0.4`, as in Expo SDK 57. It pairs with [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react) and [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native).

## Install

```sh
npm install @backtickjs/expo-secure-store @backtickjs/react-native @backtickjs/react @backtickjs/core @backtickjs/bundler @backtickjs/node-plugin
npm install -D @backtickjs/tsc
```

The app itself needs `expo-secure-store`: `npx expo install expo-secure-store`. The [repository's README](https://github.com/backtickjs/backtick#packages) says what each package is.

## Usage

A client function that keeps a token in the device's keychain or keystore, called from a client component:

```tsx
// server/SignIn.tsx
import { cs } from "@backtickjs/core";
import { setItemAsync } from "@backtickjs/expo-secure-store";
import { Pressable, Text } from "@backtickjs/react-native";

const keep = cs`(token: string) => $setItemAsync("session", token)`;

export async function SignIn() {
  return cs`(
    <$Pressable onPress={() => $keep("…")}>
      <$Text>Sign in</$Text>
    </$Pressable>
  )`;
}
```

On each request, bundle it for the versions the app provides:

```tsx
const bundle = await bundler.build({
  input: <SignIn />,
  modules: {
    react: "19.2.3",
    "react/jsx-runtime": "19.2.3",
    "react-native": "0.86.3",
    "expo-secure-store": "57.0.4",
  },
});
```

In the app, offer SecureStore to bundles by the name the adapter imports it from:

```tsx
const moduleMap = {
  // …react, react/jsx-runtime, react-native
  "expo-secure-store": () => require("expo-secure-store"),
};
```

## What it exports

- `@backtickjs/expo-secure-store`: `expo-secure-store`'s exports, name for name, as client values (`getItemAsync`, `setItemAsync`, `deleteItemAsync`, `WHEN_UNLOCKED`, …), and its types.

## Related

- [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native): the React Native adapter
- [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react): the React adapter
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): builds bundles

## License

MIT
