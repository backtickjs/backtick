#!/usr/bin/env node
// `backtick-dev [command…]`: your Backtick server in development, behind
// http://localhost:3000, restarted whenever a file under `server/` changes or
// an install changes packages; the app reloads once it's back. A command, `backtick-dev expo start`, runs
// alongside in this terminal, and stopping it stops both.
import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { supervise } from "./supervisor.js";

const { dependencies = {} } = JSON.parse(
  readFileSync("package.json", "utf8"),
) as { dependencies?: Record<string, string> };

// The runtime is the one package.json has a Backtick loader for: Bun's, or
// else Node's.
const supervisor = await supervise({
  command:
    "@backtickjs/bun-plugin" in dependencies
      ? ["bun", "--preload", "@backtickjs/bun-plugin", "server/index.tsx"]
      : [
          "node",
          "--enable-source-maps",
          "--import",
          "@backtickjs/node-plugin",
          "server/index.tsx",
        ],
  watch: ["server", "package.json", ...lockfiles(process.cwd())],
  port: 3000,
  env: { NODE_ENV: process.env.NODE_ENV ?? "development" },
});
// What an agent running this reads, to find what it can ask for.
console.log(`Backtick server on http://localhost:3000
  Logs:        curl "localhost:3000/__backtick/logs?since=N"
  Screenshot:  curl -o screen.png localhost:3000/__backtick/screenshot
  Devices:     curl localhost:3000/__backtick/devices`);

const stop = async (code: number) => {
  await supervisor.close();
  process.exit(code);
};

const [command, ...args] = process.argv.slice(2);
if (command === undefined) {
  for (const signal of ["SIGINT", "SIGTERM", "SIGHUP"] as const) {
    process.on(signal, () => stop(0));
  }
} else {
  const alongside = spawn(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  alongside.on("exit", (code) => stop(code ?? 0));
  // Stopped as a whole: a signal to this process alone, as a task runner
  // sends rather than Ctrl-C to the terminal, stops the command with it.
  for (const signal of ["SIGINT", "SIGTERM", "SIGHUP"] as const) {
    process.on(signal, () => alongside.kill(signal));
  }
}

// The lockfiles of the nearest folder that has any, this project's or, in a
// monorepo, its root's: an install writes them once packages are in place.
function lockfiles(folder: string): string[] {
  const found = [
    "pnpm-lock.yaml",
    "package-lock.json",
    "yarn.lock",
    "bun.lock",
    "bun.lockb",
  ]
    .map((name) => join(folder, name))
    .filter((path) => existsSync(path));
  const parent = dirname(folder);
  return found.length > 0 || parent === folder ? found : lockfiles(parent);
}
