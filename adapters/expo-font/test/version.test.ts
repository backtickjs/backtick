import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { it } from "node:test";
import * as main from "../dist/index.js";

const versionOf = (url: URL): string =>
  (JSON.parse(readFileSync(url, "utf8")) as { version: string }).version;

// Every name is typed against the expo-font the adapter is.
const versions = new Set(Object.values(main).map((value) => value.version));

it("is one version for every name", () => {
  assert.equal(versions.size, 1);
});

it("is the adapter's version", () => {
  const version = versionOf(new URL("../package.json", import.meta.url));
  assert.deepEqual([...versions], [version]);
});

it("is the installed expo-font", () => {
  const version = versionOf(
    new URL("../node_modules/expo-font/package.json", import.meta.url),
  );
  assert.deepEqual([...versions], [version]);
});
