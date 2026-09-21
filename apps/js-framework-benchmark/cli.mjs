#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Upstream's root scripts, run in the checkout `scripts/fetchJsFrameworkBenchmark.mjs`
// makes beside this file.
//
// Each command forwards its arguments untouched to the same script upstream
// runs — so `pnpm bench keyed/backtick --count 3` is `npm run bench --
// keyed/backtick --count 3` there, and behaves exactly as documented in their
// README. Nothing here interprets a framework name, reorders a flag, or checks
// anything first.

const HOME = join(
  dirname(fileURLToPath(import.meta.url)),
  "js-framework-benchmark",
);

const commands = {
  // `cd server && npm start`
  start: (args) => upstream("server", ["start", "--", ...args]),
  // `cd webdriver-ts && node dist/benchmarkRunner.js`
  bench: (args) => upstream("webdriver-ts", ["run", "bench", "--", ...args]),
  // `cd webdriver-ts && node dist/isKeyed.js`
  isKeyed: (args) =>
    upstream("webdriver-ts", ["run", "isKeyed", "--", ...args]),
  // `cd webdriver-ts && node dist/isCSPCompliant.js`
  checkCSP: (args) =>
    upstream("webdriver-ts", ["run", "checkCSP", "--", ...args]),
  // `cd webdriver-ts && npm run results`
  results: (args) =>
    upstream("webdriver-ts", ["run", "results", "--", ...args]),
};

const [command, ...rest] = process.argv.slice(2);
const run = commands[command ?? ""];
if (run === undefined) {
  console.error(`Usage: node cli.mjs <${Object.keys(commands).join(" | ")}>`);
  process.exit(1);
}
await import("./scripts/fetchJsFrameworkBenchmark.mjs");
run(rest);

function upstream(directory, args) {
  const { status } = spawnSync("npm", args, {
    cwd: join(HOME, directory),
    stdio: "inherit",
  });
  process.exit(status ?? 1);
}
