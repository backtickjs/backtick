```ts
import {
  bundler,
  type Bundle,
  type BuildOptions,
  type OutputOptions,
  type OutputChunk,
} from "@backtickjs/bundler";
```

## `bundler.build(options)`

Runs your server components and puts what they return into a bundle: the code
your app runs to draw the screen.

```tsx file=reference-bundler/server/index.tsx

```

### Options

- **`input`:** what to bundle, usually a server component drawn with its
  props, `<Home user={user} />`. Any value a splice can carry works too: a
  script, or data holding scripts.
- **`packageVersions`:** the packages the app provides, each at the exact
  version it's built with, `{ react: "19.2.3", "react-native": "0.86.3" }`.
  The bundle requires these rather than including them.

### Returns

A promise of a `Bundle`, written out by `generate`.

### Caveats

- **Build once per request.** Server components run during `build`, so each
  build reads fresh data and can draw a different screen for each user.
- **Each server component runs once for each place it's drawn,** as React
  runs a component once for each element.
- **Scripts were compiled when your server loaded,** so `build` compiles
  nothing: it runs your components and writes what they return.
- **It throws** for a screen the app can't run, before anything reaches the
  phone. Every message is under [Troubleshooting](#troubleshooting).

## `bundle.generate(options)`

Writes the bundle out.

```ts file=reference-bundler/server/sourcemap.ts

```

### Options

- **`format`:** `"cjs"`, CommonJS, for an app, which runs it with
  `evaluate`; or `"es"`, an ES module, for a web page.
- **`sourcemap`:** a map from the bundle back to your server's files.
  `"inline"` appends it to the code, `"hidden"` returns it apart, and `false`,
  the default, writes none. A map holds your files' names and lines, never
  their code.

### Returns

An `OutputChunk`: `{ code, map }`, `map` being `null` unless asked for.

## Troubleshooting

Each of these is thrown by `build`, for the screen it was building.

### "Can't import `…` from "…": the client provides …"

A script uses a package missing from `packageVersions`. Add it there, at the
version the app is built with, and to the app's modules. See
[Using other packages](/docs/other-packages).

### "Can't import `…` from "…": it needs …, and the client provides …"

The app was built with a version of the package outside the range in
`createImport`. Widen the range if the export works with that version, or
serve that app a screen that doesn't use it.

### "Can't splice the host function `…`: it's host code, and only runs on the host."

A function reached a splice, perhaps through `any`. Write the phone's code as a
script, `` cs`(n: number) => …` ``. A server component is drawn with a tag, in
a braced splice: `{${<Reviews />}}`.

### "Can't splice this `…` instance: only plain objects cross into a client script."

A class instance reached a splice. Cross its data as a plain object, `{ title:
todo.title }`, or build it on the phone with a client function.

### "Can't splice a symbol: a bundle can't write one that is the same symbol on the client."

A symbol reached a splice, through `any`. Splice its key as a string, and make
the symbol in a script: `` cs`Symbol.for($key)` ``.

### "Can't splice a value that contains itself"

A value refers back to itself, such as a tree whose nodes point at their
parents. Splice a copy without the back references.

### "`<…>` is drawn by the client, so it belongs in a script"

A tag like `<View>` was drawn on your server, outside a script. Draw it in one:
`` cs`<$View>…</$View>` ``.

### "`…` is a client component, so it can't be a tag on the host."

A client component, `` cs`(props) => …` ``, was drawn as a tag on your server.
Draw it in a script: `` cs`<$Card />` ``.
