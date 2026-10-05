// Starts your Backtick server in development: it restarts whenever a file
// under `server/` changes, and the page reloads with it. Any other way of
// running the server, a deploy included, is production.
import { spawn } from "node:child_process";

const server = spawn(
  process.execPath,
  [
    "--watch",
    "--enable-source-maps",
    "--import",
    "@backtickjs/node-plugin",
    "server/index.tsx",
  ],
  {
    stdio: "inherit",
    env: { ...process.env, NODE_ENV: process.env.NODE_ENV ?? "development" },
  },
);

server.on("exit", (code) => process.exit(code ?? 0));
