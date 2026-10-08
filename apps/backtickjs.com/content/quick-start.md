```sh
npx create-backtick-app@latest
```

It asks for a name, then creates an Expo app with a Backtick server beside
it, on Node, and installs its packages. For a web page instead, pass
`--template react` or `--template solid-js`; for a server on Bun,
`--runtime bun`.

## Open it on your phone

1. Install Expo Go on your phone, from the App Store or Google Play.
2. Connect your phone to the same Wi-Fi network as your computer.
3. Start your project:

   ```sh
   cd my-app
   npm start
   ```

   It starts your Backtick server and Expo together, and shows a QR code.

4. Scan the QR code: with the Camera app on iPhone, or with Expo Go on
   Android.

No phone at hand? `npm run ios` opens the app in the iOS Simulator,
`npm run android` in an Android emulator, and `npm run web` in a browser.

The app shows a welcome screen. It isn't in the app: your server sent it.

## Change the screen

The screen is `server/Home.tsx`. Replace it with this, and save:

```tsx file=quick-start/server/Home.tsx

```

The app redraws with the new screen, without rebuilding. Tap the counter, then
save again: the time changes, because the server ran `Home` again.

What you just wrote:

- **`Home` is a server component.** It runs on your server, for every
  request. Read from a database here, call an API, use any npm package: none of
  it reaches the phone.
- **`` cs`…` `` is a client script.** The code inside the backticks runs on the
  phone. Here, it's the screen's JSX.
- **`$time` is a splice.** It's a value from your server, written into the
  screen as data. TypeScript checks it on both sides.
- **`Counter` is a client component.** It's a script that takes props, used as
  `<$Counter />`. Its state lives on the phone.
- **`$View` and `$useState` are React Native and React,** with the same names
  and types, spliced from `@backtickjs/react-native` and `@backtickjs/react`.

## What's in your project

```text
my-app/
├── App.tsx            The app: fetches each screen from your server and draws it
├── server/
│   ├── index.tsx      Your server: bundles a screen per request
│   ├── Home.tsx       The screen you just changed
│   └── HelloWave.tsx  The welcome screen's waving hand, safe to delete
└── package.json
```

Everything in `server/` reaches users without an app release: deploy your
server, and users get the change the next time they open the screen.

`npm run typecheck` checks the app and your server, the code inside every
`` cs`…` `` included. `npm run reset-project` replaces `server/Home.tsx` with a
blank screen, and deletes `HelloWave.tsx`, when you're ready to start your own.

## Next steps

- **[Tutorial](/docs/tutorial):** build a coffee-ordering screen, step by step,
  in the project you just created.
- **[Thinking in Backtick](/docs/thinking-in-backtick):** what runs where, and
  what crosses between your server and the phone.
