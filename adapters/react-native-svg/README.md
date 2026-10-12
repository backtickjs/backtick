# @backtickjs/react-native-svg

The React Native SVG adapter for [Backtick](https://backtickjs.com): `react-native-svg`'s components and API as client values your scripts splice (`<$Svg>`, `<$Path>`, `<$SvgXml>`), each typed with its own declarations. Its version tracks the react-native-svg it supports: `15.15.4` works with `react-native-svg` `^15.15.4`, as in Expo SDK 57. It pairs with [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react) and [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native).

## Install

```sh
npm install @backtickjs/react-native-svg @backtickjs/react-native @backtickjs/react @backtickjs/core @backtickjs/bundler @backtickjs/node-plugin
npm install -D @backtickjs/tsc
```

The app itself needs `react-native-svg`: `npx expo install react-native-svg`. The [repository's README](https://github.com/backtickjs/backtick#packages) says what each package is.

## Usage

An icon drawn from a path the server holds, in the colour the client picks:

```tsx
// server/Home.tsx
import { cs } from "@backtickjs/core";
import { Path, Svg } from "@backtickjs/react-native-svg";

export async function Home() {
  const check = "M4 10l4 4 8-8";
  return cs`(
    <$Svg width={24} height={24} viewBox="0 0 20 20">
      <$Path d={$check} stroke="#E9707D" strokeWidth={2} fill="none" />
    </$Svg>
  )`;
}
```

On each request, bundle it for the versions the app provides:

```tsx
const bundle = await bundler.build({
  input: <Home />,
  packageVersions: {
    react: "19.2.3",
    "react-native": "0.86.3",
    "react-native-svg": "15.15.4",
  },
});
```

In the app, offer react-native-svg to bundles by the name the adapter imports it from:

```tsx
import * as ReactNativeSvg from "react-native-svg";

const modules = {
  // …react, react/jsx-runtime, react-native
  "react-native-svg": ReactNativeSvg,
};
```

## What it exports

- `@backtickjs/react-native-svg`: `react-native-svg`'s named exports, name for name, as client values (`Svg`, `Path`, `Circle`, `G`, `SvgXml`, `LinearGradient`, …), and its types. Its default export is `Svg`, which a script splices by that name.

## Related

- [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native): the React Native adapter
- [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react): the React adapter
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): builds bundles

## License

MIT
