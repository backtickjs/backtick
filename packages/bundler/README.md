# @backtickjs/bundler

Turns a screen into one JavaScript file for the client. On each request, your server calls `bundler.build` with a server component; the bundler runs it and the server components it draws, and combines their data with the client scripts they return into a bundle. Scripts were already compiled at build time, so nothing is compiled or parsed per request.

## Install

```sh
npm install @backtickjs/bundler @backtickjs/core
```

## Usage

For React Native, write CommonJS and serve it; the app fetches it and runs it with `execRoot` from `@backtickjs/core/cjs`:

```tsx
import { bundler } from "@backtickjs/bundler";
import { Home } from "./Home.js";

const modules = {
  react: "19.2.3",
  "react/jsx-runtime": "19.2.3",
  "react-native": "0.86.3",
};

// In a request handler:
const build = await bundler.build({ input: <Home />, modules });
const { code } = build.generate({ format: "cjs" });
response.setHeader("content-type", "text/javascript");
response.end(code);
```

For the web, write an ES module whose default export is the value, and load it with `<script type="module">` and an import map for the packages the page provides:

```tsx
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { createRoot } from "react-dom/client" with { backtick: "client" };
import { Home } from "./Home.js";

const element = <Home />;
const build = await bundler.build({
  input: cs`$createRoot(document.getElementById("app")!).render($element)`,
  modules: {
    react: "19.2.3",
    "react/jsx-runtime": "19.2.3",
    "react-dom/client": "19.2.3",
  },
});
const { code } = build.generate({ format: "es", sourcemap: "inline" });
```

### `modules`

The modules the client provides, by specifier, each at the exact version of the package it comes from: `"react-dom/client": "19.2.3"`. The server decides which to bundle for: one app version, or the ones each build sends, as [`@backtickjs/core`](https://github.com/backtickjs/backtick/tree/main/packages/core#every-build-in-users-hands) puts them together. Those modules are left out of the bundle, which imports (`es`) or requires (`cjs`) them. `build` rejects a script that imports from any other module, or whose import is typed against a version the one given isn't compatible with: an earlier one, or another major. `19.2.3` for `react` takes any later 19.x.

`supports(modules, specifier, range)` makes the same check, for a server choosing what to draw for a client: `supports(modules, "expo-haptics", "^15")`.

A refused import throws `ClientVersionMismatch`, carrying the module (`from`), the export (`imported`), the version it's typed against (`version`) and the one the client provides (`provided`, or `undefined` for none). The client can't change, so a server catches it to answer that client differently, such as with a 426 its app answers with a screen asking to update:

```ts
try {
  bundle = await bundler.build({ input, modules });
} catch (error) {
  if (!(error instanceof ClientVersionMismatch)) throw error;
  return context.body(null, 426);
}
```

### What crosses into a script

Spliced values are written into the bundle as data, never as code. What can't cross, `build` rejects before anything reaches the client; [Errors](https://backtickjs.com/docs/errors/#from-the-bundler) has each message and its fix.

### Formats

- `"es"`: an ES module, for a web page. Packages are imported by specifier, which the page's import map resolves.
- `"cjs"`: CommonJS, for a client that provides `require` itself, as a React Native app does through `execRoot`.

### Source maps

`sourcemap: "inline"` appends the map to the code as a `data:` URL; `"hidden"` doesn't. Either way, it is also returned as `map`. The map names your server files and lines, not their content. None by default.

## API

- `bundler.build({ input, modules })`: runs the server components in `input` and returns a `Build`. Async.
- `Build.generate({ format, sourcemap })`: writes the bundle; returns `{ code, map }`, where `code` is a `Bundle<T>` (from `@backtickjs/core`), typed by what `input` is on the client, and `map` is `null` without a source map.
- `supports(modules, specifier, range)`: whether a client with `modules` provides `specifier` at a version in `range`.
- `BundlerError`: what `build` throws when it refuses its input, such as a value it can't splice. An error a server component throws passes through as it is.
- `ClientVersionMismatch`, a `BundlerError`: what `build` throws for a script's import the client can't run.
- Types: `BuildOptions`, `OutputOptions`, `OutputChunk`, `Build`, `Modules`.

## Related

- [`@backtickjs/core`](https://github.com/backtickjs/backtick/tree/main/packages/core): the `cs` tag, and `execRoot`, which runs a bundle in the app
- [`@backtickjs/jsx-react`](https://github.com/backtickjs/backtick/tree/main/packages/jsx-react), [`@backtickjs/jsx-solid`](https://github.com/backtickjs/backtick/tree/main/packages/jsx-solid): each framework's JSX
- [How it works](https://backtickjs.com/docs/how-it-works/)
- [Errors](https://backtickjs.com/docs/errors/)

## License

MIT
