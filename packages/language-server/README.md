# @backtickjs/language-server

A standalone [Volar](https://volarjs.dev) language server for [Backtick](https://backtickjs.com) client scripts.

## Internal

You don't install this package directly. It is used by [Backtick for VS Code](https://marketplace.visualstudio.com/items?itemName=backtickjs.backtick-vscode), which starts it only when VS Code runs the extension in development mode, from its source.

## What it does

It serves a Volar TypeScript project with [`@backtickjs/language-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/language-plugin) over IPC for JavaScript and TypeScript files. Its purpose is debugging: with the [Volar Labs](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volarjs-labs) extension, a developer can inspect the virtual code generated for each script. Type-checking in the released extension goes through [`@backtickjs/typescript-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/typescript-plugin) instead, inside tsserver.

The entry point is `bin/nodeServer.js`; it uses the TypeScript SDK passed by the client in `initializationOptions.typescript.tsdk`.

## Related

- [`@backtickjs/language-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/language-plugin)
- [Backtick for VS Code](https://marketplace.visualstudio.com/items?itemName=backtickjs.backtick-vscode)
- [Documentation](https://backtickjs.com/docs)

## License

MIT
