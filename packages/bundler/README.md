# @backtickjs/bundler

Turns a screen into one JavaScript file for the client. On each request, your server calls `bundler.build` with a server component; the bundler runs it and the server components it draws, and combines their data with the client scripts they return into a bundle. Scripts were already compiled at build time, so nothing is compiled or parsed per request.

## Install

```sh
npm install @backtickjs/bundler @backtickjs/core
```

## Usage

For React Native, write CommonJS and serve it; the app fetches it and runs it with a runtime from `createRuntime`, in `@backtickjs/core`:

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
const { code } = build.generate();
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
const { code } = build.generate({ sourcemap: "inline" });
```

### `modules`

The modules the client provides, by specifier, each at the exact version of the package it comes from: `"react-dom/client": "19.2.3"`. The server decides which to bundle for: one app version, or the ones each build sends, as [`@backtickjs/core`](https://github.com/backtickjs/backtick/tree/main/packages/core#every-build-in-users-hands) puts them together. Those modules are left out of the bundle, which requires them. `build` rejects a script that imports from any other module, or whose import is typed against a version the one given isn't compatible with: an earlier one, or another major. `19.2.3` for `react` takes any later 19.x.

`supports(specifier, range)` makes the same check, for a server component choosing what to draw for the client the bundler is drawing for: `supports("expo-haptics", "^15")`. It asks about the modules of the build in progress, so it's called in a server component, while `build` runs it; outside one, it throws.

A refused import throws `UnsupportedImportError`, carrying the module (`from`), the export (`imported`), the version it's typed against (`version`) and the one the client provides (`provided`, or `undefined` for none). The client can't change, so `render` answers it with a 406 whose bundle throws it, which the app answers with a screen asking to update, by the error's `name`, and hands it to `onBundlerError`. A server that draws such a client something else instead catches it around `build`:

```ts
try {
  bundle = await bundler.build({ input: <Home />, modules });
} catch (error) {
  if (!(error instanceof UnsupportedImportError)) {
    throw error;
  }
  bundle = await bundler.build({ input: <Simpler />, modules });
}
```

### What crosses into a script

Spliced values are written into the bundle as data, never as code. What can't cross, `build` rejects before anything reaches the client; [Errors](https://backtickjs.dev/docs/errors/#from-the-bundler) has each message and its fix.

### What a bundle is

The body of a function of `module`, `exports` and `require`, whose `module.exports` is the value: whatever runs it hands it `require`, as a React Native app does through `createRuntime`, or a page with the modules its import map loads.

### Source maps

`sourcemap: "inline"` appends the map to the code as a `data:` URL; `"hidden"` doesn't. Either way, it is also returned as `map`. The map names your server files and lines, not their content. None by default.

## API

- `bundler.build({ input, modules })`: runs the server components in `input` and returns a `Build`. Async. `input` is a `Client<T>`: an element, as `<Home />`, or a script. Plain data is sent as a script, `` cs`${value}` ``.
- `Build.generate({ sourcemap })`: writes the bundle; returns `{ code, map }`, where `code` is a `Bundle<T>` (from `@backtickjs/core`) for an `input` of `Client<T>`, which the client runs to a `T`, and `map` is `null` without a source map.
- `supports(specifier, range)`: in a server component, whether the client being drawn for provides `specifier` at a version in `range`.
- `BundlerError`: what `build` throws when it refuses its input, such as a value it can't splice. An error a server component throws passes through as it is.
- `UnsupportedImportError`, a `BundlerError`: what `build` throws for a script's import the client can't run.
- `createRender({ onBundlerError })`: makes `render`, for a server that speaks the Fetch API's `Request` and `Response`, as Hono, Next.js route handlers and Workers do. `onBundlerError(error, request)` is called with each `BundlerError` `render` answers; it's required, so where refusals go is a choice, and `() => {}` drops them.
- `render(request, input, init?)`: `input`, a `Client<T>`, bundled for the modules the request's `x-backtick-modules` header lists, as CommonJS, which an app runs against its own modules on every platform, as a `BundleResponse<T>` (from `@backtickjs/core`): `text/javascript`, `no-store`, with `init`'s status and headers, which win over its own. A bundle it can't make, a missing or unreadable `x-backtick-modules` among them, is answered with a bundle that throws the `BundlerError`, so the app's `exec` throws an `Error` with its `name` and `message`: a 406 for an `UnsupportedImportError`, a 400 for anything else, never stored. An error a server component throws passes through.

  ```tsx
  const render = createRender({
    onBundlerError: (error) => console.error(error),
  });
  app.get("/", (c) => render(c.req.raw, <Home />));
  if (!show) return render(c.req.raw, <NotFound />, { status: 404 });
  ```

- Types: `BuildOptions`, `OutputOptions`, `OutputChunk`, `Build`, `Modules`.

## Related

- [`@backtickjs/core`](https://github.com/backtickjs/backtick/tree/main/packages/core): the `cs` tag, and `createRuntime`, which runs bundles in the app
- [`@backtickjs/jsx-react`](https://github.com/backtickjs/backtick/tree/main/packages/jsx-react), [`@backtickjs/jsx-solid`](https://github.com/backtickjs/backtick/tree/main/packages/jsx-solid): each framework's JSX
- [How it works](https://backtickjs.dev/docs/how-it-works/)
- [Errors](https://backtickjs.dev/docs/errors/)

## License

MIT
