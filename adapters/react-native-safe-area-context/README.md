# @backtickjs/react-native-safe-area-context

The Safe Area Context adapter for [Backtick](https://backtickjs.com): `react-native-safe-area-context`'s components and hooks as client values your scripts splice (`$useSafeAreaInsets`, `<$SafeAreaView>`), each typed with its own declarations. Its version tracks the react-native-safe-area-context it supports: `5.7.0` works with `react-native-safe-area-context` `^5.7.0`, as in Expo SDK 57. It pairs with [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react) and [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native).

## Install

```sh
npm install @backtickjs/react-native-safe-area-context @backtickjs/react-native @backtickjs/react @backtickjs/core @backtickjs/bundler @backtickjs/node-plugin
npm install -D @backtickjs/tsc
```

The app itself needs `react-native-safe-area-context`, with its `<SafeAreaProvider>` around what it draws: `npx expo install react-native-safe-area-context`. The [repository's README](https://github.com/backtickjs/backtick#packages) says what each package is.

## Usage

A header that clears the status bar and the notch, whatever the phone:

```tsx
// server/Home.tsx
import { cs } from "@backtickjs/core";
import { Text, View } from "@backtickjs/react-native";
import { useSafeAreaInsets } from "@backtickjs/react-native-safe-area-context";

const Header = cs`() => {
  const insets = $useSafeAreaInsets();
  return (
    <$View style={{ paddingTop: insets.top + 8, paddingHorizontal: 16 }}>
      <$Text>Home</$Text>
    </$View>
  );
}`;

export async function Home() {
  return cs`<$Header />`;
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
    "react-native-safe-area-context": "5.7.0",
  },
});
```

In the app, offer it to bundles by the name the adapter imports it from:

```tsx
const moduleMap = {
  // …react, react/jsx-runtime, react-native
  "react-native-safe-area-context": () =>
    require("react-native-safe-area-context"),
};
```

## What it exports

- `@backtickjs/react-native-safe-area-context`: `react-native-safe-area-context`'s exports, name for name, as client values (`useSafeAreaInsets`, `useSafeAreaFrame`, `SafeAreaView`, `SafeAreaProvider`, …), and its types.

## Related

- [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native): the React Native adapter
- [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react): the React adapter
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): builds bundles

## License

MIT
