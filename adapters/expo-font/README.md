# @backtickjs/expo-font

The Expo Font adapter for [Backtick](https://backtickjs.com): `expo-font`'s API as client values your scripts splice (`$useFonts`, `$loadAsync`, `$isLoaded`), each typed with its own declarations. Its version tracks the expo-font it supports: `57.0.4` works with `expo-font` `^57.0.4`, as in Expo SDK 57. It pairs with [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react) and [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native).

## Install

```sh
npm install @backtickjs/expo-font @backtickjs/react-native @backtickjs/react @backtickjs/core @backtickjs/bundler @backtickjs/node-plugin
npm install -D @backtickjs/tsc
```

The app itself needs `expo-font`: `npx expo install expo-font`. The [repository's README](https://github.com/backtickjs/backtick#packages) says what each package is.

## Usage

Fonts the server serves, loaded by the screen that uses them. A font loaded once stays loaded for the app's session, so the next screen finds it at once:

```tsx
// server/Home.tsx
import { cs } from "@backtickjs/core";
import { useFonts } from "@backtickjs/expo-font";
import { Text } from "@backtickjs/react-native";

const fonts = { Inter_500Medium: "https://example.com/fonts/inter-500.ttf" };

const Greeting = cs`() => {
  const [loaded] = $useFonts($fonts);
  return loaded ? (
    <$Text style={{ fontFamily: "Inter_500Medium" }}>Hello</$Text>
  ) : null;
}`;

export async function Home() {
  return cs`<$Greeting />`;
}
```

On each request, bundle it for the versions the app provides:

```tsx
const bundle = await bundler.build({
  input: <Home />,
  packageVersions: {
    react: "19.2.3",
    "react-native": "0.86.3",
    "expo-font": "57.0.4",
  },
});
```

In the app, offer expo-font to bundles by the name the adapter imports it from:

```tsx
import * as Font from "expo-font";

const modules = {
  // …react, react/jsx-runtime, react-native
  "expo-font": Font,
};
```

## What it exports

- `@backtickjs/expo-font`: `expo-font`'s exports, name for name, as client values (`useFonts`, `loadAsync`, `isLoaded`, `FontDisplay`, …), and its types.

## Related

- [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native): the React Native adapter
- [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react): the React adapter
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): builds bundles

## License

MIT
