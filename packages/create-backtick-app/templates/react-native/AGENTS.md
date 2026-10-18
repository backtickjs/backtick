# Seeing the app while you work

`npm start` runs the server on http://localhost:3000, and Expo beside it; the app runs in Expo Go. The `agent-device` MCP tools, from `.mcp.json`, see and use it, once `adb devices` lists the phone: by USB, or Wi-Fi with Wireless debugging paired.

The server's output is in the terminal `npm start` runs in.

Saving a file under `server/` restarts the server, and Expo reloads the app once it's back: what the server keeps in memory starts over.

A change to `client/moduleMap.ts` or the packages reaches the server once the app is closed and opened again: a reload keeps the modules it sent when it was opened.
