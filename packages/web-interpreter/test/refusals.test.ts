import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { schema } from "@backtickjs/web-sdk/schema";
import { rendererOptions } from "../src/rendererOptions.ts";

// Built when called: a test puts its own document in place first.
const dom = () => rendererOptions(globalThis.document);

// What a hostile bundle is refused is read off a rendered page in `tests/`;
// what stays here is the schema, which a page never sees.

// The document `createElement` asks, recording what it was asked for. Standing
// in for a browser's, so a refusal is a tag that never reached it.
function documented(): { asked: string[] } {
  const asked: string[] = [];
  const made = (tag: string) => ({ tag });
  (globalThis as { document?: unknown }).document = {
    createElement: (tag: string) => {
      asked.push(tag);
      return made(tag);
    },
    createElementNS: (_namespace: string, tag: string) => {
      asked.push(`svg:${tag}`);
      return made(tag);
    },
  };
  return { asked };
}

// The rule is one name, so what can go wrong is the schema growing it back:
// declared and refused is a tag a drawing may write and no client will draw.
describe("the vocabulary and the schema", () => {
  // In either language: a tag drawn inside an `svg` arrives prefixed.
  it("declares no tag that would be refused", () => {
    const declared = Object.keys(schema.elements);
    const { asked } = documented();
    for (const tag of declared) {
      dom().createElement(tag);
      dom().createElement(`svg:${tag}`);
    }
    assert.equal(asked.length, declared.length * 2);
  });

  it("declares no `script`", () => {
    assert.ok(!("script" in schema.elements));
  });
});
