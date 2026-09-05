import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import {
  absorbUnhandledRejections,
  assemble,
  check,
  frontmatter,
  modes,
} from "./runner.mjs";
import { blocklist, blocks } from "./blocklist.mjs";

// Test262, run in V8, one row per test and mode.
//
// The files under `cases/` are TC39's, unchanged, so this is a Test262 host and
// nothing more: it does what `INTERPRETING.md` requires — prepend `assert.js`
// and `sta.js`, prepend whatever `includes:` names, honour `flags:`, and treat
// a `negative:` test as passing when it throws.
//
// Every case runs, and every one must pass. `curate.mjs` kept only what this
// runner runs green, so there is nothing to skip and a red run is always news —
// a Node upgrade that changes V8's behaviour shows up here rather than being
// absorbed by a list of exceptions.
//
// Nothing here asks what Backtick makes of a case. The corpus deliberately
// holds tests the client will never pass: they document what JavaScript does,
// and filtering for the client is a later pass over the same files.

absorbUnhandledRejections();

const HERE = new URL(".", import.meta.url).pathname;
const CASES = join(HERE, "cases");
const HARNESS = join(HERE, "harness");

function* walk(dir) {
  for (const entry of readdirSync(dir).sort()) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) yield* walk(path);
    else if (entry.endsWith(".js")) yield path;
  }
}

const cases = [...walk(CASES)]
  .map((path) => {
    const source = readFileSync(path, "utf8");
    return { file: relative(CASES, path), source, meta: frontmatter(source) };
  })
  // A fixture is imported by the test beside it rather than run on its own.
  .filter((c) => !c.file.endsWith("_FIXTURE.js"));

describe("test262", () => {
  it("the corpus is not empty", () => {
    assert.ok(cases.length > 0, "run `pnpm curate` to copy Test262 in");
  });

  it("nothing here is blocked", () => {
    // `blocklist.txt` says what client script has not got, and `curate.mjs`
    // leaves it upstream. A case that is both copied and blocked means the two
    // were written at different times — the list grew, or a path moved — and
    // whichever it was, one of them is now wrong.
    const entries = blocklist();
    const contradicted = cases
      .map((c) => [c.file, blocks(entries, c.file)])
      .filter(([, held]) => held !== null)
      .map(
        ([file, held]) => `${file} is blocked by ${held.prefix} (${held.why})`,
      );
    assert.deepEqual(
      contradicted,
      [],
      "re-run `pnpm curate`, or drop the blocklist lines that now cover copied cases",
    );
  });

  for (const held of cases) {
    const assembled = assemble(HARNESS, held.source, held.meta);
    for (const strict of modes(held.meta.flags)) {
      it(`${held.file}${strict ? " (strict)" : ""}`, async () => {
        const answer = await check(assembled, strict, held.meta);
        assert.ok(answer.ok, answer.why);
      });
    }
  }
});
