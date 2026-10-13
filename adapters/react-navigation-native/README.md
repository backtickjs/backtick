# @backtickjs/react-navigation-native

The React Navigation adapter for [Backtick](https://backtickjs.com): `@react-navigation/native`'s API as client values your scripts splice (`$useNavigation`, `$StackActions`, `$useRoute`), each typed with React Navigation's own declarations. Its version tracks the React Navigation it supports: `7.5.0` works with `@react-navigation/native` `^7.5.0`. It pairs with [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react) and [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native).

## Install

```sh
npm install @backtickjs/react-navigation-native @backtickjs/react-native @backtickjs/react @backtickjs/core @backtickjs/bundler @backtickjs/node-plugin
npm install -D @backtickjs/tsc
```

The app itself needs `@react-navigation/native` and a navigator, such as `@react-navigation/native-stack`. The [repository's README](https://github.com/backtickjs/backtick#packages) says what each package is.

## Usage

The app's navigator stays in the app. A screen the server draws inside it navigates with the navigator's own hooks and actions. Here, the app has one stack screen, `Screen`, that draws the server path in its params:

```tsx
// server/Home.tsx
import { cs } from "@backtickjs/core";
import { Pressable, Text } from "@backtickjs/react-native";
import {
  StackActions,
  useNavigation,
} from "@backtickjs/react-navigation-native";

const OpenSettings = cs`() => {
  const navigation = $useNavigation();
  return (
    <$Pressable
      onPress={() =>
        navigation.dispatch($StackActions.push("Screen", { path: "/settings" }))
      }
    >
      <$Text>Settings</$Text>
    </$Pressable>
  );
}`;

export async function Home() {
  return cs`<$OpenSettings />`;
}
```

On each request, bundle it for the versions the app provides:

```tsx
const bundle = await bundler.build({
  input: <Home />,
  modules: {
    react: "19.2.3",
    "react/jsx-runtime": "19.2.3",
    "react-native": "0.86.3",
    "@react-navigation/native": "7.5.0",
  },
});
```

In the app, offer React Navigation to bundles by the name the adapter imports it from:

```tsx
const moduleMap = {
  // …react, react/jsx-runtime, react-native
  "@react-navigation/native": () => require("@react-navigation/native"),
};
```

## What it exports

- `@backtickjs/react-navigation-native`: `@react-navigation/native`'s exports, name for name, as client values (`useNavigation`, `useRoute`, `StackActions`, `CommonActions`, `Link`, …), and its types.

## Related

- [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native): the React Native adapter
- [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react): the React adapter
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): builds bundles

## License

MIT
