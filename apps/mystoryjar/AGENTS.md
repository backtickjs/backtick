# Seeing the app while you work

`npm start` runs the Firebase emulators, the server on http://localhost:3000, and Expo beside them; the app runs in its development build. The `agent-device` MCP tools, from `.mcp.json`, see and use it, once `adb devices` lists the phone: by USB, or Wi-Fi with Wireless debugging paired.

The server's output is in the terminal `npm start` runs in.

Saving a file under `server/` restarts the server, and Expo reloads the app once it's back.

An upgraded package reaches the server once the app is closed and opened again: a reload keeps the versions it was opened with.
