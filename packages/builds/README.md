# @backtickjs/builds

Keeps a [Backtick](https://backtickjs.com) server drawing for every build of its React Native app that's still in users' hands. A store build carries the modules it was built with, at their versions, for as long as it's installed. Your server moves on. Each build sends the modules it carries, and the server bundles its screens for exactly those modules. There's nothing to record before a build ships, and any version of your server can draw for any build.

## Install

```sh
npm install @backtickjs/builds
```

## How it works

1. **The app declares what it offers to screens** in a module map, which it hands to `execRoot`. A platform that differs gets its own file, as Metro picks files: `client/moduleMap.web.ts` for the web.

   ```ts
   // client/moduleMap.ts
   import * as React from "react";
   import * as JSXRuntime from "react/jsx-runtime";
   import * as ReactNative from "react-native";
   import * as Facebook from "react-native-fbsdk-next";

   export const moduleMap = {
     react: React,
     "react/jsx-runtime": JSXRuntime,
     "react-native": ReactNative,
     "react-native-fbsdk-next": Facebook,
   };
   ```

   Each module comes from a package in `package.json`'s dependencies.

2. **Each build knows its packages' versions.** This package's Expo config plugin, `@backtickjs/builds/expo`, puts the installed version of each of the app's dependencies in the app config's `extra.backtick.packages`:

   ```json
   // app.json
   {
     "expo": {
       "plugins": ["@backtickjs/builds/expo"]
     }
   }
   ```

3. **The app sends its modules** however it reaches its server: a header, a GraphQL variable. `modulesOf`, from `@backtickjs/builds/client`, gives each module its package's version:

   ```ts
   import { modulesOf } from "@backtickjs/builds/client";
   import { moduleMap } from "./moduleMap";

   const modules = JSON.stringify(
     modulesOf(moduleMap, Constants.expoConfig?.extra?.backtick?.packages),
   );
   fetch(url, { headers: { "x-backtick-modules": modules } });
   ```

   It throws as the app starts if the plugin isn't in `app.json`, or if a module comes from a package that isn't a dependency.

4. **The server bundles for them:**

   ```ts
   import { parseModules } from "@backtickjs/builds";
   import { bundler } from "@backtickjs/bundler";

   const modules = parseModules(context.req.header("x-backtick-modules"));
   const bundle = await bundler.build({ input, modules });
   ```

   `parseModules` throws for a request without them, or with anything but `{ "specifier": "version" }` JSON: answer it as an error. The bundler refuses a screen that imports a module the build doesn't carry, or at a version it can't run.

   To draw differently for builds that lack a module, ask with `supports` from [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler), the same check the bundler makes: `supports(modules, "react-native-fbsdk-next", "^13")`.

In development, a reload keeps the app config the app was opened with, and its versions with it: after upgrading a package, close the app and open it again. A change to the module map needs only a reload.

## Old builds

To stop drawing for old builds, decide by what they carry, and draw them one screen asking their users to update, bundled for their own modules:

```ts
const input = supports(modules, "react-native", ">=0.86") ? (
  <Home />
) : (
  <AppUpdateRequired />
);
```

## Tests

A test draws a screen as the app would, with a module map of its own, stand-ins included. Its modules are that map's, at the versions the app installs:

```ts
const modules = modulesOf(moduleMap, installedPackages(projectRoot));
```

## API

- `@backtickjs/builds/expo` in `app.json`'s `plugins`: the Expo config plugin, which sets `extra.backtick.packages` to `installedPackages(projectRoot)`.
- `modulesOf(moduleMap, packages)`, from `@backtickjs/builds/client` or `@backtickjs/builds`: the modules `moduleMap` offers, each at its package's version.
- `parseModules(text)`: the modules a build sent, for `bundler.build`.
- `installedPackages(projectRoot)`: the installed version of each of the app's dependencies.

## Related

- [`@backtickjs/core`](https://github.com/backtickjs/backtick/tree/main/packages/core): `execRoot`, which runs a bundle in the app
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): bundles a screen for a build's modules, and `supports`

## License

MIT
