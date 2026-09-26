import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { transform } from "@backtickjs/solid-js/transform";
import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
import { render } from "@backtickjs/solid-js/testing";
import { snapshotCase } from "../snapshotCase.ts";
// A bundle evaluated where a script stands, and used by its type: a drawing
// whose root is a list, placed as a child, and a number, added to.
async function Items() {
  return cs.create(
    "1jbjln2sp128k:13:9",
    { params: [{ kind: "tag", value: For }] },
    {
      code: 'export default ($0) => <$0 each={[1, 2, 3]}>\n    {(n) => <span>{"item " + n}</span>}\n  </$0>;',
      map: '{"version":3,"file":"eval.test.jsx","sourceRoot":"","sources":["eval.test.tsx"],"names":[],"mappings":"eAYY,QAAA,CAAC,EAAG,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,CAC7B;IAAA,CAAC,CAAC,CAAS,EAAE,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,OAAO,GAAG,CAAC,CAAC,EAAE,IAAI,CAAC,CAC5C;EAAA,EAAE,EAAG,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
}
const items = await bundler.run(_jsx(Items, {}), { transform });
const total = await bundler.run(41, { transform });
const evaluated = cs.create(
  "1jbjln2sp128k:21:18",
  {
    params: [
      { kind: "splice", value: items, bindings: [] },
      { kind: "splice", value: total, bindings: [] },
    ],
  },
  {
    code: "export default ($0, $1) => <div>\n  {eval($0())}\n  <b>{eval($1()) + 1}</b>\n</div>;",
    map: '{"version":3,"file":"eval.test.jsx","sourceRoot":"","sources":["eval.test.tsx"],"names":[],"mappings":"eAoBqB,YAAA,CAAC,GAAG,CACvB;EAAA,CAAC,IAAI,CAAC,IAAM,CAAC,CACb;EAAA,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,IAAM,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAC1B;AAAA,EAAE,GAAG,CAAC"}',
    imports: [],
    exportAt: 0,
  },
);
it("eval", async (t) => {
  await snapshotCase(t, "eval", evaluated);
});
describe("a bundle a script runs with eval", () => {
  it("draws one whose root is a <For />, and answers one that is a value", async () => {
    const { container } = await render(evaluated);
    const div = container.firstElementChild;
    assert.deepEqual(
      [...div.childNodes].map((child) => child.textContent),
      ["item 1", "item 2", "item 3", "42"],
    );
  });
});
