import assert from "node:assert/strict";
import { test } from "node:test";
import { createJsxElement, type Spliceable } from "@backtickjs/core";
import { es } from "./es.ts";

// A bundle is a function of what was spliced alone: bundling it again, or after
// other bundles, writes the same code. Nothing the bundler keeps while bundling
// (expansions, element results, names) may carry over from one bundle to the
// next.

const identity = (n: never) => n;
const pair = (n: never) => (m: never) => [n, m];
const Badge = (props: { label: never }) => [props.label];

const values: Record<string, Spliceable> = {
  "a host function": identity,
  "a host function answering a host function": pair,
  "an element whose component runs": createJsxElement(Badge, { label: "a" }),
  "a function spliced twice": [identity, identity],
};

for (const [name, value] of Object.entries(values)) {
  test(`${name} bundles the same every time`, async () => {
    const first = await es(value);
    assert.equal(await es(value), first);
    // Other bundles in between, including of the same functions.
    for (const other of Object.values(values)) {
      await es(other);
    }
    assert.equal(await es(value), first);
  });
}
