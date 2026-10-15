# @backtickjs/builds

Keeps a [Backtick](https://backtickjs.com) server drawing for every build of its React Native app that's still in users' hands. A store build carries the modules it was built with, at their versions, for as long as it's installed. Your server moves on. Each build sends an id that names its modules, and the server bundles its screens for exactly those modules, or refuses a build it can't serve.

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

2. **Each build gets an id:** a hash of the modules its platform's map offers, each at the installed version of its package. In an Expo app, this package's config plugin, `@backtickjs/builds/expo`, puts the ids in the app config's `extra.buildIds`:

   ```json
   // app.json
   {
     "expo": {
       "plugins": ["@backtickjs/builds/expo"]
     }
   }
   ```

3. **The app sends its id** however it reaches its server: a header, a GraphQL variable. `buildIdFrom`, from `@backtickjs/builds/client`, reads it:

   ```ts
   import { buildIdFrom } from "@backtickjs/builds/client";

   const buildId = buildIdFrom(Constants.expoConfig?.extra, Platform.OS);
   ```

4. **The server bundles for that build's modules:**

   ```ts
   import { createBuilds } from "@backtickjs/builds";
   import { bundler } from "@backtickjs/bundler";

   const builds = createBuilds({ projectRoot });

   const modules = builds.modulesOf(buildId);
   const bundle = await bundler.build({ input, modules });
   ```

   To draw differently for builds that lack a module, ask with `supports` from [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler), the same check the bundler makes: `supports(modules, "react-native-fbsdk-next", "^13")`.

5. **Every build is registered before it ships,** in `builds/`, one file per id, committed with the code:

   ```sh
   npx backtick-builds register
   ```

   ```json
   {
     "createdAt": "2026-10-12T00:00:00.000Z",
     "deprecated": false,
     "modules": {
       "react": "19.2.3",
       "react/jsx-runtime": "19.2.3",
       "react-native": "0.86.3"
     }
   }
   ```

   Run `backtick-builds check` in your tests, or let EAS run it: as `eas-build-post-install` in `package.json`, it fails a build that isn't registered, checking the platform being built and letting development builds through.

   ```json
   "scripts": {
     "eas-build-post-install": "backtick-builds check"
   }
   ```

## Unknown and deprecated builds

`modulesOf` throws for a build its server can't draw for:

- **`UnknownBuild`**: no id, or one that isn't registered. Every build is registered before it ships, so this means the server or the build was deployed wrong, as when a server is rolled back past a build in users' hands. In development, it means the app was opened before its module map or packages changed: close it and open it again, since a reload keeps the config it was opened with, and its build id with it. Its message names the builds this code makes. Answer it as a server error.
- **`DeprecatedBuild`**: a build you retired by setting `"deprecated": true` in its file. It carries the build's `modules`, so your server can still draw that build one screen, bundled for what it has: one asking its users to update. Answer every path with it. Left uncaught, it's a server error, as `UnknownBuild` is.

## API

- `@backtickjs/builds/expo` in `app.json`'s `plugins`: the Expo config plugin, which sets `extra.buildIds` to `buildIds(projectRoot)`.
- `buildIds(projectRoot)`: the id of the build the app at `projectRoot` now makes, on `ios`, `android` and `web`.
- `createBuilds({ projectRoot })`: the app's builds for its server. `modulesOf(buildId)` resolves a build, `installed(platform)` is what this code's build carries, and `unregistered(platform)` says why this code's build couldn't ship, or null. Registered builds are read once. Module maps are only read for an id that isn't registered, as in development after a package change.
- `register(projectRoot)`: what `backtick-builds register` runs. A build already registered keeps its `createdAt` and `deprecated`.
- `readModuleMap(file)`, `clientRootOf(projectRoot)`, `moduleMapFile(projectRoot, platform)`, `installedModules(projectRoot, platform)`, `buildIdOf(modules)`, `readBuilds(directory)`: the steps, for tools of your own.

## Related

- [`@backtickjs/core`](https://github.com/backtickjs/backtick/tree/main/packages/core): `execRoot`, which runs a bundle in the app
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): bundles a screen for a build's modules, and `supports`

## License

MIT
