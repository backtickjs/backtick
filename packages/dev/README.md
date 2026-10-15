# @backtickjs/dev

[Backtick](https://backtickjs.com) in development. `backtick-dev` runs your server, restarts it when you save a file under `server/`, and reloads the app once the new server is up. It keeps your server's output and the app's console in one log, which agents read, with a screenshot of the app, through its MCP tools.

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

## Agents: MCP tools

`backtick-dev-mcp` serves what `backtick-dev` sees of the app as MCP tools, over stdio, so an agent finds them in its tool list:

- `logs`: the last 5,000 lines of your server's output, the app's console and uncaught errors, and each restart of your server with the file that changed, numbered in order. `since`, the last number read, answers only what came after.
- `screenshot`: a PNG of what the app has drawn, as an image the agent sees, from the newest app connected or the one at `device`. It's the app's window, not the display: it looks the same with the phone's screen off.
- `devices`: the apps connected, by address.
- `inspect`: the app's UI as text, in order, a number on each element that can be pressed, typed in or scrolled. What's beyond the screen, further down a list, is marked `(off screen)`.
- `press`, `type` and `scroll`: act on an element by its number, as a person would: its `onPress`, its `onChangeText`, or the list's own scrolling, so a list that loads more as it nears its end does. An element off screen is scrolled to first; a stale number answers so.

```
#41 2026-10-15T20:31:00.104Z server log Backtick server on http://localhost:51234
#42 2026-10-15T20:31:02.990Z app 192.168.0.123 error Failed: TypeError: …
    at Item (…)
#43 2026-10-15T20:31:05.311Z backtick-dev info Restarted your server: server/Item.tsx changed.
```

Register it in the project's `.mcp.json`:

```json
{
  "mcpServers": {
    "backtick-dev": {
      "command": "npx",
      "args": ["--no", "backtick-dev-mcp"]
    }
  }
}
```

`--no` keeps `npx` to the copy installed in the project. The UI tools need the app's `ui` option: in React Native, `reactNativeUI`, from `@backtickjs/dev/react-native`, which reads the app's React tree through React DevTools' hook and measures it with the new architecture's renderer. The tools ask the `backtick-dev` running on http://localhost:3000, or at `BACKTICK_DEV_ORIGIN`; without one, each says to start it with `npm start`. A screenshot needs the app's `screenshot` option. The app's lines come from the dev channel: it sends `console` output, and the uncaught errors the app hands `channel.report`, keeping what was logged before it connected.

## Related

- [`create-backtick-app`](https://github.com/backtickjs/backtick/tree/main/packages/create-backtick-app): creates a project
- [`@backtickjs/node-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/node-plugin): compiles scripts as Node loads your server

## License

MIT
