# @backtickjs/builds

Keeps a [Backtick](https://backtickjs.com) server drawing for every build of its React Native app that's still in users' hands. A store build carries the packages it was built with, at those versions, for as long as it's installed. Your server moves on. Each build sends an id that names its packages, and the server bundles its screens for exactly those packages, or refuses a build it can't serve.

## Install

```sh
npm install @backtickjs/builds
```

## How it works

1. **The app declares what it offers to screens** in a module map, one per platform as Metro picks files: `moduleMap.ts` for iOS and Android, and `moduleMap.web.ts` for the web. A module map is a table and nothing else, so it can be read without running it:

   ```ts
   // moduleMap.ts
   import type { ModuleMap } from "@backtickjs/react-native-client";

   export const moduleMap = {
     react: () => require("react"),
     "react/jsx-runtime": () => require("react/jsx-runtime"),
     "react-native": () => require("react-native"),
     "react-native-fbsdk-next": () => require("react-native-fbsdk-next"),
   } satisfies ModuleMap;
   ```

   An entry that decides at runtime, like `native() ? require("…") : {}`, is an error. What a platform lacks, its map leaves out.

2. **Each build gets an id:** a hash of the packages its platform's map offers, at their installed versions. `app.config.ts` puts the ids in the app config:

   ```ts
   // app.config.ts
   import { buildIds } from "@backtickjs/builds";
   import type { ConfigContext, ExpoConfig } from "expo/config";

   export default ({ config, projectRoot }: ConfigContext): ExpoConfig =>
     ({
       ...config,
       extra: { ...config.extra, buildIds: buildIds(projectRoot) },
     }) as ExpoConfig;
   ```

3. **The app sends its id** however it reaches its server: a header, a GraphQL variable. `buildIdFrom` from [`@backtickjs/react-native-client`](https://github.com/backtickjs/backtick/tree/main/packages/react-native-client) reads it:

   ```ts
   const buildId = buildIdFrom(Constants.expoConfig?.extra, Platform.OS);
   ```

4. **The server bundles for that build's packages:**

   ```ts
   import { createBuilds } from "@backtickjs/builds";
   import { bundler } from "@backtickjs/bundler";

   const builds = createBuilds({ projectRoot });

   const packageVersions = builds.packagesOf(buildId);
   const bundle = await bundler.build({ input, packageVersions });
   ```

   To draw differently for builds that lack a package, ask with `supports` from [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler), the same check the bundler makes: `supports(packageVersions, "react-native-fbsdk-next", "^13")`.

5. **Every build is registered before it ships,** in `builds/`, one file per id, committed with the code:

   ```sh
   npx backtick-builds register
   ```

   ```json
   {
     "createdAt": "2026-10-12T00:00:00.000Z",
     "deprecated": false,
     "packages": { "react": "19.2.3", "react-native": "0.86.3" }
   }
   ```

   Run `backtick-builds check` in your tests, or let EAS run it: as `eas-build-post-install` in `package.json`, it fails a build that isn't registered, checking the platform being built and letting development builds through.

   ```json
   "scripts": {
     "eas-build-post-install": "backtick-builds check"
   }
   ```

## Unknown and deprecated builds

`packagesOf` throws for a build its server can't draw for:

- **`UnknownBuild`**: no id, or one that isn't registered. Every build is registered before it ships, so this means the server or the build was deployed wrong, as when a server is rolled back past a build in users' hands. Answer it as a server error.
- **`DeprecatedBuild`**: a build you retired by setting `"deprecated": true` in its file. Answer it with something your app shell recognises and turns into "update the app", such as HTTP 426. The shell has to know that answer before the build is retired, so ship it in your first build.

## API

- `buildIds(projectRoot)`: the id of the build the app at `projectRoot` now makes, on `ios`, `android` and `web`.
- `createBuilds({ projectRoot })`: the app's builds for its server. `packagesOf(buildId)` resolves a build, `installed(platform)` is what this code's build carries, and `unregistered(platform)` says why this code's build couldn't ship, or null. Registered builds are read once. Module maps are only read for an id that isn't registered, as in development after a package change.
- `register(projectRoot)`: what `backtick-builds register` runs. A build already registered keeps its `createdAt` and `deprecated`.
- `readModuleMap(file)`, `moduleMapFile(projectRoot, platform)`, `installedPackages(projectRoot, platform)`, `buildIdOf(packages)`, `readBuilds(directory)`: the steps, for tools of your own.

## Related

- [`@backtickjs/react-native-client`](https://github.com/backtickjs/backtick/tree/main/packages/react-native-client): `evaluate` and `buildIdFrom`, in the app
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): bundles a screen for a build's packages, and `supports`

## License

MIT
