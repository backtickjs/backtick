// Makes `test262/` a clone of tc39/test262 at `COMMIT`, fetched shallow, and
// leaves one already there alone.
//
// Pinned, so every checkout judges the same cases: moving to a newer Test262 is
// changing this line.
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const COMMIT = "35d566604512cba908054eec49f85e64a59f3091";
const REMOTE = "https://github.com/tc39/test262.git";
const DIR = join(import.meta.dir, "../test262");

function git(...args: string[]): string {
  const { exitCode, stdout, stderr } = Bun.spawnSync(["git", ...args], {
    cwd: DIR,
  });
  if (exitCode !== 0) {
    throw new Error(`git ${args.join(" ")} failed: ${stderr.toString()}`);
  }
  return stdout.toString().trim();
}

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
