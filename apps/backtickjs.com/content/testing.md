```tsx file=testing/server/Order.test.tsx

```

A test draws a screen the way your app does, then taps it and checks what it
shows. A new React Native project has one, `server/Home.test.tsx`, and runs it
with `npm test`.

## What a test runs

`drawScreen` builds the screen as your server does, and runs it as your app
does, with React Native's web build standing in for React Native:

```ts file=testing/server/test/drawScreen.ts

```

Testing Library draws it into [jsdom](https://github.com/jsdom/jsdom), a
document that runs in Node.

Here's the screen the test above draws. `Order` is a server component, and each
`Stepper` keeps its own count on the phone:

```tsx file=testing/server/Order.tsx

```

## Tapping

`userEvent.click` taps what it's given, as a finger would. A `Pressable`
answers it as it answers a tap, and the client component's state
changes as it would on the phone. Each check reads what the screen shows, so
the test passes or fails on what a user would see.

## Data from your server

A server component runs in the test as it runs on your server, so it reads its
data the same way. Give it test data through its props, as the test gives
`Order` its items, or point what it reads at a test database.

## Packages your app provides

When your app provides another package, add it to both lists in `drawScreen.ts`:
its version to `packageVersions`, as `server/index.tsx` does, and its module to
`modules`, as `App.tsx` does.

A package with native code, like `expo-haptics`, has nothing to run in Node.
Give `modules` a stand-in with the exports your screens use:

```ts
const modules = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNativeWeb,
  "expo-haptics": { impactAsync: async () => {} },
};
```

## What a test doesn't cover

React Native's web build isn't React Native. A test checks what your screen
shows and how it answers taps, but not:

- **Native modules,** which a test replaces with stand-ins.
- **Layout and platform behaviour,** like safe areas and keyboard handling.
- **Native animation,** which the web build runs in JavaScript.

Try those on a phone.

## Running

`npm test` runs every `server/**/*.test.tsx` with Node's test runner:

```sh
node --import ./server/test/setup.mjs --import @backtickjs/node-plugin --test "server/**/*.test.tsx"
```

The test runner compiles scripts without type-checking them, so a test can
pass on a screen with a type error. Run `npm run typecheck` too, as CI
should. `npm run reset-project` rewrites `server/Home.test.tsx` to match its
blank screen.
