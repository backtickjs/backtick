import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { it } from "node:test";
import * as client from "../dist/client.js";
import * as main from "../dist/index.js";

const vocabulary = Object.assign({}, main, client);

const versionOf = (url: URL): string =>
  (JSON.parse(readFileSync(url, "utf8")) as { version: string }).version;

// Every name needs the React the adapter is typed against, or a later 19.x.
const ranges = new Set(Object.values(vocabulary).map((value) => value.version));

it("is one range for every name", () => {
  assert.equal(ranges.size, 1);
});

it("starts at the adapter's version", () => {
  const version = versionOf(new URL("../package.json", import.meta.url));
  assert.deepEqual([...ranges], [`^${version}`]);
});

it("starts at the installed react and react-dom", () => {
  for (const name of ["react", "react-dom"]) {
    const version = versionOf(
      new URL(import.meta.resolve(`${name}/package.json`)),
    );
    assert.deepEqual([...ranges], [`^${version}`], name);
  }
});
