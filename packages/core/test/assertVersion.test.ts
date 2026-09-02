import assert from "node:assert/strict";
import { test } from "node:test";
import { cs } from "@backtickjs/core";
import { SyntaxKind, type ClientScriptBody } from "@backtickjs/boundary";

// the body is never read here; only `create`'s version check is under test
const noBody = (): ClientScriptBody => ({
  kind: SyntaxKind.NullKeyword,
  loc: [0, 0, 0, 0],
});

// exercised through `cs.create`, the path emitted code takes
function create(version: string) {
  return () =>
    cs.create(
      [0, 0, 0, 0],
      {
        version,
        filePath: "test.ts",
        fileHash: "hash",
        splices: {},
        captures: [],
      },
      noBody,
    );
}

test("a script from a newer compiler throws", () => {
  assert.throws(create("99.0.0"), /compiled by backtick 99\.0\.0/);
});

test("a script from an older compiler is accepted", () => {
  assert.doesNotThrow(create("0.0.1"));
});

test("a newer patch throws, an older patch does not", () => {
  assert.throws(create("98.0.1"), /compiled by backtick 98\.0\.1/);
  assert.doesNotThrow(create("0.0.9"));
});

test("an unparseable version throws", () => {
  assert.throws(create("not-a-version"), /Could not parse "not-a-version"/);
  assert.throws(create("1.2"), /Expected three numeric parts/);
  assert.throws(create(""), /Expected three numeric parts/);
});

test("a prerelease version is read by its release parts", () => {
  assert.doesNotThrow(create("0.0.1-beta.1"));
  assert.throws(
    create("99.0.0-beta.1"),
    /compiled by backtick 99\.0\.0-beta\.1/,
  );
});
