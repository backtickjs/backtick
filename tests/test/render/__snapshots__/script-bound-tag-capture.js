import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { draw } from "@backtickjs/solid-js/testing";
// A tag naming a function an enclosing script holds. The nested script captures
// it the way it captures any binding, and calls it as a component: once, with
// its props read on access.
const scriptBoundTagCapture = cs.create(
  "2hvgs7ncwokla:13:30",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      {
        kind: "splice",
        value: cs.create(
          "2hvgs7ncwokla:19:9",
          {
            params: [
              { kind: "capture", key: "Badge$2hvgs7ncwokla$1" },
              { kind: "capture", key: "count$2hvgs7ncwokla$0" },
            ],
          },
          "($capture0, $capture1) => <$capture0 n={$capture1[0]()}/>",
          '{"version":3,"file":"script-bound-tag-capture.test.jsx","sourceRoot":"","sources":["render/script-bound-tag-capture.test.tsx"],"names":[],"mappings":"AAkBY,0BAAA,CAAC,SAAK,CAAC,CAAC,CAAC,CAAC,SAAK,CAAC,CAAC,CAAC,EAAE,CAAC,EAAG"}',
        ),
        bindings: ["count$2hvgs7ncwokla$0", "Badge$2hvgs7ncwokla$1"],
      },
      {
        kind: "splice",
        value: cs.create(
          "2hvgs7ncwokla:21:10",
          {
            params: [
              {
                kind: "splice",
                value: cs.create(
                  "2hvgs7ncwokla:23:19",
                  {
                    params: [
                      { kind: "capture", key: "Badge$2hvgs7ncwokla$1" },
                      { kind: "capture", key: "count$2hvgs7ncwokla$0" },
                    ],
                  },
                  "($capture0, $capture1) => <$capture0 n={$capture1[0]() + 100}/>",
                  '{"version":3,"file":"script-bound-tag-capture.test.jsx","sourceRoot":"","sources":["render/script-bound-tag-capture.test.tsx"],"names":[],"mappings":"AAsBsB,0BAAA,CAAC,SAAK,CAAC,CAAC,CAAC,CAAC,SAAK,CAAC,CAAC,CAAC,EAAE,GAAG,GAAG,CAAC,EAAG"}',
                ),
                bindings: [],
              },
              { kind: "capture", key: "Badge$2hvgs7ncwokla$1" },
              { kind: "capture", key: "count$2hvgs7ncwokla$0" },
            ],
          },
          "($splice0, $capture1, $capture2) => {\n    const skipped = 10;\n    return $splice0($capture1, $capture2);\n}",
          '{"version":3,"file":"script-bound-tag-capture.test.jsx","sourceRoot":"","sources":["render/script-bound-tag-capture.test.tsx"],"names":[],"mappings":"AAoBa;IACH,MAAM,OAAO,GAAG,EAAE,CAAC;IACnB,OAAO,8BAAC,CAAqC;AAC/C,CAAC"}',
        ),
        bindings: ["count$2hvgs7ncwokla$0", "Badge$2hvgs7ncwokla$1"],
      },
      {
        kind: "splice",
        value: _jsx("section", {
          children: cs.create(
            "2hvgs7ncwokla:26:20",
            {
              params: [
                { kind: "capture", key: "Badge$2hvgs7ncwokla$1" },
                { kind: "capture", key: "count$2hvgs7ncwokla$0" },
              ],
            },
            "($capture0, $capture1) => <$capture0 n={$capture1[0]() + 1000}/>",
            '{"version":3,"file":"script-bound-tag-capture.test.jsx","sourceRoot":"","sources":["render/script-bound-tag-capture.test.tsx"],"names":[],"mappings":"AAyBuB,0BAAA,CAAC,SAAK,CAAC,CAAC,CAAC,CAAC,SAAK,CAAC,CAAC,CAAC,EAAE,GAAG,IAAI,CAAC,EAAG"}',
          ),
        }),
        bindings: ["count$2hvgs7ncwokla$0", "Badge$2hvgs7ncwokla$1"],
      },
      {
        kind: "splice",
        value: cs.create(
          "2hvgs7ncwokla:28:10",
          {
            params: [
              { kind: "tag", value: For },
              { kind: "capture", key: "Badge$2hvgs7ncwokla$1" },
              { kind: "capture", key: "count$2hvgs7ncwokla$0" },
            ],
          },
          "($tag0, $capture1, $capture2) => <$tag0 each={[1, 2]}>\n          {(m) => <$capture1 n={m * $capture2[0]()}/>}\n        </$tag0>",
          '{"version":3,"file":"script-bound-tag-capture.test.jsx","sourceRoot":"","sources":["render/script-bound-tag-capture.test.tsx"],"names":[],"mappings":"AA2Ba,iCAAA,CAAC,KAAG,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CACrB;UAAA,CAAC,CAAC,CAAS,EAAE,EAAE,CAAC,CAAC,SAAK,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,SAAK,CAAC,CAAC,CAAC,EAAE,CAAC,EAAG,CAC9C;QAAA,EAAE,KAAG,CAAC"}',
        ),
        bindings: ["count$2hvgs7ncwokla$0", "Badge$2hvgs7ncwokla$1"],
      },
    ],
  },
  '($splice0, $splice1, $splice2, $splice3, $splice4) => {\n    const count = $splice0()(0);\n    const Badge = (props) => <b>{"n " + props.n}</b>;\n    return (<div>\n      {$splice1(count, Badge)}\n      {$splice2(count, Badge)}\n      {$splice3(count, Badge)}\n      {$splice4(count, Badge)}\n      <button onclick={() => count[1](count[0]() + 1)}>more</button>\n    </div>);\n}',
  '{"version":3,"file":"script-bound-tag-capture.test.jsx","sourceRoot":"","sources":["render/script-bound-tag-capture.test.tsx"],"names":[],"mappings":"AAYiC;IAC/B,MAAM,KAAK,GAAG,UAAa,CAAC,CAAC,CAAC,CAAC;IAC/B,MAAM,KAAK,GAAG,CAAC,KAAoB,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;IAEhE,OAAO,CACL,CAAC,GAAG,CACF;MAAA,CAAC,sBAA+B,CAChC;MAAA,CACE,sBAIF,CACA;MAAA,CAAC,sBAA6D,CAC9D;MAAA,CACE,sBAGF,CACA;MAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,IAAI,EAAE,MAAM,CAC/D;IAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
);
it("scriptBoundTagCapture", async (t) => {
  await snapshotCase(t, "scriptBoundTagCapture", scriptBoundTagCapture);
});
describe("a tag naming a function the script holds", () => {
  it("calls one an enclosing script holds, however the call is nested", async () => {
    const { container } = render(await draw(scriptBoundTagCapture));
    const badges = () => [...container.querySelectorAll("b")];
    const before = badges();
    const texts = () => badges().map((b) => b.textContent);
    assert.deepEqual(texts(), ["n 0", "n 100", "n 1000", "n 0", "n 0"]);
    await userEvent.click(screen.getByRole("button", { name: "more" }));
    assert.deepEqual(texts(), ["n 1", "n 101", "n 1001", "n 1", "n 2"]);
    assert.deepEqual(badges(), before, "the same <b>s");
  });
});
