# @backtickjs/expo-image-picker

The Expo Image Picker adapter for [Backtick](https://backtickjs.com): `expo-image-picker`'s API as client values your scripts splice (`$launchImageLibraryAsync`, `$launchCameraAsync`), each typed with its own declarations. Its version tracks the expo-image-picker it supports: `57.0.20` works with `expo-image-picker` `^57.0.20`, as in Expo SDK 57. It pairs with [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react) and [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native).

## Install

```sh
npm install @backtickjs/expo-image-picker @backtickjs/react-native @backtickjs/react @backtickjs/core @backtickjs/bundler @backtickjs/node-plugin
npm install -D @backtickjs/tsc
```

The app itself needs `expo-image-picker`: `npx expo install expo-image-picker`. The [repository's README](https://github.com/backtickjs/backtick#packages) says what each package is.

## Usage

A button that picks a photo from the library, for the server to receive:

```tsx
// server/Home.tsx
import { cs } from "@backtickjs/core";
import { launchImageLibraryAsync } from "@backtickjs/expo-image-picker";
import { Pressable, Text } from "@backtickjs/react-native";

const PickPhoto = cs`(props: { onPick: (uri: string) => void }) => (
  <$Pressable
    onPress={async () => {
      const result = await $launchImageLibraryAsync({ mediaTypes: ["images"] });
      if (!result.canceled) props.onPick(result.assets[0]!.uri);
    }}
  >
    <$Text>Choose a photo</$Text>
  </$Pressable>
)`;
```

On each request, bundle it for the versions the app provides, `"expo-image-picker": "57.0.20"` among them. In the app, offer it to bundles by the name the adapter imports it from:

```tsx
import * as ImagePicker from "expo-image-picker";

const moduleMap = {
  // …react, react/jsx-runtime, react-native
  "expo-image-picker": ImagePicker,
};
```

## What it exports

- `@backtickjs/expo-image-picker`: `expo-image-picker`'s exports, name for name, as client values (`launchImageLibraryAsync`, `launchCameraAsync`, `requestMediaLibraryPermissionsAsync`, `MediaTypeOptions`, …), and its types.

## Related

- [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native): the React Native adapter
- [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react): the React adapter
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): builds bundles

## License

MIT
