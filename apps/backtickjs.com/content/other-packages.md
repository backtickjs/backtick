```ts file=other-packages/server/expo.ts

```

A screen can use any package your app ships. `createImport` names an export of
a package, typed as the package types it, and splices like anything else:
`$impactAsync()`, `<$LinearGradient>`.

## Three places, one package

A package a screen uses has to be in all three places:

**1. The screen:** spliced, as any value or component:

```tsx file=other-packages/server/Home.tsx

```

**2. Your server:** the versions the app provides, for the bundler to check
against each import's range:

```tsx file=other-packages/server/index.tsx

```

**3. Your app:** the modules a screen may require, handed to `evaluate`:

```tsx file=other-packages/App.tsx

```

Install the package in your app as usual, `npx expo install expo-haptics`, so
it's built into the app and its native code ships with it.

## Versions are checked

`createImport`'s `version` is the range of the package that the export works
with. When the bundle is built, the bundler checks it against what your server
says the app provides, and refuses a screen the app can't run:

```text
Can't import `impactAsync` from "expo-haptics": the client provides react@19.2.3, react-native@0.86.3.
Can't import `impactAsync` from "expo-haptics": it needs expo-haptics@~57.0.0, and the client provides expo-haptics@58.0.1.
```

The first is a package missing from `packageVersions`; the second, an app built
with a version outside the range. Serving apps of several versions, give each
its own `packageVersions`, and each gets a screen it can run.
