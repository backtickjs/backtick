# @backtickjs/react-native-client

Runs a [Backtick](https://backtickjs.com) server's screens in a React Native app. Your server runs its server components per request and answers with a bundle: one JavaScript file holding the screen's data and its compiled client scripts. `evaluate` runs that bundle with the app's own React and React Native and returns the screen to draw. It is what a web page's import map and script tag do for a browser, in under 1 KB.

Fetching the bundle stays with the app, on purpose: headers, auth, caching and when to fetch again are yours.

## Install

```sh
npm install @backtickjs/react-native-client
```

## Usage

Give `evaluate` the modules a bundle may require, then fetch a screen and draw it. Hold the request, a promise, in state in a component that doesn't suspend, so it outlives the render that waits for it, and draw it with React's `use` under `<Suspense>`:

```tsx
import { evaluate } from "@backtickjs/react-native-client";
import * as React from "react";
import { Suspense, use, useState } from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNative from "react-native";

// What a screen may require: the packages this app was built with.
const modules = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNative,
};

async function fetchScreen(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${url} answered ${response.status}.`);
  }
  return evaluate(await response.text(), modules) as React.ReactNode;
}

export default function App() {
  const [screen] = useState(() =>
    fetchScreen("https://api.example.com/screens/home"),
  );
  return (
    <Suspense fallback={<ReactNative.ActivityIndicator />}>
      <Screen screen={screen} />
    </Suspense>
  );
}

function Screen({ screen }: { screen: Promise<React.ReactNode> }) {
  return use(screen);
}
```

Wrap the `<Suspense>` in an error boundary to show a screen that couldn't be fetched or run. To fetch again, set a new promise in state. The React Native template of [create-backtick-app](https://github.com/backtickjs/backtick/tree/main/packages/create-backtick-app) has the full version, with the boundary and a refetch whenever the development server restarts.

The server bundles for the versions the app runs: it passes them to `bundler.build` as `packageVersions`, so they should match the packages you put in `modules`.

## API

### `evaluate(code: string, modules: Modules): unknown`

Runs `code` as a CommonJS module, with `require` answered from `modules`, and returns what it exports: for a Backtick screen, the element to draw. A bundle that requires a specifier missing from `modules` throws:

```
The bundle requires "expo-haptics", which this app doesn't provide.
```

Errors thrown while the bundle runs propagate to the caller.

### `Modules`

```ts
type Modules = Readonly<Record<string, unknown>>;
```

What a bundle may require, by specifier, each as its module namespace. At least `react`, `react/jsx-runtime` and `react-native`; add any other package the app chooses to offer its screens.

## Security

`evaluate` runs the bundle with `new Function`, which works on Hermes and JavaScriptCore. A bundle is code with the app's full abilities, so the server is trusted: serve screens over HTTPS from an endpoint you control.

## Related

- [`@backtickjs/core`](https://github.com/backtickjs/backtick/tree/main/packages/core): `cs` and the types for writing screens
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): builds the bundles this runs
- [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/packages/react-native): React Native's components and APIs, to splice into scripts
- [`create-backtick-app`](https://github.com/backtickjs/backtick/tree/main/packages/create-backtick-app): an Expo app with a Backtick server beside it
- [Documentation](https://backtickjs.com/docs)

## License

MIT
