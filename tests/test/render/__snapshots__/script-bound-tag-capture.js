import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// A tag naming a function an enclosing script holds. The nested script captures
// it the way it captures any binding, and calls it as a component: once, with
// its props read on access.
const scriptBoundTagCapture = cs.create(
  "2un2f82x2jr3i:12:30",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      {
        kind: "splice",
        value: cs.create(
          "2un2f82x2jr3i:18:9",
          {
            params: [
              { kind: "capture", key: "Badge$2un2f82x2jr3i$1" },
              { kind: "capture", key: "count$2un2f82x2jr3i$0" },
            ],
          },
          {
            code: "export default ($0, $1) => <$0 n={$1[0]()}/>;",
            map: '{"version":3,"file":"script-bound-tag-capture.test.jsx","sourceRoot":"","sources":["script-bound-tag-capture.test.tsx"],"names":[],"mappings":"eAiBY,YAAA,CAAC,EAAK,CAAC,CAAC,CAAC,CAAC,EAAK,CAAC,CAAC,CAAC,EAAE,CAAC,EAAG"}',
          },
        ),
        bindings: ["count$2un2f82x2jr3i$0", "Badge$2un2f82x2jr3i$1"],
      },
      {
        kind: "splice",
        value: cs.create(
          "2un2f82x2jr3i:20:10",
          {
            params: [
              {
                kind: "splice",
                value: cs.create(
                  "2un2f82x2jr3i:22:19",
                  {
                    params: [
                      { kind: "capture", key: "Badge$2un2f82x2jr3i$1" },
                      { kind: "capture", key: "count$2un2f82x2jr3i$0" },
                    ],
                  },
                  {
                    code: "export default ($0, $1) => <$0 n={$1[0]() + 100}/>;",
                    map: '{"version":3,"file":"script-bound-tag-capture.test.jsx","sourceRoot":"","sources":["script-bound-tag-capture.test.tsx"],"names":[],"mappings":"eAqBsB,YAAA,CAAC,EAAK,CAAC,CAAC,CAAC,CAAC,EAAK,CAAC,CAAC,CAAC,EAAE,GAAG,GAAG,CAAC,EAAG"}',
                  },
                ),
                bindings: [],
              },
              { kind: "capture", key: "Badge$2un2f82x2jr3i$1" },
              { kind: "capture", key: "count$2un2f82x2jr3i$0" },
            ],
          },
          {
            code: "export default ($0, $1, $2) => {\n    const skipped = 10;\n    return $0($1, $2);\n};",
            map: '{"version":3,"file":"script-bound-tag-capture.test.jsx","sourceRoot":"","sources":["script-bound-tag-capture.test.tsx"],"names":[],"mappings":"eAmBa;IACH,MAAM,OAAO,GAAG,EAAE,CAAC;IACnB,OAAO,UAAC,CAAqC;AAC/C,CAAC"}',
          },
        ),
        bindings: ["count$2un2f82x2jr3i$0", "Badge$2un2f82x2jr3i$1"],
      },
      {
        kind: "splice",
        value: _jsx("section", {
          children: cs.create(
            "2un2f82x2jr3i:25:20",
            {
              params: [
                { kind: "capture", key: "Badge$2un2f82x2jr3i$1" },
                { kind: "capture", key: "count$2un2f82x2jr3i$0" },
              ],
            },
            {
              code: "export default ($0, $1) => <$0 n={$1[0]() + 1000}/>;",
              map: '{"version":3,"file":"script-bound-tag-capture.test.jsx","sourceRoot":"","sources":["script-bound-tag-capture.test.tsx"],"names":[],"mappings":"eAwBuB,YAAA,CAAC,EAAK,CAAC,CAAC,CAAC,CAAC,EAAK,CAAC,CAAC,CAAC,EAAE,GAAG,IAAI,CAAC,EAAG"}',
            },
          ),
        }),
        bindings: ["count$2un2f82x2jr3i$0", "Badge$2un2f82x2jr3i$1"],
      },
      {
        kind: "splice",
        value: cs.create(
          "2un2f82x2jr3i:27:10",
          {
            params: [
              { kind: "tag", value: For },
              { kind: "capture", key: "Badge$2un2f82x2jr3i$1" },
              { kind: "capture", key: "count$2un2f82x2jr3i$0" },
            ],
          },
          {
            code: "export default ($0, $1, $2) => <$0 each={[1, 2]}>\n          {(m) => <$1 n={m * $2[0]()}/>}\n        </$0>;",
            map: '{"version":3,"file":"script-bound-tag-capture.test.jsx","sourceRoot":"","sources":["script-bound-tag-capture.test.tsx"],"names":[],"mappings":"eA0Ba,gBAAA,CAAC,EAAG,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CACrB;UAAA,CAAC,CAAC,CAAS,EAAE,EAAE,CAAC,CAAC,EAAK,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,EAAK,CAAC,CAAC,CAAC,EAAE,CAAC,EAAG,CAC9C;QAAA,EAAE,EAAG,CAAC"}',
          },
        ),
        bindings: ["count$2un2f82x2jr3i$0", "Badge$2un2f82x2jr3i$1"],
      },
    ],
  },
  {
    code: 'export default ($0, $1, $2, $3, $4) => {\n    const count = $0()(0);\n    const Badge = (props) => <b>{"n " + props.n}</b>;\n    return (<div>\n      {$1(count, Badge)}\n      {$2(count, Badge)}\n      {$3(count, Badge)}\n      {$4(count, Badge)}\n      <button onclick={() => count[1](count[0]() + 1)}>more</button>\n    </div>);\n};',
    map: '{"version":3,"file":"script-bound-tag-capture.test.jsx","sourceRoot":"","sources":["script-bound-tag-capture.test.tsx"],"names":[],"mappings":"eAWiC;IAC/B,MAAM,KAAK,GAAG,IAAa,CAAC,CAAC,CAAC,CAAC;IAC/B,MAAM,KAAK,GAAG,CAAC,KAAoB,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;IAEhE,OAAO,CACL,CAAC,GAAG,CACF;MAAA,CAAC,gBAA+B,CAChC;MAAA,CACE,gBAIF,CACA;MAAA,CAAC,gBAA6D,CAC9D;MAAA,CACE,gBAGF,CACA;MAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,IAAI,EAAE,MAAM,CAC/D;IAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
  },
);
it("scriptBoundTagCapture", async (t) => {
  await snapshotCase(t, "scriptBoundTagCapture", scriptBoundTagCapture);
});
describe("a tag naming a function the script holds", () => {
  it("calls one an enclosing script holds, however the call is nested", async () => {
    const { container } = await render(scriptBoundTagCapture);
    const badges = () => [...container.querySelectorAll("b")];
    const before = badges();
    const texts = () => badges().map((b) => b.textContent);
    assert.deepEqual(texts(), ["n 0", "n 100", "n 1000", "n 0", "n 0"]);
    await userEvent.click(screen.getByRole("button", { name: "more" }));
    assert.deepEqual(texts(), ["n 1", "n 101", "n 1001", "n 1", "n 2"]);
    assert.deepEqual(badges(), before, "the same <b>s");
  });
});
