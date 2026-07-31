#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, rmSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The commands upstream's own `cli.js` and root scripts provide, for a
// frameworks directory that lives here instead of there.
//
// The driver, the static server, the CSS every page links and the results
// table are all upstream's, and stay upstream: this clone is a checkout beside
// the repo, not a copy of it. What these commands do is point its tooling at
// this directory and get the arguments right — which is most of the difficulty,
// since the server resolves its frameworks root relative to *its own* repo
// root rather than to the caller.

const HERE = dirname(fileURLToPath(import.meta.url));
const FRAMEWORKS = join(HERE, "frameworks");

// The checkout, as a sibling of this repo unless `JSFB_HOME` says otherwise.
const HOME = resolve(
  process.env.JSFB_HOME ??
    join(HERE, "..", "..", "..", "js-framework-benchmark"),
);

const [command, ...rest] = process.argv.slice(2);

const commands = {
  start,
  bench,
  isKeyed,
  results,
  rebuild,
  clean,
};

const run = commands[command ?? ""];
if (run === undefined) {
  console.error(`Usage: node cli.mjs <${Object.keys(commands).join(" | ")}>`);
  process.exit(1);
}
run(rest);

// Serves this directory's frameworks, on the port the driver expects (8080,
// which upstream hardcodes on both sides).
function start() {
  // `directories.ts` joins the argument onto its own parent, so what it wants
  // is a path relative to the checkout's root — not to here, and not to
  // `server/`, where it is actually run.
  upstream("server", ["start", "--", relative(HOME, FRAMEWORKS)]);
}

// `bench svelte`, or `bench svelte --benchmark 01_ --count 3`.
function bench([name, ...args]) {
  upstream("webdriver-ts", ["run", "bench", "--", keyed(name), ...args]);
}

// Whether the implementation is keyed, which upstream checks before a run
// counts: a directory under `keyed/` that recycles its rows is rejected.
function isKeyed([name, ...args]) {
  upstream("webdriver-ts", ["run", "isKeyed", "--", keyed(name), ...args]);
}

function results() {
  upstream("webdriver-ts", ["run", "results"]);
}

// `npm install && npm run build-prod` in each implementation, which is what
// upstream requires of every one of them. No argument builds them all.
function rebuild([name]) {
  const directories = name === undefined ? all() : [resolveFramework(name)];
  for (const directory of directories) {
    console.log(`\n=== ${relative(FRAMEWORKS, directory)}`);
    npm(directory, ["install", "--no-audit", "--no-fund"]);
    npm(directory, ["run", "build-prod"]);
  }
}

function clean() {
  for (const directory of all()) {
    for (const built of ["node_modules", "dist"]) {
      rmSync(join(directory, built), { recursive: true, force: true });
    }
    console.log(`cleaned ${relative(FRAMEWORKS, directory)}`);
  }
}

// Every implementation, as `keyed/<name>` and `non-keyed/<name>` directories.
function all() {
  return readdirSync(FRAMEWORKS, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((type) =>
      readdirSync(join(FRAMEWORKS, type.name), { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => join(FRAMEWORKS, type.name, entry.name)),
    );
}

function resolveFramework(name) {
  const directory = name.includes("/")
    ? join(FRAMEWORKS, name)
    : join(FRAMEWORKS, "keyed", name);
  if (!existsSync(directory)) {
    console.error(`No framework at ${relative(HERE, directory)}`);
    process.exit(1);
  }
  return directory;
}

// The driver matches a framework by exact equality, not by prefix, so the
// `keyed/` is not optional — it is only tedious.
function keyed(name) {
  if (name === undefined) {
    console.error("Which framework? e.g. `svelte`");
    process.exit(1);
  }
  return name.includes("/") ? name : `keyed/${name}`;
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
  npm(join(HOME, directory), args);
}

function npm(cwd, args) {
  const { status } = spawnSync("npm", args, { cwd, stdio: "inherit" });
  if (status !== 0) {
    process.exit(status ?? 1);
  }
}
