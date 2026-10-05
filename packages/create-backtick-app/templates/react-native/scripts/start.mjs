// Starts your Backtick server in development, then Expo, both in this terminal:
// Expo keeps its keys and QR code, and the server restarts whenever a file
// under `server/` changes. Arguments are Expo's, as `npm run ios` passes
// `--ios`.
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

// `bunx` where Bun runs this script, as it does where Node isn't installed.
const npx = process.versions.bun ? "bunx" : "npx";
const expo = spawn(npx, ["expo", "start", ...process.argv.slice(2)], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

expo.on("exit", (code) => {
  server.kill();
  process.exit(code ?? 0);
});
