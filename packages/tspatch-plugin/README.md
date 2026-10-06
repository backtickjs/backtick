# @backtickjs/tspatch-plugin

Compiles `cs` client scripts when you build your server ahead of time. It's a [ts-patch](https://github.com/nonara/ts-patch) transformer: build with `tspc` and the output is plain JavaScript, which runs on `node`, Bun or a serverless platform with no loader. To compile a server's files as they load instead, with no build step, use [`@backtickjs/node-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/node-plugin) or [`@backtickjs/bun-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/bun-plugin). Backtick's own adapters are built with it.

## Usage

Requires ts-patch 4 and TypeScript 6. Add the transformer to `tsconfig.json`, and name your framework's compile steps in the `package.json` beside it:

```json
{
  "compilerOptions": {
    "plugins": [{ "transform": "@backtickjs/tspatch-plugin" }]
  }
}
```

```json
{
  "backtick": { "plugins": ["@backtickjs/solid-js/plugin"] },
  "scripts": {
    "build": "tspc -b --noCheck",
    "typecheck": "backtick-tsc --noEmit"
  }
}
```

Build with `tspc` (from ts-patch) in place of `tsc`; plain `tsc` ignores the transformer and leaves scripts uncompiled. Backtick's adapters build with `--noCheck` and type-check separately with [`backtick-tsc`](https://github.com/backtickjs/backtick/tree/main/packages/tsc), which checks inside scripts. A script the compiler refuses is reported as a build error.

Source maps name a script's file as `<package name>/<path from the tsconfig directory>`, so they are the same on every machine.

## Related

- [`@backtickjs/tsc`](https://github.com/backtickjs/backtick/tree/main/packages/tsc): type-checks scripts and writes their declarations
- [Documentation](https://backtickjs.com/docs)

## License

MIT
