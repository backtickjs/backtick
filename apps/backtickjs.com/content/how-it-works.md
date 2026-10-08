A screen goes through three steps: compiled when your server loads its files,
bundled for each request, and run by your app.

## 1. Compiled with your server

Your server runs with a loader, `@backtickjs/node-plugin` on Node or
`@backtickjs/bun-plugin` on Bun. As it loads each `.tsx` file, it compiles each
`` cs`…` `` to plain JavaScript, with the compile step your framework names in
`package.json`:

```json
{
  "backtick": {
    "plugins": ["@backtickjs/react/plugin"]
  }
}
```

A compiled script is a module: a function of its splices, which reads each
splice where the script wrote it. A script compiles once, however many requests
use it. To build your server ahead of time instead, `@backtickjs/tspatch-plugin`
does the same with `tspc`.

## 2. Bundled for each request

`bundler.build` runs the server components you hand it, then writes what they
returned as one JavaScript file:

```js file=thinking/server/Home.bundle.js

```

From the top:

- **The packages the app provides,** required by name: `react-native`,
  `react`, `react/jsx-runtime`. Each is checked against the versions you passed
  as `packageVersions`.
- **The module table:** each script's compiled module, once, however many
  times it's used.
- **The bundle's constants:** a function script that reads nothing of where
  it's used is made once, `$function<n>`, and each splice is a function the
  script calls when it reads it, `$thunk<n>`. The same code anywhere in the
  bundle is the same constant, so a value used at every level of a screen is
  written once.
- **The root:** the screen, as the call of its script.

Only what a request drew is in its bundle, and data is written as data, never
as code. `generate` writes it as CommonJS, `"cjs"`, for React Native, or as an
ES module, `"es"`, for a web page, with an optional source map into your server
files.

## 3. Run by your app

The app fetches the bundle like any request, and runs it with `evaluate` from
`@backtickjs/react-native-client`, handing it the packages it ships. What the
bundle exports is the screen, a React element the app draws. See [Thinking in
Backtick](/docs/thinking-in-backtick#how-a-screen-gets-to-the-phone) for the
server route and the app code.

Because the phone runs code your server wrote, a deploy of your server is a
release of the screen: the next time someone opens it, they get the new one.
