# @backtickjs/jsx-react

React's JSX for [Backtick](https://backtickjs.com): a JSX runtime that type-checks the JSX in your server components against React's own types, and a compile plugin that runs React's JSX transform on each script at build time. React itself is imported for the client, as React Native and any other package is: `import { useState } from "react" with { backtick: "client" }`. React is a peer dependency: this package is built against React 19.2.3, and works with any later 19.x.

## Install

```sh
npm install react @backtickjs/jsx-react @backtickjs/core @backtickjs/bundler @backtickjs/node-plugin
npm install -D @types/react @backtickjs/tsc
```

The [repository's README](https://github.com/backtickjs/backtick#packages) says what each package is.

## Setup

In `tsconfig.json`, point JSX at this package and keep imports as written:

```jsonc
{
  "compilerOptions": {
    "verbatimModuleSyntax": true,
    "jsx": "react-jsx",
    "jsxImportSource": "@backtickjs/jsx-react",
  },
}
```

`verbatimModuleSyntax` keeps the import of a name you only splice, such as a client component from another file, which TypeScript would otherwise drop as unused.

In `package.json`, name the compile plugin:

```json
{
  "backtick": {
    "plugins": ["@backtickjs/jsx-react/plugin"]
  }
}
```

Run your server with `node --import @backtickjs/node-plugin server/index.tsx`.

## Usage

A client component, with React's hook imported for the client, and a server component that draws it beside a server value:

```tsx
// server/Home.tsx
import { cs } from "@backtickjs/core";
import { useState } from "react" with { backtick: "client" };

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
import { createRoot } from "react-dom/client" with { backtick: "client" };
import { Home } from "./Home.js";

const element = <Home />;
const bundle = await bundler.build({
  input: cs`$createRoot(document.getElementById("app")!).render($element)`,
  modules: {
    react: "19.2.3",
    "react/jsx-runtime": "19.2.3",
    "react-dom/client": "19.2.3",
  },
});
const { code } = bundle.generate({ format: "es" });
```

## What it exports

- `@backtickjs/jsx-react/jsx-runtime` and `@backtickjs/jsx-react/jsx-dev-runtime`: the JSX runtime for server components, and its `JSX` namespace.
- `@backtickjs/jsx-react/plugin`: the compile plugin, React's JSX transform, by TypeScript's own `react-jsx` emit.

## Related

- [`@backtickjs/core`](https://github.com/backtickjs/backtick/tree/main/packages/core): the `cs` tag
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): builds bundles
- [`@backtickjs/jsx-solid`](https://github.com/backtickjs/backtick/tree/main/packages/jsx-solid): Solid's JSX
- [Thinking in Backtick](https://backtickjs.com/docs/thinking-in-backtick/)
- [How it works](https://backtickjs.com/docs/how-it-works/)

## License

MIT
