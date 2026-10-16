# Seeing the page while you work

`npm start` runs the server on http://localhost:3000, which serves the page. The `agent-device` MCP tools, from `.mcp.json`, see and use it in a browser, once `npx agent-device web setup` has installed one; they need Node 24 or later.

The server's output is in the terminal `npm start` runs in.

Saving a file under `server/` restarts the server: open the page again to see the change. What the server keeps in memory starts over.
