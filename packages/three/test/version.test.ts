import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { it } from "node:test";
import * as main from "../dist/index.js";

const versionOf = (url: URL): string =>
  (JSON.parse(readFileSync(url, "utf8")) as { version: string }).version;

// Every name needs the three the adapter is typed against, or a later
// 0.182.x.
const ranges = new Set(Object.values(main).map((value) => value.version));

it("is one range for every name", () => {
  assert.equal(ranges.size, 1);
});

it("starts at the adapter's version", () => {
  const version = versionOf(new URL("../package.json", import.meta.url));
  assert.deepEqual([...ranges], [`^${version}`]);
});

it("starts at the installed three", () => {
  const version = versionOf(
    new URL("../node_modules/three/package.json", import.meta.url),
  );
  assert.deepEqual([...ranges], [`^${version}`]);
});
