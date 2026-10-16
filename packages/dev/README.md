# @backtickjs/dev

[Backtick](https://backtickjs.com) in development. Node's `--watch` restarts your server when you save, and `@backtickjs/dev/reload` reloads the app once the new server listens, as pressing `r` in Expo's terminal does.

## Install

```sh
npm install @backtickjs/dev
```

## Usage

**`package.json`** runs your server with `--watch` and the preload, and Expo beside it, with [`concurrently`](https://www.npmjs.com/package/concurrently). `--raw` keeps Expo's keys and QR code:

```json
{
  "scripts": {
    "server": "node --watch --import @backtickjs/node-plugin --import @backtickjs/dev/reload server/index.tsx",
    "start": "concurrently --raw --kill-others npm:server \"expo start\""
  }
}
```

Your server changes nothing: it listens on its port, and the app reaches it there.

## How it works

- `node --watch` restarts your server when a file it imports changes.
- Each time your server listens, the preload sends `reload` on Expo's message socket, `ws://127.0.0.1:8081/message`, or at `RCT_METRO_PORT`. Expo reloads every app it serves. Without Expo running, nothing happens.
- It needs Node: Bun doesn't report a server listening to the preload.

## Agents

[`agent-device`](https://github.com/callstackincubator/agent-device) lets agents see and use the app: its screen, its UI as a tree to press, fill and scroll, and its logs. Register it in the project's `.mcp.json`:

```json
{
  "mcpServers": {
    "agent-device": {
      "command": "npx",
      "args": ["--no", "agent-device", "mcp"]
    }
  }
}
```

## Related

- [`create-backtick-app`](https://github.com/backtickjs/backtick/tree/main/packages/create-backtick-app): creates a project
- [`@backtickjs/node-plugin`](https://github.com/backtickjs/backtick/tree/main/packages/node-plugin): compiles scripts as Node loads your server

## License

MIT
