# @backtickjs/expo-crypto

The Expo Crypto adapter for [Backtick](https://backtickjs.com): `expo-crypto`'s API as client values your scripts splice (`$digestStringAsync(…)`, `$randomUUID()`), each typed with its own declarations. Its version tracks the expo-crypto it supports: `57.0.4` works with `expo-crypto` `^57.0.4`, as in Expo SDK 57. It pairs with [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react) and [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native).

## Install

```sh
npm install @backtickjs/expo-crypto @backtickjs/react-native @backtickjs/react @backtickjs/core @backtickjs/bundler @backtickjs/node-plugin
npm install -D @backtickjs/tsc
```

The app itself needs `expo-crypto`: `npx expo install expo-crypto`. The [repository's README](https://github.com/backtickjs/backtick#packages) says what each package is.

## Usage

A client function that makes a nonce and its SHA-256 hash, as Sign in with Apple asks for:

```tsx
// server/SignIn.tsx
import { cs } from "@backtickjs/core";
import {
  CryptoDigestAlgorithm,
  digestStringAsync,
  randomUUID,
} from "@backtickjs/expo-crypto";
const nonce = cs`async () => {
  const raw = $randomUUID();
  const hashed = await $digestStringAsync($CryptoDigestAlgorithm.SHA256, raw);
  return { raw, hashed };
}`;
```

On each request, bundle it for the versions the app provides, `"expo-crypto": "57.0.4"` among them. In the app, offer it to bundles by the name the adapter imports it from:

```tsx
const moduleMap = {
  // …react, react/jsx-runtime, react-native
  "expo-crypto": () => require("expo-crypto"),
};
```

## What it exports

- `@backtickjs/expo-crypto`: `expo-crypto`'s exports, name for name, as client values (`digestStringAsync`, `randomUUID`, `getRandomBytes`, `CryptoDigestAlgorithm`, …), and its types.

## Related

- [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native): the React Native adapter
- [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react): the React adapter
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): builds bundles

## License

MIT
