import assert from "node:assert/strict";
import { test } from "node:test";
import { cs, type Visitor } from "@backtickjs/cs-runtime";

// the visitor is never run here; only `create`'s version check is under test
function noVisit<U>(_visitor: Visitor<U>): U {
  return undefined as unknown as U;
}

// Exercised through `cs.create`, the path emitted code takes. The warning
// dedupes per version, so each case uses a distinct one.
function warningsFrom(version: string, times = 1): string[] {
  const warnings: string[] = [];
  const original = console.warn;
  console.warn = (message: string) => warnings.push(message);
  try {
    for (let call = 0; call < times; call++) {
      cs.create([0, 0, 0, 0], metadata(version), noVisit);
    }
  } finally {
    console.warn = original;
  }
  return warnings;
}

function metadata(version: string) {
  return {
    version,
    filePath: "test.ts",
    fileHash: "hash",
    kind: "value" as const,
    splices: {},
    captures: [],
    declarations: [],
  };
}

test("a script from a newer compiler warns", () => {
  const warnings = warningsFrom("99.0.0");
  assert.equal(warnings.length, 1);
  assert.match(warnings[0]!, /compiled by backtick 99\.0\.0/);
});

test("a script from an older compiler is silent", () => {
  assert.deepEqual(warningsFrom("0.0.1"), []);
});

test("a newer patch still warns, an older patch does not", () => {
  assert.equal(warningsFrom("98.0.1").length, 1);
  assert.deepEqual(warningsFrom("0.0.9"), []);
});

test("the warning fires once per version, not once per script", () => {
  assert.equal(warningsFrom("97.0.0", 5).length, 1);
});

test("an unparseable version is not treated as a mismatch", () => {
  assert.deepEqual(warningsFrom("not-a-version"), []);
});
