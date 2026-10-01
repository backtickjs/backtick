import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { it } from "node:test";
import * as vocabulary from "../dist/index.js";
import { version } from "../dist/version.js";

const versionOf = (url: URL): string =>
  (JSON.parse(readFileSync(url, "utf8")) as { version: string }).version;

it("is the adapter's version", () => {
  assert.equal(version, versionOf(new URL("../package.json", import.meta.url)));
});

it("is the version of the installed solid-js", () => {
  assert.equal(
    version,
    versionOf(new URL(import.meta.resolve("solid-js/package.json"))),
  );
});

it("is what every name needs, or a later 1.x", () => {
  for (const [name, value] of Object.entries(vocabulary)) {
    assert.equal(value.version, `^${version}`, name);
  }
});
