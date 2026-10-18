# @backtickjs/expo

[Backtick](https://backtickjs.com) for Expo apps: a config plugin that records the versions your app is built with, so it can tell your server which modules it carries; a compile step that writes your scripts as Expo writes your app's own code; and a call that reloads the app when your server restarts in development.

## Install

```sh
npm install @backtickjs/expo
```

## Usage

**The config plugin** puts the installed version of each of your app's dependencies in the app config, which Expo embeds in the app:

```json
// app.json
{ "expo": { "plugins": ["@backtickjs/expo"] } }
```

**The app reads them back** with `getBacktickExtra`, and sends the modules its module map offers, at those versions, with each request. Your server bundles each screen for exactly those modules:

```ts
import { modulesOf } from "@backtickjs/core";
import { getBacktickExtra } from "@backtickjs/expo";
import Constants from "expo-constants";
import { moduleMap } from "./moduleMap";

const { installedPackages } = getBacktickExtra(Constants.expoConfig);
const modules = JSON.stringify(modulesOf(moduleMap, installedPackages));
fetch(url, { headers: { "x-backtick-modules": modules } });
```

A reload keeps the config the app was opened with: after upgrading a package, close the app and open it again.

**Your server reloads the app** once it listens, so saving a server file shows its screens without pressing `r` in Expo's terminal:

```ts
import { reloadExpo } from "@backtickjs/expo/server";

serve({ fetch: app.fetch, port: 3000 }, () => reloadExpo());
```

Without Expo running, as on a deployed server, it does nothing.

**Your scripts are compiled as Expo compiles your app's own code**, by its Babel preset for Hermes, after your framework's compile step. Hermes V1 has bugs Expo works around in your app's code, as an async arrow with a default parameter losing its first `await`; your scripts get the same workarounds:

```json
// package.json
{
  "backtick": {
    "plugins": ["@backtickjs/jsx-react/plugin", "@backtickjs/expo/plugin"]
  }
}
```

A script is compiled once for every client, so it isn't told which platform it's for: `process.env.EXPO_OS` is `null` in one. Use `Platform.OS`.

## API

- `@backtickjs/expo` in `app.json`'s `plugins`: the config plugin, which sets `extra.backtick.installedPackages` to `installedPackages(projectRoot)` from `@backtickjs/core/node`.
- `getBacktickExtra(expoConfig)`: what the plugin recorded, `{ installedPackages }`, from `Constants.expoConfig`. Throws as the app starts if the plugin isn't in `app.json`.
- `@backtickjs/expo/plugin` in `package.json`'s `backtick.plugins`: the compile step, Expo's Babel preset for Hermes, from the app's own `expo`.
- `reloadExpo(port?)`, from `@backtickjs/expo/server`: reloads the apps Expo serves, as pressing `r` in its terminal does. `port` is Expo's, 8081 or `RCT_METRO_PORT` by default.

## Related

- [`@backtickjs/core`](https://github.com/backtickjs/backtick/tree/main/packages/core#every-build-in-users-hands): `modulesOf`, and how every build in users' hands keeps being drawn for
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): bundles a screen for the modules a build sends

## License

MIT
