```ts
import {
  cs,
  type Client,
  type Spliceable,
  type Spliced,
  createImport,
} from "@backtickjs/core";
```

## `` cs`…` ``

Writes a client script: code in your server's files that runs on the phone.

```ts file=reference-core/server/shapes.ts

```

### The template

JavaScript or TypeScript, in one of three shapes:

- **An expression:** `` cs`new Date().getHours()` ``.
- **A block,** wrapped in braces: `` cs`{ const hour = …; return …; }` ``.
- **A function:** `` cs`(n: number) => n * 2` ``. A function that returns JSX
  is a client component.

It may splice values from your server, with `$name` or `${expression}`.

### Returns

A `Client<T>`, where `T` is what the script computes: an expression's value, a
block's `return`, or the function itself. TypeScript infers it.

### Caveats

- **`cs` is compiled when your server loads,** by `@backtickjs/node-plugin` or
  `@backtickjs/bun-plugin`. Without one, the first script throws "`cs` was not
  compiled. Is @backtickjs set up for this project?"
- **A script sees its own code, its splices and the phone's globals,** not the
  file around it. A name it doesn't declare is read from `globalThis`.
- **An expression or a block runs each time it's read,** and a function is one
  function, as when the same code is written by hand.
  [Client scripts](/docs/client-scripts#reading-a-script) shows both.
- **Names starting with `$` are splices,** so a script can't declare one.

## `Client<T>`

A script, as your server holds it: a value the phone computes as a `T`.

```ts
interface Client<T> {}
```

Your server can't read the `T`, which doesn't exist until the phone runs the
script. It can splice the script into another, pass it around, and return it
from a server component.

### Usage

Annotate a function that builds scripts, as `formatted` does here, taking the
phone's number and giving back the phone's string:

```ts file=reference-core/server/formatted.ts

```

## `Spliceable`

What a splice can carry:

```ts
type Spliceable =
  | Client<unknown>
  | null
  | undefined
  | number
  | bigint
  | boolean
  | string
  | readonly Spliceable[]
  | { readonly [key: string]: Spliceable };
```

Data, scripts, and arrays and plain objects of those, nested as deep as you
like. Numbers include `NaN`, `Infinity` and `-0`, which arrive as themselves,
as do bigints.

### Caveats

- **Splices take interfaces; `Spliceable` written by hand doesn't.** A splice,
  and `bundler.build`, check a value member by member, so an interface passes
  as a type alias does. `Spliceable` in an annotation or a `satisfies` matches
  an object through an index signature, which TypeScript never gives an
  interface.
- **Functions are refused.** A function on your server is your server's code;
  write the phone's as a script, `` cs`(n: number) => …` ``.
- **Class instances are refused when bundling,** and by TypeScript when they
  have methods. A class whose members are all data looks like a plain object
  to TypeScript, so the bundler is what refuses it.
- **A value that contains itself is refused when bundling.** A bundle writes
  each value out in full.

## `Spliced<T>`

What a spliced `T` is on the phone: each `Client<U>` in it becomes the `U` it
computes, through arrays and objects, and everything else is unchanged.

```ts file=reference-core/server/menu.ts

```

You rarely write it: TypeScript applies it to every splice. It's there to name
the phone's type of a value your server sends.

## `createImport`

Names an export of a package your app ships, for a script to splice.

```ts file=other-packages/server/expo.ts

```

### Parameters

- **`name`:** the export's name, as the package exports it.
- **`from`:** the specifier to import it from, `"expo-haptics"`.
- **`version`:** the package's versions it works with, a semver range such as
  `"~57.0.0"`.

### Returns

A `Client<T>`, `T` being the type you give it, usually the package's own:
`createImport<typeof ImpactAsync>(…)`.

### Caveats

- **`T` isn't checked against the package.** It's what your scripts are
  checked against, so take it from the package's types, as above.
- **The bundler checks `version`** against the version your server says the
  app provides, and refuses a screen the app can't run.
- **The app must provide the package,** to `evaluate`, or the bundle throws on
  the phone. [Using other packages](/docs/other-packages) has the three places
  a package goes.

## For tools and adapters

The rest of `@backtickjs/core` is how Backtick's own pieces talk to each
other. An app doesn't need it.

| Export                                                                               | What it is                                                                                         |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `cs.lift`, `cs.splice`, `cs.awaited`, `cs.globalThis`                                | What the type checker reads a script as. Calling one throws.                                       |
| `SplicesAs`                                                                          | A value's type, as a splice checks it: member by member. `bundler.build` checks its input with it. |
| `create`, `ClientScript`, `ClientModule`, `Param`, `isClientScript`                  | A compiled script, as the compiler writes it and the bundler reads it.                             |
| `ClientImport`, `isClientImport`                                                     | What `createImport` makes.                                                                         |
| `createJsxElement`, `isJsxElement`, `JsxElement`, `JsxElementOf`, `JsxElementTypeOf` | JSX on your server, as an adapter's JSX runtime makes it and the bundler draws it.                 |

## Troubleshooting

### "`cs` was not compiled. Is @backtickjs set up for this project?"

Your server ran a script without the plugin that compiles them. Start it with
`node --import @backtickjs/node-plugin`, or on Bun preload
`@backtickjs/bun-plugin`. A new project's `npm start` already does.

### "Argument of type '…' is not assignable to parameter of type 'Spliceable'."

The splice holds something that can't cross: a function, a class instance with
methods, a `Date`. Splice what it's for instead: a `Date` as a string, a
function as a client function. [Thinking in Backtick](/docs/thinking-in-backtick#what-can-cross)
has the fix in full.

### "Property '…' does not exist on type 'GlobalThis'."

A script used a name from your server without a `$`. Splice it:
`$total`, not `total`.
