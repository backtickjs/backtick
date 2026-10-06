# @backtickjs/react

The React adapter for [Backtick](https://backtickjs.com): React's API as client values your scripts splice (`$useState`, `<$Suspense>`), a JSX runtime that type-checks the JSX in your server components against React's own types, and a compile plugin that runs React's JSX transform on each script at build time. Its version tracks the React it supports: `19.2.3` works with React `^19.2.3`. It is also the React half of [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/packages/react-native).

It follows React's server components model: a server component is an async function that runs on your server per request, and hooks belong to client components, written as `` cs`(props) => …` ``.

## Install

```sh
npm install @backtickjs/react @backtickjs/core @backtickjs/bundler @backtickjs/node-plugin
npm install -D @backtickjs/tsc
```

`@backtickjs/core` has the `cs` tag, `@backtickjs/bundler` bundles per request, `@backtickjs/node-plugin` compiles scripts as Node loads your server (`@backtickjs/bun-plugin` on Bun), and `@backtickjs/tsc` type-checks scripts and their splices.

## Setup

In `tsconfig.json`, point JSX at the adapter and keep imports as written:

```jsonc
{
  "compilerOptions": {
    "verbatimModuleSyntax": true,
    "jsx": "react-jsx",
    "jsxImportSource": "@backtickjs/react",
  },
}
```

`verbatimModuleSyntax` keeps the import of a name you only splice, such as `$useState`, which TypeScript would otherwise drop as unused.

In `package.json`, name the compile plugin:

```json
{
  "backtick": {
    "plugins": ["@backtickjs/react/plugin"]
  }
}
```

Run your server with `node --import @backtickjs/node-plugin server/index.tsx`.

## Usage

A client component, with its hook spliced from the adapter, and a server component that draws it beside a server value:

```tsx
// server/Home.tsx
import { cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";

const Counter = cs`() => {
  const [count, setCount] = $useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
  );
}`;

export async function Home() {
  const assembledAt = new Date().toLocaleTimeString();
  return cs`(
    <main>
      <$Counter />
      <p>Your server assembled this page at {$assembledAt}.</p>
    </main>
  )`;
}
```

On each request, bundle it for the React versions the page loads, and serve the result as a `<script type="module">`, with an import map that resolves `react`, `react/jsx-runtime` and `react-dom/client`:

```tsx
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { createRoot } from "@backtickjs/react/client";
import { Home } from "./Home.js";

const element = <Home />;
const bundle = await bundler.build({
  input: cs`$createRoot(document.getElementById("app")!).render($element)`,
  packageVersions: { react: "19.2.3", "react-dom": "19.2.3" },
});
const { code } = bundle.generate({ format: "es" });
```

## What it exports

- `@backtickjs/react`: React's exports, name for name, as client values (`useState`, `useEffect`, `Suspense`, `createContext`, …), and React's types.
- `@backtickjs/react/client`: `react-dom/client`'s `createRoot` and `hydrateRoot`, to mount a bundle in the browser.
- `@backtickjs/react/jsx-runtime` and `@backtickjs/react/jsx-dev-runtime`: the JSX runtime for server components, and its `JSX` namespace.
- `@backtickjs/react/plugin`: the compile plugin, React's JSX transform (`@babel/preset-react`, automatic runtime).

## Related

- [`@backtickjs/core`](https://github.com/backtickjs/backtick/tree/main/packages/core): the `cs` tag
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): builds bundles
- [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/packages/react-native): the React Native adapter
- [`@backtickjs/solid-js`](https://github.com/backtickjs/backtick/tree/main/packages/solid-js): the Solid adapter
- [Documentation](https://backtickjs.com/docs)

## License

MIT
