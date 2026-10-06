# @backtickjs/compiler

Internal: the compiler for Backtick's client scripts, `` cs`…` ``. You don't install it directly, and its API may change in any release.

It finds each script in a source file, resolves its splices, compiles the script for its framework at build time, and writes the virtual code an editor and the type checker see. It is a dependency of `@backtickjs/tsc`, the build plugins (`@backtickjs/node-plugin`, `@backtickjs/bun-plugin`, `@backtickjs/tspatch-plugin`), `@backtickjs/prettier-plugin` and the editor tooling (`@backtickjs/language-service`, `@backtickjs/language-plugin`). Install one of those instead.

## API

- `transform`: a TypeScript transformer that replaces each `cs` with its compiled script, running a framework's plugins over it.
- `compileModule`: compiles one TypeScript file, its scripts included, to an ES module with an inline source map, using the nearest `tsconfig.json`. What the Node and Bun plugins call.
- `pluginsFrom`: loads the framework plugins a project names in `package.json` (`"backtick": { "plugins": [...] }`).
- `transpile`: compiles one standalone file with fixed options, for tests and the playground.
- `parseSourceFile`, `parseSourceText`: find the scripts and splices in a file.
- `resolveBindings`, `flattenScripts`, `emitScripts`: resolve each script's splices and captures, walk nested scripts, and emit each script's code.
- `virtualize`: the virtual code that type-checks scripts and their splices.
- `mangle`, `unmangle`: map names between source and virtual code.

## Related

- [`@backtickjs/core`](https://github.com/backtickjs/backtick/tree/main/packages/core): the `cs` tag
- [`@backtickjs/tsc`](https://github.com/backtickjs/backtick/tree/main/packages/tsc), [`@backtickjs/node-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/node-plugin), [`@backtickjs/bun-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/bun-plugin): packages that use it
- [Documentation](https://backtickjs.com/docs)

## License

MIT
