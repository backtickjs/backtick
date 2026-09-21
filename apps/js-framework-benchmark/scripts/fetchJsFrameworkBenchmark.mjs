// Makes `js-framework-benchmark/` a clone of krausest/js-framework-benchmark at
// `COMMIT`, fetched shallow, with its server and driver installed, and this app
// linked in as `frameworks/keyed/backtick`. One already there is left alone.
//
// Pinned, so every checkout runs the same driver: moving to a newer upstream is
// changing this line.
import { spawnSync } from "node:child_process";
import { existsSync, lstatSync, mkdirSync, symlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const COMMIT = "247fafa22c1f2caeb4cad179aa64cf444398cbc7";
const REMOTE = "https://github.com/krausest/js-framework-benchmark.git";
const DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  "../js-framework-benchmark",
);

function run(command, args, options = {}) {
  const { status, stdout } = spawnSync(command, args, {
    cwd: DIR,
    stdio: ["inherit", "pipe", "inherit"],
    encoding: "utf8",
    ...options,
  });
  if (status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed`);
  }
  return stdout?.trim();
}

const git = (...args) => run("git", args);
const npm = (...args) =>
  run("npm", args, {
    stdio: "inherit",
    // The driver launches the system Chrome.
    env: { ...process.env, PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: "1" },
  });

let fetched = false;
if (existsSync(join(DIR, ".git")) && git("rev-parse", "HEAD") === COMMIT) {
  console.log(`js-framework-benchmark is at ${COMMIT.slice(0, 8)}`);
} else {
  if (!existsSync(join(DIR, ".git"))) {
    mkdirSync(DIR, { recursive: true });
    git("init", "--quiet");
    git("remote", "add", "origin", REMOTE);
  }
  console.log(`fetching js-framework-benchmark at ${COMMIT.slice(0, 8)}`);
  git("fetch", "--quiet", "--depth", "1", "origin", COMMIT);
  git("checkout", "--quiet", "--force", "FETCH_HEAD");
  fetched = true;
}

// The driver, the results page and the server, each its own npm project. The
// root's own dependencies are lint tooling, and its `npm ci` fails on their
// peer ranges.
const installed = [
  "webdriver-ts/dist",
  "webdriver-ts-results/node_modules",
  "server/node_modules",
].every((path) => existsSync(join(DIR, path)));
if (fetched || !installed) {
  npm("run", "install-local");
}

// Only what the server reads and serves, rather than the whole app: a link to
// this directory would put the clone inside itself.
const framework = join(DIR, "frameworks/keyed/backtick");
mkdirSync(framework, { recursive: true });
for (const file of ["package.json", "package-lock.json", "dist"]) {
  const link = join(framework, file);
  if (!lstatSync(link, { throwIfNoEntry: false })) {
    symlinkSync(join("../../../..", file), link);
  }
}
