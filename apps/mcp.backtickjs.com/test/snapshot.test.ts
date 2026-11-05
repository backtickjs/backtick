// The function starts sandboxes from the snapshot snapshot.json names, so it
// must be the one made from this commit's sandbox/.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { sandboxHash, sandboxRoot } from "../scripts/sandboxFiles.ts";

test("snapshot.json's snapshot was made from sandbox/ as it is", () => {
  const recorded = JSON.parse(
    readFileSync(join(import.meta.dirname, "../snapshot.json"), "utf8"),
  ) as { snapshotId: string; sandbox: string };
  assert.equal(
    sandboxHash(),
    recorded.sandbox,
    "sandbox/ changed since its snapshot was made: run " +
      "`node --env-file=.env.local scripts/snapshot.ts`, which updates snapshot.json.",
  );
});

test("sandbox/package-lock.json is sandbox/package.json's", () => {
  const read = (file: string) =>
    JSON.parse(readFileSync(join(sandboxRoot, file), "utf8"));
  const { dependencies, devDependencies } = read("package.json");
  const locked = read("package-lock.json").packages[""];
  assert.deepEqual(
    {
      dependencies: locked.dependencies,
      devDependencies: locked.devDependencies,
    },
    { dependencies, devDependencies },
    "sandbox/package.json changed: run `node scripts/lock.ts`, then make a snapshot.",
  );
});
