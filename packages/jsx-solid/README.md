# @backtickjs/jsx-solid

Solid's JSX for [Backtick](https://backtickjs.com): a JSX runtime that type-checks the JSX in your server components against Solid's own types, and a compile plugin that runs Solid's compiler on each script at build time. Solid itself is imported for the client, as any other package is: `import { createSignal } from "solid-js" with { backtick: "client" }`. Solid is a peer dependency: this package is built against Solid 1.9.14, and works with any later 1.x.

## Install

```sh
npm install solid-js @backtickjs/jsx-solid @backtickjs/core @backtickjs/bundler @backtickjs/node-plugin
npm install -D @backtickjs/tsc
```

The [repository's README](https://github.com/backtickjs/backtick#packages) says what each package is.

## Setup

In `tsconfig.json`, point JSX at this package and keep imports as written:

```jsonc
{
  "compilerOptions": {
    "verbatimModuleSyntax": true,
    "jsx": "react-jsx",
    "jsxImportSource": "@backtickjs/jsx-solid",
  },
}
```

`verbatimModuleSyntax` keeps the import of a name you only splice, such as a client component from another file, which TypeScript would otherwise drop as unused. `"jsx": "react-jsx"` only applies to the JSX in your server components; scripts are compiled by Solid's compiler.

In `package.json`, name the compile plugin:

```json
{
  "backtick": {
    "plugins": ["@backtickjs/jsx-solid/plugin"]
  }
}
```

Run your server with `node --import @backtickjs/node-plugin server/index.tsx`.

## Usage

A client component, with Solid's signal imported for the client, and a server component that draws it beside a server value:

```tsx
// server/Home.tsx
import { cs } from "@backtickjs/core";
import { createSignal } from "solid-js" with { backtick: "client" };

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
import { render } from "solid-js/web" with { backtick: "client" };
import { Home } from "./Home.js";

const element = <Home />;
const bundle = await bundler.build({
  input: cs`$render(() => $element, document.getElementById("app")!)`,
  modules: {
    "solid-js": "1.9.17",
    "solid-js/store": "1.9.17",
    "solid-js/web": "1.9.17",
  },
});
const { code } = bundle.generate({ format: "es" });
```

## What it exports

- `@backtickjs/jsx-solid/jsx-runtime` and `@backtickjs/jsx-solid/jsx-dev-runtime`: the JSX runtime for server components, and its `JSX` namespace.
- `@backtickjs/jsx-solid/plugin`: the compile plugin, Solid's compiler (`babel-preset-solid`, DOM output).

## Related

- [`@backtickjs/core`](https://github.com/backtickjs/backtick/tree/main/packages/core): the `cs` tag
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): builds bundles
- [`@backtickjs/jsx-react`](https://github.com/backtickjs/backtick/tree/main/packages/jsx-react): React's JSX
- [Thinking in Backtick](https://backtickjs.com/docs/thinking-in-backtick/)
- [How it works](https://backtickjs.com/docs/how-it-works/)

## License

MIT
