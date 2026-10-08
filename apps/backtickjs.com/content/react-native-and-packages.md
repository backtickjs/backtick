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

A package a screen uses has to be in three places:

**1. The screen,** spliced as any value or component:

```tsx file=react-native-and-packages/server/Home.tsx

```

**2. Your server,** in the versions the app provides:

```tsx file=react-native-and-packages/server/index.tsx

```

**3. Your app,** in the modules a screen may require, handed to `evaluate`:

```tsx file=react-native-and-packages/App.tsx

```

Install the package in your app as usual, `npx expo install expo-haptics`, so
it's built into the app and its native code ships with it.

## Versions are checked

`createImport`'s `version` is the range of the package the export works with.
When a screen is bundled, the bundler checks it against the version your
server says the app provides, and refuses a screen the app can't run, before
anything reaches the phone. [Errors](/docs/errors#cant-import--from--the-client-provides-)
has the messages. Serving apps of several versions, give each its own
`packageVersions`, and each gets a screen it can run.
