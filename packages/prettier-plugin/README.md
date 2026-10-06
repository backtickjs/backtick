# @backtickjs/prettier-plugin

A [Prettier](https://prettier.io) plugin that formats the code inside [Backtick](https://backtickjs.com) client scripts. Without it, Prettier leaves a `` cs`…` `` script as an opaque template string; with it, the script is formatted as TypeScript or JavaScript, like the rest of the file, with its splices kept in place.

## Install

```sh
npm install --save-dev prettier typescript @backtickjs/prettier-plugin
```

Prettier 3 and TypeScript `^6.0.3` are peer dependencies: the plugin uses your project's TypeScript to find scripts. Install it in the package that runs Prettier, which resolves plugins from there.

## Setup

Name the plugin in `.prettierrc`:

```json
{
  "plugins": ["@backtickjs/prettier-plugin"]
}
```

Projects made with `create-backtick-app` already include this file. In VS Code, the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) reads the same config, so format-on-save formats scripts too.

The plugin applies to `.ts`, `.tsx`, `.js` and `.jsx` files. Other embedded templates, such as CSS or GraphQL, are formatted by Prettier as usual.

## Example

Before:

```tsx
const name = "Ada";
const sum = cs`() => {const   a=1;return    a+${name.length}}`;
export const Greeting = cs`<$View style={{ padding: 24 }}><$Text>Hi {${name}}</$Text><$Text>A second line long enough to break</$Text></$View>`;
```

After:

```tsx
const name = "Ada";
const sum = cs`() => {
  const a = 1;
  return a + ${name.length};
}`;
export const Greeting = cs`(
  <$View style={{ padding: 24 }}>
    <$Text>Hi {$name}</$Text>
    <$Text>A second line long enough to break</$Text>
  </$View>
)`;
```

A splice of a bare identifier in code prints in its short form (`${name}` becomes `$name`); any other splice keeps its braces and is formatted as host code. A script that is a single JSX element gets parentheses only when it breaks across lines, and a trailing semicolon after a script's final expression is dropped. Formatting is idempotent.

## Related

- [`@backtickjs/core`](https://github.com/backtickjs/backtick/tree/main/packages/core): the `cs` tag
- [Backtick for VS Code](https://marketplace.visualstudio.com/items?itemName=backtickjs.backtick-vscode): highlighting and type-checking inside scripts
- [Documentation](https://backtickjs.com/docs)

## License

MIT
