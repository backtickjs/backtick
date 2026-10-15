# @backtickjs/dev

[Backtick](https://backtickjs.com) in development. `backtick-dev` runs your server and Expo in one terminal, restarts the server when you save a file under `server/`, and reloads the app once the new server is up.

## Install

```sh
npm install @backtickjs/dev
```

## Usage

**`package.json`** starts it, with what else development runs, Expo here, alongside:

```json
{
  "scripts": {
    "start": "backtick-dev expo start",
    "ios": "backtick-dev expo start --ios",
    "android": "backtick-dev expo start --android"
  }
}
```

The command after `backtick-dev` runs in the same terminal, and stopping it stops both. Without one, `backtick-dev` runs your server alone, as for a web page your server serves.

**The server** listens on the port it's given:

```tsx
// server/index.tsx
serve({ fetch: app.fetch, port: Number(process.env.PORT ?? 3000) });
```

**The app** starts the dev channel with the URL it reaches your server at, and how it reloads:

```ts
import { startDevChannel } from "@backtickjs/dev/client";

// React Native
if (__DEV__) {
  startDevChannel(server, () => DevSettings.reload());
}

// a web page
startDevChannel(location.origin, () => location.reload());
```

## How it works

- `backtick-dev` answers on http://localhost:3000 and forwards every request to your server, which it runs on a free port as `server/index.tsx`, with Node and `@backtickjs/node-plugin`, or Bun where `package.json` has `@backtickjs/bun-plugin`. The `Host` header is forwarded as the app sent it, so URLs your server makes from the request name where the app reached it.
- A change under `server/` restarts your server. A request that arrives during the restart waits for the new server.
- The dev channel is a WebSocket to `/__backtick`. Once the new server listens, `backtick-dev` sends `reload`, and the app reloads as you told it to. If your server fails to start, or crashes, the app logs why with `console.error`, which React Native's LogBox shows, and requests are answered `502` with it.
- If `backtick-dev` itself restarts, the dev channel reconnects and reloads.

## Related

- [`create-backtick-app`](https://github.com/backtickjs/backtick/tree/main/packages/create-backtick-app): creates a project
- [`@backtickjs/node-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/node-plugin): compiles scripts as Node loads your server

## License

MIT
