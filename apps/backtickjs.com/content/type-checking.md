```jsonc file=type-checking/server/tsconfig.json

```

Client scripts are type-checked as TypeScript, the code inside every
`` cs`…` `` and every splice crossing into it, by `backtick-tsc` and in your
editor.

## In your project

A new project's `npm run typecheck` checks your app and your server:

```sh
tsc --noEmit && backtick-tsc -p server --noEmit
```

`backtick-tsc` is `tsc` that understands client scripts: it takes `tsc`'s
arguments, and reports errors inside scripts at the line and column you wrote.
Run it in CI as you would `tsc`.

The server's `tsconfig.json`, above, needs two settings:

- **`"jsxImportSource": "@backtickjs/react"`,** so JSX in your server
  components and scripts is checked against React's types.
- **`"verbatimModuleSyntax": true`,** so the import of a name you only splice,
  such as `$View`, isn't dropped as unused.

## In your editor

[Backtick for VS
Code](https://marketplace.visualstudio.com/items?itemName=backtickjs.backtick-vscode)
highlights scripts as TSX, colours splices, and shows errors, completions and
hover information inside scripts. It runs as a TypeScript plugin: if your
project has its own TypeScript, select it with **TypeScript: Select TypeScript
Version → Use Workspace Version**.

## What's checked

- **Splices:** what crosses has to be data or a script. A function or a class
  instance is refused: "Argument of type '() => void' is not assignable to
  parameter of type 'Spliceable'".
- **Names:** a script sees its own code and the phone's globals. A server name
  without its `$` is "Property 'total' does not exist on type 'GlobalThis'".
- **Tags:** `<$Name>` is checked as JSX, props included, however the component
  is declared.
- **Client values on your server:** a hook called in a server component is
  "This expression is not callable".
