# Seeing the app while you work

`npm start` runs the server on http://localhost:3000, and Expo beside it; the app runs in Expo Go. The `agent-device` MCP tools, from `.mcp.json`, see and use it, once `adb devices` lists the phone: by USB, or Wi-Fi with Wireless debugging paired.

The server's output is in the terminal `npm start` runs in.

Saving a file under `server/` restarts the server, and Expo reloads the app once it's back: what the server keeps in memory, likes and comments, starts over.

A change to `client/moduleMap.ts` or the packages makes a new build: the app has to be closed and opened again. Until then, the server answers the open app with `UnknownBuild`.
