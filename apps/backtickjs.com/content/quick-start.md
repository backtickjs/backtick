```sh
npx create-backtick-app@latest
```

It asks for a name, a framework and a runtime. Pick React Native, and it
creates an Expo app with a Backtick server beside it. Then run `npm run ios`,
`android` or `web`, and edit `server/Home.tsx` to change the screen.

The steps below are what it sets up.

## Write a screen

A server component runs on your server, for every request. It reads its data
where it lives and returns a client script, `` cs`…` ``: the screen, drawn on
the device. Each `$name` is a splice, a value crossing from your server to the
client, type-checked on both sides.

```tsx file=quick-start/server/Home.tsx

```

## Serve it

One route bundles the screen per request, for the versions of React and React
Native your app ships, so the screen requires nothing the app doesn't have.

```tsx file=quick-start/server/index.tsx

```

## Draw it

Your app fetches the screen like any other request, with its own headers, auth
and caching. `evaluate` runs it with your app's own React and React Native,
and React's `use` draws it under `Suspense`, which shows your fallback while it
loads.

```tsx file=quick-start/App.tsx

```
