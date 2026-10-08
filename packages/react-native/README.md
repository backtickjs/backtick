# @backtickjs/react-native

The React Native adapter for [Backtick](https://backtickjs.com): React Native's API as client values your scripts splice (`<$View>`, `$StyleSheet`, `$Animated`), each typed with React Native's own declarations. Its version tracks the React Native it supports: `0.86.3` works with React Native `^0.86.3`, as in Expo SDK 57. It pairs with [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/packages/react), which provides React's hooks, the JSX runtime and the compile plugin.

## Install

```sh
npm install @backtickjs/react-native @backtickjs/react @backtickjs/core @backtickjs/bundler @backtickjs/node-plugin
npm install -D @backtickjs/tsc
```

The app itself needs `react`, `react-native` and `@backtickjs/react-native-client`. The [repository's README](https://github.com/backtickjs/backtick#packages) says what each package is; `npx create-backtick-app@latest` sets them all up.

## Setup

In the server's `tsconfig.json`, point JSX at the React adapter and keep imports as written:

```jsonc
{
  "compilerOptions": {
    "verbatimModuleSyntax": true,
    "jsx": "react-jsx",
    "jsxImportSource": "@backtickjs/react",
  },
}
```

`verbatimModuleSyntax` keeps the import of a name you only splice, such as `$View`, which TypeScript would otherwise drop as unused. If the app and the server share a project, give the server its own `server/tsconfig.json` and exclude `server` from the app's.

In `package.json`, name the React compile plugin; React Native needs none of its own:

```json
{
  "backtick": {
    "plugins": ["@backtickjs/react/plugin"]
  }
}
```

Run your server with `node --import @backtickjs/node-plugin server/index.tsx`.

## Usage

A client component, with its hook spliced from `@backtickjs/react` and its components from this adapter, and a server component that draws it beside a server value:

```tsx
// server/Home.tsx
import { cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";
import { Pressable, Text, View } from "@backtickjs/react-native";

const Counter = cs`() => {
  const [count, setCount] = $useState(0);
  return (
    <$Pressable onPress={() => setCount(count + 1)}>
      <$Text>Tapped {count} times</$Text>
    </$Pressable>
  );
}`;

export async function Home() {
  const assembledAt = new Date().toLocaleTimeString();
  return cs`(
    <$View style={{ padding: 24, gap: 8 }}>
      <$Counter />
      <$Text>Your server assembled this screen at {$assembledAt}.</$Text>
    </$View>
  )`;
}
```

On each request, bundle it for the versions the app runs, and answer with the code, which the app runs with `evaluate` from `@backtickjs/react-native-client`:

```tsx
import { bundler } from "@backtickjs/bundler";
import { Home } from "./Home.js";

const bundle = await bundler.build({
  input: <Home />,
  packageVersions: { react: "19.2.3", "react-native": "0.86.3" },
});
const { code } = bundle.generate({ format: "cjs" });
```

## What it exports

- `@backtickjs/react-native`: `react-native`'s exports, name for name, as client values (`View`, `Text`, `Pressable`, `FlatList`, `StyleSheet`, `Animated`, `Linking`, …), and React Native's types.

React's own names (`useState`, `Suspense`, …), the JSX runtime and the compile plugin come from `@backtickjs/react`.

## Related

- [`@backtickjs/core`](https://github.com/backtickjs/backtick/tree/main/packages/core): the `cs` tag
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): builds bundles
- [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/packages/react): the React adapter
- [`@backtickjs/react-native-client`](https://github.com/backtickjs/backtick/tree/main/packages/react-native-client): runs bundles in the app
- [`@backtickjs/solid-js`](https://github.com/backtickjs/backtick/tree/main/packages/solid-js): the Solid adapter
- [React Native and packages](https://backtickjs.com/docs/react-native-and-packages)
- [How it works](https://backtickjs.com/docs/how-it-works)

## License

MIT
