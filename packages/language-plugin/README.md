# @backtickjs/language-plugin

The [Volar](https://volarjs.dev) language plugin that shows TypeScript what a [Backtick](https://backtickjs.com) client script means.

## Internal

You don't install this package directly. It is used by [`@backtickjs/tsc`](https://github.com/backtickjs/backtick/tree/main/packages/tsc) (`backtick-tsc`), [`@backtickjs/language-service`](https://github.com/backtickjs/backtick/tree/main/packages/language-service), [`@backtickjs/typescript-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/typescript-plugin) and [`@backtickjs/language-server`](https://github.com/backtickjs/backtick/tree/main/packages/language-server).

## What it does

For every `.ts`, `.tsx`, `.js` and `.jsx` file (declaration files excepted), it runs the compiler's `virtualize` and hands TypeScript the result: a virtual copy of the file in which each `` cs`…` `` script is real code, with its splices typed against the host values they refer to. Source mappings tie the virtual code back to the original file, so errors, hovers, completions and go-to-definition land on the script you wrote. It also keeps Backtick's own compiler diagnostics, such as unsupported syntax in a script, for [`@backtickjs/language-service`](https://github.com/backtickjs/backtick/tree/main/packages/language-service) to report.

The package exports `getBacktickLanguagePlugin(ts, getFileName)` and the `BacktickVirtualCode` class.

## Related

- [`@backtickjs/compiler`](https://github.com/backtickjs/backtick/tree/main/packages/compiler): produces the virtual code
- [Backtick for VS Code](https://marketplace.visualstudio.com/items?itemName=backtickjs.backtick-vscode)
- [Documentation](https://backtickjs.com/docs)

## License

MIT
