# Seeing the app while you work

`npm start` runs the server behind http://localhost:3000, and Expo beside it. While it runs, read the app from here:

- `curl "localhost:3000/__backtick/logs?since=N"`: one log, numbered: the server's output, the app's console and uncaught errors, and each restart of the server. `N` is the last number you read; leave it out for everything kept.
- `curl -o screen.png localhost:3000/__backtick/screenshot`: a PNG of what the app shows. It answers 404 when no app is open.
- `curl localhost:3000/__backtick/devices`: the apps connected, by address.

Saving a file under `server/` restarts the server, and the app reloads with it: the log shows `Restarted your server`, then the app's `Running "main"`. The screen may still be loading for a moment after that.

A change to `client/moduleMap.ts` or the packages makes a new build: the app has to be closed and opened again, which only the person holding the phone can do. Until then, the server answers the open app with `UnknownBuild`.
