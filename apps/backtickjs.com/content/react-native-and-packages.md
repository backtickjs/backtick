```tsx file=react-native-and-packages/server/Store.tsx

```

`@backtickjs/react-native` and `@backtickjs/react` export every component, API
and hook of React Native and React, with the same names and types. In a
script, splice them with `$`:

- **Components are tags:** `<$View>`, `<$Pressable>`, `<$ScrollView>`.
- **Members are tags too:** `<$Animated.View>` reads `View` off `Animated`.
- **APIs are values:** `$Platform.OS`, `$Linking.openURL(…)`,
  `$StyleSheet.create(…)`.
- **Hooks are called in client components,** as in any React component:
  `$useState`, `$useEffect`, `$useRef`, `$useWindowDimensions`.

The phone runs them with the React Native your app ships, so a screen uses the
same version as the rest of your app.

## The platform is the phone's

`$Platform.OS` and `$useWindowDimensions()` run on the phone, so they describe
the device the screen is drawn on. A server component can't know them; ask in
a client component, as `StoreCard` does.

## Any package your app ships

A screen can use any package your app ships. `createImport` names an export of
a package, typed as the package types it, and splices like anything else:
`$impactAsync()`, `<$LinearGradient>`.

```ts file=react-native-and-packages/server/expo.ts

```

A package a screen uses has to be in two places:

**1. The screen,** spliced as any value or component:

```tsx file=react-native-and-packages/server/Home.tsx

```

**2. Your app's module map,** the modules a screen may require, which the app
hands to `execRoot`:

```ts file=react-native-and-packages/moduleMap.ts

```

Install the package in your app as usual, `npx expo install expo-haptics`, so
it's built into the app and its native code ships with it. Your server reads
the module map too, without running it, so it knows what each build of your
app carries:

```tsx file=react-native-and-packages/server/index.tsx

```

## Versions are checked

`createImport`'s `version` is the range of the package the export works with.
When a screen is bundled, the bundler checks it against the version the
requesting build carries, and refuses a screen that build can't run, before
anything reaches the phone. [Errors](/docs/errors/#cant-import--from--the-client-provides-)
has the messages.

## Every build in users' hands

A store build keeps the modules it was built with for as long as it's
installed, while your server moves on. Each build sends an id that names its
modules, and the server bundles each screen for them, so an old build gets
screens it can run. Before a build for the stores, record it:

```sh
npm run register-build
```

and commit what it writes to `builds/`. An EAS build that isn't registered
fails, so a build your server doesn't know can't ship. To stop serving an old
build, set `"deprecated": true` in its file: your server refuses it.
[`@backtickjs/builds`](https://github.com/backtickjs/backtick/tree/main/packages/builds)
has the details, and how to show its users a screen asking them to update.
