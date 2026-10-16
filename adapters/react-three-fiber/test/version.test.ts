import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { it } from "node:test";
import * as main from "../dist/index.js";
import * as native from "../dist/native.js";

const versionOf = (url: URL): string =>
  (JSON.parse(readFileSync(url, "utf8")) as { version: string }).version;

// Every name, in both builds, is typed against the R3F the adapter is.
const versions = new Set(
  [...Object.values(main), ...Object.values(native)].map(
    (value) => value.version,
  ),
);

it("is one version for every name", () => {
  assert.equal(versions.size, 1);
});

it("is the adapter's version", () => {
  const version = versionOf(new URL("../package.json", import.meta.url));
  assert.deepEqual([...versions], [version]);
});

it("is the installed @react-three/fiber", () => {
  const version = versionOf(
    new URL("../node_modules/@react-three/fiber/package.json", import.meta.url),
  );
  assert.deepEqual([...versions], [version]);
});
