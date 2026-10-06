# Backtick for VS Code

Editor support for [Backtick](https://backtickjs.com), a programming model for
React Native where a screen's data, logic and client components live together,
type-checked end to end.

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

- [Docs](https://backtickjs.com/docs)
- [GitHub](https://github.com/backtickjs/backtick)
