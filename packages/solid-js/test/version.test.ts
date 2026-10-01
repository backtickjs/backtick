import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { it } from "node:test";
import * as main from "../dist/index.js";
import * as store from "../dist/store.js";
import * as web from "../dist/web.js";

const vocabulary = Object.assign({}, main, store, web);

const versionOf = (url: URL): string =>
  (JSON.parse(readFileSync(url, "utf8")) as { version: string }).version;

// Every name needs the Solid the adapter is typed against, or a later 1.x.
const ranges = new Set(Object.values(vocabulary).map((value) => value.version));

it("is one range for every name", () => {
  assert.equal(ranges.size, 1);
});

it("starts at the adapter's version", () => {
  const version = versionOf(new URL("../package.json", import.meta.url));
  assert.deepEqual([...ranges], [`^${version}`]);
});

it("starts at the installed solid-js", () => {
  const version = versionOf(
    new URL(import.meta.resolve("solid-js/package.json")),
  );
  assert.deepEqual([...ranges], [`^${version}`]);
});
