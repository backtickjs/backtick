// Copies Test262 into `cases/` — every file the checkout holds, verbatim, that
// V8 passes.
//
// Nothing is extracted or rewritten. A case is the file TC39 wrote, at the path
// TC39 wrote it, so it reads against upstream without a lookup and re-copies
// from a newer tag without a merge. No area is chosen either: a test this
// language will never pass still documents what JavaScript does there, and
// choosing would mean deciding in advance which parts of the language are worth
// knowing about.
//
// One thing is decided, and it is about the corpus rather than any case: a file
// only lands if this runner runs it and V8 passes it. That keeps a single
// invariant — everything under `cases/` passes — so a red run is always news.
//
// Which is why the tests are *run* here rather than filtered by a list of
// features or paths. A hand-kept list is a second opinion about what V8 does,
// and it goes stale the day Node updates. Running them cannot drift, and it
// makes the reason each straggler was left behind its own error rather than a
// guess.
import {
  readdirSync,
  readFileSync,
  statSync,
  mkdirSync,
  copyFileSync,
  rmSync,
} from "node:fs";
import { join, relative, dirname } from "node:path";
import {
  absorbUnhandledRejections,
  assemble,
  check,
  frontmatter,
  modes,
} from "../runner.mjs";
import { blocklist, blocks } from "../blocklist.mjs";

absorbUnhandledRejections();

const TEST262 =
  process.env.TEST262 ?? "/Users/jbisson/Documents/GitHub/test262";
const HERE = new URL("..", import.meta.url).pathname;
const HARNESS = join(HERE, "harness");

function* files(dir) {
  for (const entry of readdirSync(dir).sort()) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) yield* files(path);
    else if (entry.endsWith(".js")) yield path;
  }
}

function copy(from, to) {
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(from, to);
}

// Written out fresh, so a file upstream removed does not linger here.
rmSync(join(HERE, "cases"), { recursive: true, force: true });
rmSync(HARNESS, { recursive: true, force: true });

// The harness first: nothing can be run before it is here.
let harness = 0;
const harnessFrom = join(TEST262, "harness");
for (const path of files(harnessFrom)) {
  copy(path, join(HARNESS, relative(harnessFrom, path)));
  harness++;
}

const testFrom = join(TEST262, "test");
// What client script has not got never lands: `blocklist.txt` is the record of
// the gap, and carrying the tests as well would say the same thing at the cost
// of two hundred megabytes.
const entries = blocklist();
const blocked = new Map();
const left = new Map();
let kept = 0;
let seen = 0;
let skipped = 0;

for (const path of files(testFrom)) {
  const file = relative(testFrom, path);
  const source = readFileSync(path, "utf8");

  // The blocklist first, so a fixture in a blocked directory goes with the
  // tests that would have imported it.
  const blockedBy = blocks(entries, file);
  if (blockedBy) {
    skipped++;
    blocked.set(blockedBy.prefix, (blocked.get(blockedBy.prefix) ?? 0) + 1);
    continue;
  }

  // A fixture is imported by the test beside it rather than run, so it travels
  // with its test and is never judged on its own.
  if (file.endsWith("_FIXTURE.js")) {
    copy(path, join(HERE, "cases", file));
    continue;
  }

  seen++;
  const meta = frontmatter(source);
  const assembled = assemble(HARNESS, source, meta);
  let why = null;
  for (const strict of modes(meta.flags)) {
    const held = await check(assembled, strict, meta);
    if (!held.ok) {
      why = held.why;
      break;
    }
  }
  if (why) {
    // Grouped by the shape of the failure: the types and names in one vary case
    // by case, and what is worth counting is the kind.
    const shape = why.replace(/'[^']*'/g, "'…'").slice(0, 70);
    left.set(shape, (left.get(shape) ?? 0) + 1);
    continue;
  }

  copy(path, join(HERE, "cases", file));
  kept++;
}

// A prefix that blocks nothing is a line describing a gap that has closed or a
// path that moved. Either way it is stale, and saying so here is what keeps the
// list from drifting into decoration.
const stale = entries.filter((entry) => !blocked.has(entry.prefix));

console.log(
  `${kept} of ${seen} unblocked cases kept, and ${harness} harness files\n` +
    `${skipped} blocked as not client script\n` +
    `${seen - kept} left behind by V8, by kind:`,
);
for (const [why, n] of [...left].sort((a, b) => b[1] - a[1]).slice(0, 12)) {
  console.log(`  ${String(n).padStart(5)}  ${why}`);
}
if (left.size > 12) console.log(`  …and ${left.size - 12} more kinds`);
if (stale.length > 0) {
  console.log(`\n${stale.length} blocklist lines matched nothing:`);
  for (const entry of stale) {
    console.log(`  blocklist.txt:${entry.line}  ${entry.prefix}`);
  }
  process.exitCode = 1;
}
