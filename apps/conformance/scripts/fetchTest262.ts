// Makes `test262/` a clone of tc39/test262 at `COMMIT`, fetched shallow, and
// leaves one already there alone.
//
// Pinned, so every checkout judges the same tests: moving to a newer test262
// is changing this line.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const COMMIT = "35d566604512cba908054eec49f85e64a59f3091";
const REMOTE = "https://github.com/tc39/test262.git";
const DIR = join(import.meta.dirname, "../test262");

const git = (...args: string[]): string =>
  execFileSync("git", args, { cwd: DIR, encoding: "utf8" }).trim();

if (existsSync(join(DIR, ".git")) && git("rev-parse", "HEAD") === COMMIT) {
  console.log(`test262 is at ${COMMIT.slice(0, 8)}`);
} else {
  if (!existsSync(join(DIR, ".git"))) {
    mkdirSync(DIR, { recursive: true });
    git("init", "--quiet");
    git("remote", "add", "origin", REMOTE);
  }
  console.log(`fetching test262 at ${COMMIT.slice(0, 8)}`);
  git("fetch", "--quiet", "--depth", "1", "origin", COMMIT);
  git("checkout", "--quiet", "--force", "FETCH_HEAD");
}
