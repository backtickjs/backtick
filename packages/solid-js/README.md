# @backtickjs/solid-js

The Solid adapter for [Backtick](https://backtickjs.com): Solid's API as client values your scripts splice (`$createSignal`, `<$Show>`), a JSX runtime that type-checks the JSX in your server components against Solid's own types, and a compile plugin that runs Solid's compiler on each script at build time. Its version tracks the Solid it supports: `1.9.14` works with Solid `^1.9.14`.

A server component is an async function that runs on your server per request; client components are written as `` cs`(props) => …` `` and run in the browser.

## Install

```sh
npm install @backtickjs/solid-js @backtickjs/core @backtickjs/bundler @backtickjs/node-plugin
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
    "jsxImportSource": "@backtickjs/solid-js",
  },
}
```

`verbatimModuleSyntax` keeps the import of a name you only splice, such as `$createSignal`, which TypeScript would otherwise drop as unused. `"jsx": "react-jsx"` only applies to the JSX in your server components; scripts are compiled by Solid's compiler.

In `package.json`, name the compile plugin:

```json
{
  "backtick": {
    "plugins": ["@backtickjs/solid-js/plugin"]
  }
}
```

Run your server with `node --import @backtickjs/node-plugin server/index.tsx`.

## Usage

A client component, with its signal spliced from the adapter, and a server component that draws it beside a server value:

```tsx
// server/Home.tsx
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";

const Counter = cs`() => {
  const [count, setCount] = $createSignal(0);
  return (
    <button onClick={() => setCount(count() + 1)}>
      Clicked {count()} times
    </button>
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

On each request, bundle it for the Solid version the page loads, and serve the result as a `<script type="module">`, with an import map that resolves `solid-js`, `solid-js/web` and `solid-js/store`:

```tsx
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { render } from "@backtickjs/solid-js/web";
import { Home } from "./Home.js";

const element = <Home />;
const bundle = await bundler.build({
  input: cs`$render(() => $element, document.getElementById("app")!)`,
  packageVersions: { "solid-js": "1.9.14" },
});
const { code } = bundle.generate({ format: "es" });
```

## What it exports

- `@backtickjs/solid-js`: `solid-js`'s exports, name for name, as client values (`createSignal`, `createEffect`, `onMount`, `Show`, `For`, …), and Solid's types.
- `@backtickjs/solid-js/web`: `solid-js/web`'s exports (`render`, `Portal`, `Dynamic`, …), including what mounts a bundle in the browser.
- `@backtickjs/solid-js/store`: `solid-js/store`'s exports (`createStore`, `produce`, `reconcile`, …).
- `@backtickjs/solid-js/jsx-runtime` and `@backtickjs/solid-js/jsx-dev-runtime`: the JSX runtime for server components, and its `JSX` namespace.
- `@backtickjs/solid-js/plugin`: the compile plugin, Solid's compiler (`babel-preset-solid`, DOM output).

## Related

- [`@backtickjs/core`](https://github.com/backtickjs/backtick/tree/main/packages/core): the `cs` tag
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): builds bundles
- [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/packages/react): the React adapter
- [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/packages/react-native): the React Native adapter
- [Documentation](https://backtickjs.com/docs)

## License

MIT
