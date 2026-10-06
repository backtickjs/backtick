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

const packageVersions = { react: "19.2.3", "react-native": "0.86.3" };

// In a request handler:
const bundle = await bundler.build({ input: <Home />, packageVersions });
const { code } = bundle.generate({ format: "cjs" });
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
const bundle = await bundler.build({
  input: cs`$createRoot(document.getElementById("app")!).render($element)`,
  packageVersions: { react: "19.2.3", "react-dom": "19.2.3" },
});
const { code } = bundle.generate({ format: "es", sourcemap: "inline" });
```

### `packageVersions`

The packages the client provides, each at its exact version. The server decides which versions to bundle for: one app version, or one per client if your server tells them apart. Those packages are left out of the bundle, which imports (`es`) or requires (`cjs`) them. `build` rejects a script that imports from any other package, or whose import needs a range that doesn't include the version given: an adapter's (`^19.2.3` for `@backtickjs/react`) or one written with `createImport`.

### What crosses into a script

Spliced values are written into the bundle as data: strings, finite numbers, booleans, `null`, `undefined`, plain objects and arrays. They are never written as code. A host function or a class instance can't be spliced, and `build` rejects one: write a client function as a script, `` cs`(n: number) => …` ``, and draw a server component through a splice, `{${<Footer />}}`.

### Formats

- `"es"`: an ES module, for a web page. Packages are imported by specifier, which the page's import map resolves.
- `"cjs"`: CommonJS, for a client that provides `require` itself, as a React Native app does through `evaluate`.

### Source maps

`sourcemap: "inline"` appends the map to the code as a `data:` URL; `"hidden"` doesn't. Either way, it is also returned as `map`. The map names your server files and lines, not their content. None by default.

## API

- `bundler.build({ input, packageVersions })`: runs the server components in `input` and returns a `Bundle`. Async.
- `Bundle.generate({ format, sourcemap })`: writes the bundle; returns `{ code, map }`, where `map` is `null` without a source map.
- Types: `BuildOptions`, `OutputOptions`, `OutputChunk`, `Bundle`.

## Related

- [`@backtickjs/core`](https://github.com/backtickjs/backtick/tree/main/packages/core): the `cs` tag
- [`@backtickjs/react-native-client`](https://github.com/backtickjs/backtick/tree/main/packages/react-native-client): runs a `cjs` bundle in a React Native app
- [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/packages/react), [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/packages/react-native), [`@backtickjs/solid-js`](https://github.com/backtickjs/backtick/tree/main/packages/solid-js): framework adapters
- [Documentation](https://backtickjs.com/docs)

## License

MIT
