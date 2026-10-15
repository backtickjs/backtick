# Backtick for VS Code

Editor support for [Backtick](https://backtickjs.com), fully server-driven
React Native. Write every screen in React, on your server: layout, data and
behaviour. Changes ship with your next deploy, not your next app store
release.

## Features

- **Client scripts highlighted as TSX.** The body of every `` cs`…` `` template
  is coloured as the TSX it is, not as a string.
- **Splices marked.** Each `$name` that carries a server value into a script is
  coloured as a splice, so you can see what crosses to the client.
- **Type-checking inside scripts.** Errors, completions and hover information
  work inside `` cs`…` ``, and every splice is checked against the value it
  carries.

## Requirements

The type-checking runs as a TypeScript server plugin. If your workspace uses its
own TypeScript version, select it with **TypeScript: Select TypeScript Version →
Use Workspace Version**.

## Learn more

- [How it works](https://backtickjs.com/docs/how-it-works/)
- [GitHub](https://github.com/backtickjs/backtick)
