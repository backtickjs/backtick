```tsx file=client-scripts/server/Home.tsx

```

A client script is code inside `` cs`…` ``. It's written in your server's
files, but it runs on the phone. To your server, a script is a value, a
`Client<T>`: something the phone will compute as a `T`.

## Three shapes

A script is an expression, a block of statements, or a function:

- **An expression,** like `greeting`: `` cs`new Date().getHours() < 12 ? …` ``.
  It's a `Client<string>`, computed on the phone, so it reads the phone's clock
  rather than your server's.
- **A block of statements,** like the script `Home` returns: `` cs`{ … }` ``.
  Its `return` is what it is, here the screen. Use it when the script needs
  variables of its own.
- **A function,** like `formatPrice`: `` cs`(price: number) => …` ``. It's a
  `Client<(price: number) => string>`, a function the phone calls. A function
  that returns JSX is a [client component](/docs/client-components).

TypeScript infers each type, as `Client<string>` here; the annotations in the
example only show them.

## Full JavaScript

A script is ordinary modern JavaScript and TypeScript: loops, `try`/`catch`,
`async` functions, classes, destructuring, and JSX. It runs on the phone with
the phone's globals: `fetch`, `setTimeout`, `JSON`, `Math`, `Intl`, `console`
and the rest.

## What a script can see

A script sees its own code and the phone's globals, but not the file around
it: that's your server's code. To use a value from your server, splice it with
`$`, as `$total` and `$formatPrice` do. Forget the `$`, and TypeScript looks
for a global by that name:

```tsx file=client-scripts/server/Forgot.tsx

```

```text
Property 'total' does not exist on type 'GlobalThis'.
```

[Splices](/docs/splices) covers what can cross, and how.

## Compiled with your server

Scripts are compiled when your server loads its files, by
`@backtickjs/node-plugin` on Node or `@backtickjs/bun-plugin` on Bun, which a
new project already runs. Type errors in a script show in your editor and in
`npm run typecheck`; see [Type checking](/docs/type-checking).
