```tsx file=react-native-and-packages/server/Store.tsx

```

Import React Native as you would in an app, marked
`with { backtick: "client" }`: the server never loads it, and each name is
what the phone provides, typed as React Native types it. React's hooks are
imported the same way, from `react`. In a script, splice them with `$`:

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

A screen imports any package your app ships the same way, and splices it like
anything else: `$impactAsync()`, `<$LinearGradient>`. A package a screen uses
has to be in two places:

**1. The screen,** imported for the client:

```tsx file=react-native-and-packages/server/Home.tsx

```

**2. Your app's module map,** the modules a screen may require, which the app
hands to `execRoot`:

```ts file=react-native-and-packages/client/moduleMap.ts

```

Install the package in your app as usual, `npx expo install expo-haptics`, so
it's built into the app and its native code ships with it. Your server reads
the module map too, without running it, so it knows what each build of your
app carries:

```tsx file=react-native-and-packages/server/index.tsx

```

## Versions are checked

A client import records the version of the package your server has installed,
the one its types were checked against. When a screen is bundled, the bundler
checks the requesting build carries that version or a later one of the same
major, and refuses a screen that build can't run, before anything reaches the
phone. [Errors](/docs/errors/#cant-import--from--the-client-provides-)
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
