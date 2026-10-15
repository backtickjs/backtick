# @backtickjs/dev

[Backtick](https://backtickjs.com) in development. `backtick-dev` runs your server, restarts it when you save a file under `server/`, and reloads the app once the new server is up. It keeps your server's output and the app's console in one log, which you, or an agent, read with `curl`.

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

**The app** starts the dev channel with the URL it reaches your server at, and how it reloads. It hands the channel its uncaught errors, from wherever its platform reports them:

```ts
import { startDevChannel } from "@backtickjs/dev/client";

// React Native
if (__DEV__) {
  const channel = startDevChannel(server, {
    reload: () => DevSettings.reload(),
    // optional: what the screen shows, with react-native-view-shot
    screenshot: () => captureScreen({ format: "png", result: "base64" }),
  });
  const handler = ErrorUtils.getGlobalHandler();
  ErrorUtils.setGlobalHandler((error, fatal) => {
    channel.report(error);
    handler(error, fatal);
  });
}

// a web page
const channel = startDevChannel(location.origin, {
  reload: () => location.reload(),
});
addEventListener("error", (event) => channel.report(event.error));
```

The package knows no platform: how the app reloads, and where its uncaught errors come from, are the app's to say.

## How it works

- `backtick-dev` answers on http://localhost:3000 and forwards every request to your server, which it runs on a free port as `server/index.tsx`, with Node and `@backtickjs/node-plugin`, or Bun where `package.json` has `@backtickjs/bun-plugin`. The `Host` header is forwarded as the app sent it, so URLs your server makes from the request name where the app reached it.
- A change under `server/` restarts your server, and so does an install: `backtick-dev` watches `package.json`, and the lockfile of the nearest folder up that has one, the monorepo's root included, which package managers write once the packages are in place. A request that arrives during the restart waits for the new server. The log says what changed.
- The dev channel is a WebSocket to `/__backtick`. Once the new server listens, `backtick-dev` sends `reload`, and the app reloads as you told it to. If your server fails to start, or crashes, the app logs why with `console.error`, which React Native's LogBox shows, and requests are answered `502` with it.
- If `backtick-dev` itself restarts, the dev channel reconnects and reloads.

## Logs

`backtick-dev` keeps the last 5,000 lines of your server's output, the app's console and uncaught errors, and its own restarts, numbered in order:

```sh
curl localhost:3000/__backtick/logs           # all of it
curl localhost:3000/__backtick/logs?since=42  # what came after #42
curl localhost:3000/__backtick/devices        # the apps connected
```

```
#41 2026-10-15T20:31:00.104Z server log Backtick server on http://localhost:51234
#42 2026-10-15T20:31:02.990Z app 192.168.0.123 error Failed: TypeError: …
    at Item (…)
#43 2026-10-15T20:31:05.311Z backtick-dev info Restarted your server after a change.
```

The app's lines come from the dev channel: it sends `console` output, and the uncaught errors the app hands `channel.report`, keeping what was logged before it connected.

## Screenshots

With a `screenshot` option, `backtick-dev` can ask the app for a PNG of what it shows, for you or an agent:

```sh
curl -o screen.png localhost:3000/__backtick/screenshot                    # the newest app connected
curl -o screen.png "localhost:3000/__backtick/screenshot?device=192.168.0.123"
```

It's the whole screen, as the person sees it. It answers `404` when no app is connected, `501` when the app takes no screenshots or failed to, and `504` when it doesn't answer within 10 seconds.

## Related

- [`create-backtick-app`](https://github.com/backtickjs/backtick/tree/main/packages/create-backtick-app): creates a project
- [`@backtickjs/node-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/node-plugin): compiles scripts as Node loads your server

## License

MIT
