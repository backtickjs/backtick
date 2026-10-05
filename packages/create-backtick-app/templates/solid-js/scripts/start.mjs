// Starts your Backtick server in development: it restarts whenever a file
// under `server/` changes, and the page reloads with it. Any other way of
// running the server, a deploy included, is production.
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";

// The runtime is the one package.json has a Backtick loader for: Bun's, or
// else Node's.
const { dependencies } = JSON.parse(readFileSync("package.json", "utf8"));
const [runtime, ...loader] =
  "@backtickjs/bun-plugin" in dependencies
    ? ["bun", "--preload", "@backtickjs/bun-plugin"]
    : ["node", "--enable-source-maps", "--import", "@backtickjs/node-plugin"];

const server = spawn(runtime, ["--watch", ...loader, "server/index.tsx"], {
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: process.env.NODE_ENV ?? "development" },
});

server.on("exit", (code) => process.exit(code ?? 0));
