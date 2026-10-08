# @backtickjs/node-plugin

Runs a Backtick server on Node without a build step. It's a loader, registered with `--import`, that compiles your server's TypeScript and JSX files as they load, including their `cs` client scripts and the framework compile steps your project names. Use it in development and in production when Node is your runtime; on Bun, use [`@backtickjs/bun-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/bun-plugin) instead.

## Install

```sh
npm install @backtickjs/node-plugin typescript
```

It's a runtime dependency: the server needs it whenever it starts. Requires Node 22.15 or later (it uses `module.registerHooks`) and TypeScript 6.

## Usage

```sh
node --enable-source-maps --import @backtickjs/node-plugin server/index.tsx
```

Run it from the project root: the plugin reads `package.json` from the current directory. In development, add `--watch` to restart the server when a file changes:

```sh
node --watch --enable-source-maps --import @backtickjs/node-plugin server/index.tsx
```

What it does:

- Compiles every `.ts` and `.tsx` file outside `node_modules`, each with the `tsconfig.json` nearest to it, so a server and an app beside it can each have their own.
- Compiles each `cs` script in those files, with the framework compile steps named in `package.json` (below). A script the compiler refuses throws its error, and the file doesn't load.
- Resolves a relative `./Home.js` import to `./Home.ts` or `./Home.tsx` when no `.js` file exists, as TypeScript writes imports of files it compiles.
- Answers `require` as well as `import`, so a server file starts in a package without `"type": "module"`.

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
- Pass `--enable-source-maps` for stack traces that point at your `.ts`/`.tsx` lines rather than the compiled output.
- Files under `node_modules` are left to Node.

## Related

- [`@backtickjs/bun-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/bun-plugin): the same for Bun
- [`@backtickjs/tsc`](https://github.com/backtickjs/backtick/tree/main/packages/tsc): type-checks scripts and their splices
- [How it works](https://backtickjs.com/docs/how-it-works)

## License

MIT
