# create-backtick-app

Creates an app whose screens come from your server, with [Backtick](https://backtickjs.com). Pick React Native and you get an Expo app with a Backtick server beside it; pick React or Solid and you get a web page served by one. Each starts with a welcome screen written as a server component, a small client component, and a development setup that redraws the screen when you save.

## Usage

```sh
npx create-backtick-app@latest
```

Or with your package manager's `create`:

```sh
npm create backtick-app@latest
pnpm create backtick-app
yarn create backtick-app
bun create backtick-app
```

It asks only what the command line didn't say:

1. What is your app named? (default `my-app`)
2. Which framework? `react-native` (an Expo app), `react` or `solid-js` (a web page)
3. Which runtime? `node` or `bun`: Bun is the default when you ran it with Bun (`bun create`), Node otherwise

It then copies the template into a new directory, installs with the package manager you ran it with (npm, pnpm, Yarn or Bun), and prints the commands to start. Requires Node 22.15 or later.

## Options

```sh
npx create-backtick-app@latest [name] [options]
```

| Option                  | Description                                                                     |
| ----------------------- | ------------------------------------------------------------------------------- |
| `name`                  | The directory to create, and the app's name. It must be new or empty.           |
| `-t, --template <name>` | `react-native`, `react` or `solid-js`.                                          |
| `-r, --runtime <name>`  | What runs your Backtick server: `node` or `bun`.                                |
| `-y, --yes`             | Ask nothing: `my-app`, `react-native`, and Bun if run with Bun, Node otherwise. |
| `--no-install`          | Copy the files without installing dependencies.                                 |

With `npm create`, pass options after `--`: `npm create backtick-app@latest my-app -- -t react`.

## Templates

Every template has:

- `server/Home.tsx`: the welcome screen, a server component. It reads values on the server and splices them into a client script.
- `server/HelloWave.tsx`: a client component, a waving hand animated where the screen runs. Tap or click it.
- `server/index.tsx`: the Backtick server on http://localhost:3000.
- `scripts/start.mjs`: starts the server in development, restarting it whenever you save. The client polls `/live`, which exists only in development, and redraws when the server restarts.
- `npm run reset-project`: replaces `server/Home.tsx` with a blank screen and removes `HelloWave.tsx`.
- `npm run typecheck`: runs `backtick-tsc` over the server, scripts and splices included. In `react-native`, it also runs `tsc` over the Expo app.
- Prettier with `@backtickjs/prettier-plugin`, which formats client scripts too, and VS Code recommendations for the Backtick and Prettier extensions.

### `react-native`

An Expo app (SDK 57) with the Backtick server beside it in `server/`. `App.tsx` fetches the screen at `/home` and runs it with [`@backtickjs/react-native-client`](https://github.com/backtickjs/backtick/tree/main/packages/react-native-client). The app and the server share a `package.json`, so the server bundles for the React and React Native versions installed there.

```sh
npm run ios      # or android, or web
```

Each starts your Backtick server alongside Expo, in one terminal. Edit `server/Home.tsx` and save: the app fetches the screen again, without rebuilding.

### `react` and `solid-js`

A web page: the server bundles `server/Home.tsx` into an HTML page at `/`, with the framework loaded from a CDN by an import map.

```sh
npm run start
```

Then open http://localhost:3000. Edit `server/Home.tsx` and save to see the page change.

## Related

- [`@backtickjs/core`](https://github.com/backtickjs/backtick/tree/main/packages/core): the `cs` tag
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): runs server components and writes the bundle
- [`@backtickjs/react-native-client`](https://github.com/backtickjs/backtick/tree/main/packages/react-native-client): runs a bundle in a React Native app
- [Documentation](https://backtickjs.com/docs)

## License

MIT
