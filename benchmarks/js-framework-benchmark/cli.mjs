#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Upstream's root scripts, for a frameworks directory that lives here instead
// of there.
//
// Each command forwards its arguments untouched to the same script upstream
// runs, in the checkout beside this repo — so `pnpm bench keyed/svelte
// --count 3` is `npm run bench -- keyed/svelte --count 3` there, and behaves
// exactly as documented in their README. Nothing here interprets a framework
// name, reorders a flag, or checks anything first.
//
// One command differs, because it has to: upstream's server serves its own
// `frameworks/`, and it takes the directory to serve as an argument. Working
// out that argument is the only thing this file does that upstream doesn't.

const HERE = dirname(fileURLToPath(import.meta.url));
const FRAMEWORKS = join(HERE, "frameworks");

// The checkout, as a sibling of this repo unless `JSFB_HOME` says otherwise.
const HOME = resolve(
  process.env.JSFB_HOME ??
    join(HERE, "..", "..", "..", "js-framework-benchmark"),
);

const commands = {
  // `cd server && npm start`, plus the directory to serve.
  start: (args) => upstream("server", ["start", "--", frameworks(), ...args]),
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
run(rest);

// `server/src/config/directories.ts` joins its argument onto its own parent, so
// what it wants is a path relative to the checkout's root — not to here, and
// not to `server/`, where it is actually run.
function frameworks() {
  return relative(HOME, FRAMEWORKS);
}

function upstream(directory, args) {
  if (!existsSync(join(HOME, directory))) {
    console.error(
      `No js-framework-benchmark checkout at ${HOME}\n\n` +
        `  git clone https://github.com/krausest/js-framework-benchmark ${HOME}\n` +
        `  cd ${HOME} && npm ci\n` +
        `  PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm run install-webdriver-ts\n\n` +
        `Or set JSFB_HOME to where it already is. See README.md.`,
    );
    process.exit(1);
  }
  const { status } = spawnSync("npm", args, {
    cwd: join(HOME, directory),
    stdio: "inherit",
  });
  process.exit(status ?? 1);
}
