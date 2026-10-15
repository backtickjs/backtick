# @backtickjs/bundler

Turns a screen into one JavaScript file for the client. On each request, your server calls `bundler.build` with a server component; the bundler runs it and the server components it draws, and combines their data with the client scripts they return into a bundle. Scripts were already compiled at build time, so nothing is compiled or parsed per request.

## Install

```sh
npm install @backtickjs/bundler @backtickjs/core
```

## Usage

For React Native, write CommonJS and serve it; the app fetches it and runs it with `evaluate` from `@backtickjs/react-native-client`:

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
import { createRoot } from "@backtickjs/react/client";
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

The modules the client provides, by specifier, each at the exact version of the package it comes from: `"react-dom/client": "19.2.3"`. The server decides which to bundle for: one app version, or one per build with [`@backtickjs/builds`](https://github.com/backtickjs/backtick/tree/main/packages/builds). Those modules are left out of the bundle, which imports (`es`) or requires (`cjs`) them. `build` rejects a script that imports from any other module, or whose import needs a range that doesn't include the version given: an adapter's (`^19.2.3` for `@backtickjs/react`) or one written with `createImport`.

`supports(modules, specifier, range)` makes the same check, for a server choosing what to draw for a client: `supports(modules, "expo-haptics", "^15")`.

### What crosses into a script

Spliced values are written into the bundle as data, never as code. What can't cross, `build` rejects before anything reaches the client; [Errors](https://backtickjs.com/docs/errors#from-the-bundler) has each message and its fix.

### Formats

- `"es"`: an ES module, for a web page. Packages are imported by specifier, which the page's import map resolves.
- `"cjs"`: CommonJS, for a client that provides `require` itself, as a React Native app does through `evaluate`.

### Source maps

`sourcemap: "inline"` appends the map to the code as a `data:` URL; `"hidden"` doesn't. Either way, it is also returned as `map`. The map names your server files and lines, not their content. None by default.

## API

- `bundler.build({ input, modules })`: runs the server components in `input` and returns a `Build`. Async.
- `Build.generate({ format, sourcemap })`: writes the bundle; returns `{ code, map }`, where `code` is a `Bundle<T>` (from `@backtickjs/core`), typed by what `input` is on the client, and `map` is `null` without a source map.
- Types: `BuildOptions`, `OutputOptions`, `OutputChunk`, `Build`.

## Related

- [`@backtickjs/core`](https://github.com/backtickjs/backtick/tree/main/packages/core): the `cs` tag
- [`@backtickjs/react-native-client`](https://github.com/backtickjs/backtick/tree/main/packages/react-native-client): runs a `cjs` bundle in a React Native app
- [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react), [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native), [`@backtickjs/solid-js`](https://github.com/backtickjs/backtick/tree/main/adapters/solid-js): framework adapters
- [How it works](https://backtickjs.com/docs/how-it-works)
- [Errors](https://backtickjs.com/docs/errors)

## License

MIT
