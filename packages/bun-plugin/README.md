# @backtickjs/bun-plugin

Runs a Backtick server on Bun without a build step. It's a Bun plugin, preloaded, that compiles your server's TypeScript and JSX files as they load, including their `cs` client scripts and the framework compile steps your project names. Use it in development and in production when Bun is your runtime; on Node, use [`@backtickjs/node-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/node-plugin) instead.

## Install

```sh
bun add @backtickjs/bun-plugin typescript
```

It's a runtime dependency: the server needs it whenever it starts. Requires TypeScript 6.

## Usage

Preload it from `bunfig.toml`:

```toml
preload = ["@backtickjs/bun-plugin"]
```

or from the command line:

```sh
bun --preload @backtickjs/bun-plugin server/index.tsx
```

Run it from the project root: the plugin reads `package.json` from the current directory. In development, add `--watch` to restart the server when a file changes:

```sh
bun --watch --preload @backtickjs/bun-plugin server/index.tsx
```

What it does:

- Compiles every `.ts` and `.tsx` file outside `node_modules`, each with the `tsconfig.json` nearest to it, so a server and an app beside it can each have their own. (Bun alone reads only the root `tsconfig.json`.)
- Compiles each `cs` script in those files, with the framework compile steps named in `package.json` (below). A script the compiler refuses throws its error, and the file doesn't load.

## Configuration

Name your framework's compile steps in the project's `package.json`:

```json
{
  "backtick": {
    "plugins": ["@backtickjs/react/plugin"]
  }
}
```

Use `@backtickjs/solid-js/plugin` for Solid. The steps are loaded once, at startup, with the project's own `require`.

Compiler options come from the nearest `tsconfig.json`, following `extends`. The plugin always emits ES modules (`ESNext`) with an inline source map, and ignores `outDir`, `rootDir` and other output-location options.

## Notes

- The plugin compiles; it doesn't type-check. Run [`backtick-tsc`](https://github.com/backtickjs/backtick/tree/main/packages/tsc) for that.
- For stack traces that point at your files, the plugin stamps a `// @bun` pragma on its output so Bun uses its inline source map. This relies on undocumented Bun behavior and could break on a Bun upgrade.
- With that pragma, Bun reads the output as Latin-1, so the plugin escapes every non-ASCII character as `\uXXXX`. Strings and identifiers keep their meaning, but stack-trace columns after non-ASCII text on the same line may be off; line numbers stay right.
- Files under `node_modules` are handed back to Bun uncompiled.

## Related

- [`@backtickjs/node-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/node-plugin): the same for Node
- [`@backtickjs/tsc`](https://github.com/backtickjs/backtick/tree/main/packages/tsc): type-checks scripts and their splices
- [Documentation](https://backtickjs.com/docs)

## License

MIT
