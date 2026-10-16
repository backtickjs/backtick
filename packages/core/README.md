# @backtickjs/core

The `cs` tag and the types around it. A client script, written `` cs`…` `` inside a server component, is code that runs on the client; values from the server cross into it as splices written `$name`, type-checked on both sides. Every Backtick app imports `cs` from here, whatever its UI framework.

`cs` is compiled at build time, so a project also needs a build plugin (`@backtickjs/node-plugin` or `@backtickjs/bun-plugin`), an adapter for its framework (`@backtickjs/react` or `@backtickjs/solid-js`) and `@backtickjs/tsc` for type checking. Called without the compiler, `cs` throws. `npx create-backtick-app@latest` sets all of this up.

## Install

```sh
npm install @backtickjs/core
```

## Usage

A server component reads data on the server and returns a client script. A client component is a script written as an arrow function, used as a `<$Name>` tag:

```tsx
import { cs } from "@backtickjs/core";
import { useState } from "react" with { backtick: "client" };

// A client component: it runs on the client.
const Counter = cs`(props: { start: number }) => {
  const [count, setCount] = $useState(props.start);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`;

// A server component: it runs on your server for every request.
export async function Home() {
  const node = process.version;
  return cs`(
    <main>
      <p>Assembled with Node {$node}.</p>
      <$Counter start={3} />
    </main>
  )`;
}
```

`$node` and `$Counter` are splices: `node` is a server variable, written into the bundle as data; `Counter` is a script. `$useState` is a splice too, of an export the client provides. What can be spliced is `Spliceable`: data, and scripts. [Thinking in Backtick](https://backtickjs.com/docs/thinking-in-backtick/) has what can cross, what can't, and how server and client components compose.

A script every component shares, like a context or a store, is made once with `once`: one value for the bundle, where an expression script would run again at each read.

```tsx
import { cs, once } from "@backtickjs/core";
import { createContext, useContext } from "react" with { backtick: "client" };

const ThemeContext = once(cs`$createContext("light")`);
const Label = cs`() => <p>{$useContext($ThemeContext)}</p>`;
// In a script: <$ThemeContext.Provider value="dark"><$Label /></$ThemeContext.Provider>
```

To use a package the client provides, import it with `with { backtick: "client" }`. The server never loads it: each name is what the client provides, typed as the package types it, and a script splices it:

```ts
import { greet } from "my-native-module" with { backtick: "client" };
// In a script: cs`<p>{$greet()}</p>`
```

The package must be installed where the server's file finds it, for its types and its version. The client must provide it, and the server must list it in the bundler's `modules` at that version or a later one of the same major. The compiler writes each name as what `createImport({ name, from, version })` makes, which a hand-written import can call too.

## API

- `cs`: the tag for client scripts. Compiled at build time; throws if called uncompiled.
- `Client<T>`: the type of a script that stands for a `T` on the client.
- `once(script)`: the script as one value for the bundle, made at its top; each call is one value. Refused for a script that reads a variable of the script around it.
- `Spliceable`: what a server may splice into a script.
- `Spliced<T>`: what a spliceable value becomes on the client (`Client<U>` becomes `U`; arrays and objects map member by member).
- `createImport<T>({ name, from, version })`: an export of a module the client provides, as a value a script can splice.
- `isClientImport`, `ClientImport`: its check and type.
- `Bundle<T>`: a bundle's code, branded with what it runs to. `bundler.build(…).generate(…)` writes one.
- `execRoot(bundle, moduleMap)`, from `@backtickjs/core/cjs`: in a React Native app, runs the CommonJS bundle it starts from to its value, as a promise, with `require` answered from `moduleMap`, a `ModuleMap`: the modules the app provides, by specifier.
- `execRoot(bundle)`, from `@backtickjs/core/es`: in a web page, imports the ES bundle it starts from and resolves to its value, the page's import map answering its imports. Each format has its own entry, so a React Native app's bundler never reads the ES one's `import()`.
- `exec`: in a script, `$exec(bundle)` runs another bundle as the script's own was run, with the same modules, to a promise of its value.
- `isClientExec`, `ClientExec`: its check and type.
- `SplicesAs<T>`: `T` as a splice checks it, member by member. Used by the bundler to check its input.
- `createJsxElement`, `isJsxElement`, `JsxElement`, `JsxElementOf`, `JsxElementTypeOf`: what a server-side JSX tag evaluates to before bundling. Used by adapters' JSX runtimes.
- `create`, `isClientScript`, `ClientScript`, `ClientModule`, `Param`: the compiled form of a script, written by the compiler and read by the bundler. Not for application code.

## Related

- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): runs server components and writes the bundle
- [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react), [`@backtickjs/solid-js`](https://github.com/backtickjs/backtick/tree/main/adapters/solid-js): framework adapters
- [`@backtickjs/node-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/node-plugin), [`@backtickjs/bun-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/bun-plugin): compile scripts as your server loads them
- [`@backtickjs/tsc`](https://github.com/backtickjs/backtick/tree/main/packages/tsc): type-checks scripts and their splices
- [Thinking in Backtick](https://backtickjs.com/docs/thinking-in-backtick/), [Scripts in depth](https://backtickjs.com/docs/scripts-in-depth/)

## License

MIT
