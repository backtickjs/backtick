# Seeing the app while you work

`npm start` runs the server behind http://localhost:3000, and Expo beside it. While it runs, the `backtick-dev` MCP tools, from `.mcp.json`, read the app:

- `logs`: one log, numbered: the server's output, the app's console and uncaught errors, and each restart of the server. Pass the last number you read as `since`.
- `screenshot`: what the app shows.
- `devices`: the apps connected.
- `inspect`: the app's UI as text, a number on each element that can be pressed, typed in or scrolled; then `press`, `type` and `scroll` act on an element by its number, as a person would. What's beyond the screen is marked `(off screen)`, and can only be pressed or typed in once scrolled to. Inspect again after each, since the numbers follow what's drawn.

Saving a file under `server/` restarts the server, and the app reloads with it: the log shows `Restarted your server`, then the app's `Running "main"`. The screen may still be loading for a moment after that.

A change to `client/moduleMap.ts` or the packages makes a new build: the app has to be closed and opened again, which only the person holding the phone can do. Until then, the server answers the open app with `UnknownBuild`.
