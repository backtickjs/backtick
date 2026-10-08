# @backtickjs/typescript-plugin

The tsserver plugin that type-checks [Backtick](https://backtickjs.com) client scripts in your editor.

## Internal

You don't install this package directly. It is used by [Backtick for VS Code](https://marketplace.visualstudio.com/items?itemName=backtickjs.backtick-vscode), which bundles it and registers it with VS Code's TypeScript support, including for workspace TypeScript versions.

## What it does

It is a TypeScript language service plugin built with Volar's `createLanguageServicePlugin`. It loads [`@backtickjs/language-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/language-plugin), so tsserver sees each `` cs`…` `` script as real code with typed splices, and wraps the language service with [`@backtickjs/language-service`](https://github.com/backtickjs/backtick/tree/main/packages/language-service), so errors, hovers and completions inside scripts use the names you wrote and Backtick's own diagnostics appear alongside TypeScript's. Running inside tsserver, it needs no separate language server.

For the command line, [`@backtickjs/tsc`](https://github.com/backtickjs/backtick/tree/main/packages/tsc) (`backtick-tsc`) runs the same checks.

## Related

- [`@backtickjs/language-service`](https://github.com/backtickjs/backtick/tree/main/packages/language-service)
- [Backtick for VS Code](https://marketplace.visualstudio.com/items?itemName=backtickjs.backtick-vscode)
- [How it works](https://backtickjs.com/docs/how-it-works)

## License

MIT
