# @backtickjs/builds

Keeps a [Backtick](https://backtickjs.com) server drawing for every build of its React Native app that's still in users' hands. A store build carries the modules it was built with, at their versions, for as long as it's installed. Your server moves on. Each build sends the modules it carries, and the server bundles its screens for exactly those modules. There's nothing to record before a build ships, and any version of your server can draw for any build.

## Install

```sh
npm install @backtickjs/builds
```

## How it works

1. **The app declares what it offers to screens** in a module map, one per platform as Metro picks files: `client/moduleMap.ts` for iOS and Android, and `client/moduleMap.web.ts` for the web. A module map is imports and a table, nothing else, so it can be read without running it:

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

   Each entry is `"specifier": Name`, with `Name` imported above. An entry that decides at runtime, like `native ? Facebook : {}`, is an error. What a platform lacks, its map leaves out.

   The module maps are in the app's client root: the folder `package.json` names, as `"backtick": { "clientRoot": "client" }`, or the project root.

2. **Each build knows its modules:** those its platform's map offers, each at the installed version of its package. In an Expo app, this package's config plugin, `@backtickjs/builds/expo`, puts them in the app config's `extra.backtick.modules`:

   ```json
   // app.json
   {
     "expo": {
       "plugins": ["@backtickjs/builds/expo"]
     }
   }
   ```

3. **The app sends them** however it reaches its server: a header, a GraphQL variable. `modulesFrom`, from `@backtickjs/builds/client`, reads them as JSON to send:

   ```ts
   import { modulesFrom } from "@backtickjs/builds/client";

   const modules = modulesFrom(Constants.expoConfig?.extra, Platform.OS);
   fetch(url, { headers: { "x-backtick-modules": modules } });
   ```

   It throws as the app starts if the plugin isn't in `app.json`.

4. **The server bundles for them:**

   ```ts
   import { parseModules } from "@backtickjs/builds";
   import { bundler } from "@backtickjs/bundler";

   const modules = parseModules(context.req.header("x-backtick-modules"));
   const bundle = await bundler.build({ input, modules });
   ```

   `parseModules` throws for a request without them, or with anything but `{ "specifier": "version" }` JSON: answer it as an error. The bundler refuses a screen that imports a module the build doesn't carry, or at a version it can't run.

   To draw differently for builds that lack a module, ask with `supports` from [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler), the same check the bundler makes: `supports(modules, "react-native-fbsdk-next", "^13")`.

In development, a reload keeps the app config the app was opened with, and its modules with it: after a change to the module map or the packages, close the app and open it again.

## Old builds

To stop drawing for old builds, decide by what they carry, and draw them one screen asking their users to update, bundled for their own modules:

```ts
const input = supports(modules, "react-native", ">=0.86") ? (
  <Home />
) : (
  <AppUpdateRequired />
);
```

## API

- `@backtickjs/builds/expo` in `app.json`'s `plugins`: the Expo config plugin, which sets `extra.backtick.modules` to `installedModules(projectRoot, platform)` on `ios`, `android` and `web`.
- `modulesFrom(extra, platform)`, from `@backtickjs/builds/client`: this build's modules, as JSON to send.
- `parseModules(text)`: the modules a build sent, for `bundler.build`.
- `installedModules(projectRoot, platform)`: the modules the build the app at `projectRoot` now makes carries, as tests bundle for.
- `readModuleMap(file)`, `clientRootOf(projectRoot)`, `moduleMapFile(projectRoot, platform)`: the steps, for tools of your own.

## Related

- [`@backtickjs/core`](https://github.com/backtickjs/backtick/tree/main/packages/core): `execRoot`, which runs a bundle in the app
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): bundles a screen for a build's modules, and `supports`

## License

MIT
