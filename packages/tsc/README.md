# @backtickjs/tsc

`backtick-tsc` is `tsc` that understands `cs` client scripts. Plain `tsc` sees a script as a template string typed `Client<unknown>`; `backtick-tsc` type-checks the code inside it and every splice (`$name`) crossing into it from the server, and reports Backtick's own compiler errors alongside TypeScript's. Use it to type-check a project in CI or from a `typecheck` script, and to write declarations for a package that exports scripts.

## Install

```sh
npm install --save-dev @backtickjs/tsc typescript
```

Requires TypeScript 6.

## Usage

Type-check, as you would with `tsc --noEmit`:

```json
{
  "scripts": {
    "typecheck": "backtick-tsc --noEmit"
  }
}
```

It takes `tsc`'s arguments, for example a specific config:

```sh
backtick-tsc -p tsconfig.build.json --noEmit
```

Write declarations for a library:

```sh
backtick-tsc --emitDeclarationOnly
```

A script's declaration carries its real type, where plain `tsc` would write `Client<unknown>`, and its parameter names read as you wrote them.

## Notes

- It writes declarations only. Run it with `--noEmit` or `--emitDeclarationOnly`; any other emit is refused with an error, because the JavaScript it would write is the code the type checker reads, not code that runs. To build JavaScript, use a loader ([`@backtickjs/node-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/node-plugin), [`@backtickjs/bun-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/bun-plugin)) or `tspc` with [`@backtickjs/tspatch-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/tspatch-plugin).
- Editors show the same diagnostics through [`@backtickjs/typescript-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/typescript-plugin) and [Backtick for VS Code](https://marketplace.visualstudio.com/items?itemName=backtickjs.backtick-vscode).

## Related

- [`@backtickjs/tspatch-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/tspatch-plugin): builds JavaScript with `tspc`
- [`@backtickjs/node-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/node-plugin) and [`@backtickjs/bun-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/bun-plugin): compile at load time
- [How it works](https://backtickjs.com/docs/how-it-works)

## License

MIT
