import assert from "node:assert/strict";
import { test } from "node:test";
import { createJsxElement, cs, type Spliceable } from "@backtickjs/core";
import { es } from "./es.ts";

// A bundle is a function of what was spliced alone: bundling it again, or after
// other bundles, writes the same code. Nothing the bundler keeps while bundling
// (element results, names) may carry over from one bundle to the next.

const Badge = (props: { label: string }) => [props.label];
const Pill = (props: { label: string }) => props.label;

const values: Record<string, Spliceable> = {
  "an element whose component runs": createJsxElement(Badge, { label: "a" }),
  "two elements of one component": [
    createJsxElement(Badge, { label: "a" }),
    createJsxElement(Badge, { label: "b" }),
  ],
  "elements of two components": [
    createJsxElement(Badge, { label: "a" }),
    createJsxElement(Pill, { label: "b" }),
  ],
};

// One script for every bundle, so they differ only in what it splices.
const bundled = (value: Spliceable) => es(cs`${value}`);

for (const [name, value] of Object.entries(values)) {
  test(`${name} bundles the same every time`, async () => {
    const first = await bundled(value);
    assert.equal(await bundled(value), first);
    // Other bundles in between, including of the same functions.
    for (const other of Object.values(values)) {
      await bundled(other);
    }
    assert.equal(await bundled(value), first);
  });
}
