# @backtickjs/language-service

[Backtick](https://backtickjs.com)'s diagnostics and completions, layered on top of TypeScript's language service.

## Internal

You don't install this package directly. It is used by [`@backtickjs/typescript-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/typescript-plugin), which the VS Code extension bundles, and by [`@backtickjs/tsc`](https://github.com/backtickjs/backtick/tree/main/packages/tsc) (`backtick-tsc`).

## What it does

`decorateLanguageService` wraps a TypeScript language service. It adds Backtick's own compiler diagnostics, collected by [`@backtickjs/language-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/language-plugin), to TypeScript's semantic diagnostics. It also cleans up what TypeScript reports about script code: the virtual code prefixes script identifiers with `__cs_`, and diagnostics, quick info and completions are rewritten to show the names as you wrote them. `backtick-tsc` uses `getBacktickDiagnostics` and `unmangleDiagnostic` to report the same diagnostics from the command line.

## Related

- [`@backtickjs/language-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/language-plugin)
- [Backtick for VS Code](https://marketplace.visualstudio.com/items?itemName=backtickjs.backtick-vscode)
- [How it works](https://backtickjs.com/docs/how-it-works)

## License

MIT
