# @backtickjs/react-error-boundary

The react-error-boundary adapter for [Backtick](https://backtickjs.com): `react-error-boundary`'s API as client values your scripts splice (`<$ErrorBoundary>`, `$useErrorBoundary()`, `$withErrorBoundary(…)`), each typed with its own declarations. Its version tracks the react-error-boundary it supports: `6.1.6` works with `react-error-boundary` `^6.1.6`. It pairs with [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react) and [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native).

## Install

```sh
npm install @backtickjs/react-error-boundary @backtickjs/react-native @backtickjs/react @backtickjs/core @backtickjs/bundler @backtickjs/node-plugin
npm install -D @backtickjs/tsc
```

The app itself needs `react-error-boundary`: `npm install react-error-boundary`. The [repository's README](https://github.com/backtickjs/backtick#packages) says what each package is.

## Usage

A client component that draws a fallback in place of whatever below it throws:

```tsx
// server/Item.tsx
import { cs } from "@backtickjs/core";
import { ErrorBoundary } from "@backtickjs/react-error-boundary";
import { Text } from "@backtickjs/react-native";
import type { ReactNode } from "react";

export const ItemBoundary = cs`(props: { children: ReactNode }) => (
  <$ErrorBoundary fallback={<$Text>Couldn't load this item.</$Text>}>
    {props.children}
  </$ErrorBoundary>
)`;
```

On each request, bundle for the versions the app provides, `"react-error-boundary": "6.1.6"` among them. In the app, offer it to bundles by the name the adapter imports it from:

```tsx
import * as ReactErrorBoundary from "react-error-boundary";

const moduleMap = {
  // …react, react/jsx-runtime, react-native
  "react-error-boundary": ReactErrorBoundary,
};
```

## What it exports

- `@backtickjs/react-error-boundary`: `react-error-boundary`'s exports, name for name, as client values (`ErrorBoundary`, `ErrorBoundaryContext`, `useErrorBoundary`, `withErrorBoundary`, `getErrorMessage`), and its types.

## Related

- [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native): the React Native adapter
- [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react): the React adapter
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): builds bundles

## License

MIT
