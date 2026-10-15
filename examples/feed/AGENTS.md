# Seeing the app while you work

`npm start` runs the server behind http://localhost:3000, and Expo beside it. While it runs, the `backtick-dev` MCP tools, from `.mcp.json`, read the app:

- `logs`: one log, numbered: the server's output, the app's console and uncaught errors, and each restart of the server. Pass the last number you read as `since`.
- `screenshot`: what the app shows.
- `devices`: the apps connected.

Saving a file under `server/` restarts the server, and the app reloads with it: the log shows `Restarted your server`, then the app's `Running "main"`. The screen may still be loading for a moment after that.

A change to `client/moduleMap.ts` or the packages makes a new build: the app has to be closed and opened again, which only the person holding the phone can do. Until then, the server answers the open app with `UnknownBuild`.
