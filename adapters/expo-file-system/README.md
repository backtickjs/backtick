# @backtickjs/expo-file-system

The Expo FileSystem adapter for [Backtick](https://backtickjs.com): `expo-file-system`'s API as client values your scripts splice (`$File`, `$Directory`, `$Paths`), each typed with its own declarations. Its version tracks the expo-file-system it supports: `57.0.7` works with `expo-file-system` `^57.0.7`, as in Expo SDK 57. It pairs with [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react) and [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native).

## Install

```sh
npm install @backtickjs/expo-file-system @backtickjs/react-native @backtickjs/react @backtickjs/core @backtickjs/bundler @backtickjs/node-plugin
npm install -D @backtickjs/tsc
```

The app itself needs `expo-file-system`: `npx expo install expo-file-system`. The [repository's README](https://github.com/backtickjs/backtick#packages) says what each package is.

## Usage

A photo the phone picked, sent from disk to the server without reading it into JavaScript:

```tsx
// server/Upload.tsx
import { cs } from "@backtickjs/core";
import { File } from "@backtickjs/expo-file-system";

const upload = cs`async (uri: string) => {
  const result = await new $File(uri).upload("https://example.com/photos", {
    mimeType: "image/jpeg",
  });
  return result.status === 200;
}`;
```

On each request, bundle it for the versions the app provides, `"expo-file-system": "57.0.7"` among them. In the app, offer it to bundles by the name the adapter imports it from:

```tsx
const moduleMap = {
  // …react, react/jsx-runtime, react-native
  "expo-file-system": () => require("expo-file-system"),
};
```

## What it exports

- `@backtickjs/expo-file-system`: `expo-file-system`'s exports, name for name, as client values (`File`, `Directory`, `Paths`, `UploadType`, …), and its types.

## Related

- [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native): the React Native adapter
- [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react): the React adapter
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): builds bundles

## License

MIT
