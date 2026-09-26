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
            code: 'import { createComponent as _$createComponent } from "solid-js/web";\nexport default ($0, $1) => _$createComponent($0, {\n  get n() {\n    return $1[0]();\n  }\n});',
            map: '{"version":3,"mappings":";eAiBY,CAAAA,EAAA,EAAAC,EAAA,KAAAC,iBAAA,CAACF,EAAK;EAAA,IAACG,CAACA,CAAA;IAAA,OAAEF,EAAK,CAAC,CAAC,CAAC,EAAE;EAAA;AAAA,EAAI","names":["$0","$1","_$createComponent","n"],"ignoreList":[],"sources":["script-bound-tag-capture.test.tsx"]}',
            imports: [
              {
                from: "solid-js/web",
                range: [0, 68],
                bindings: [
                  { name: "createComponent", local: "_$createComponent" },
                ],
              },
            ],
            exportAt: 69,
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
                    code: 'import { createComponent as _$createComponent } from "solid-js/web";\nexport default ($0, $1) => _$createComponent($0, {\n  get n() {\n    return $1[0]() + 100;\n  }\n});',
                    map: '{"version":3,"mappings":";eAqBsB,CAAAA,EAAA,EAAAC,EAAA,KAAAC,iBAAA,CAACF,EAAK;EAAA,IAACG,CAACA,CAAA;IAAA,OAAEF,EAAK,CAAC,CAAC,CAAC,EAAE,GAAG,GAAG;EAAA;AAAA,EAAI","names":["$0","$1","_$createComponent","n"],"ignoreList":[],"sources":["script-bound-tag-capture.test.tsx"]}',
                    imports: [
                      {
                        from: "solid-js/web",
                        range: [0, 68],
                        bindings: [
                          {
                            name: "createComponent",
                            local: "_$createComponent",
                          },
                        ],
                      },
                    ],
                    exportAt: 69,
                  },
                ),
                bindings: [],
              },
              { kind: "capture", key: "Badge$2un2f82x2jr3i$1" },
              { kind: "capture", key: "count$2un2f82x2jr3i$0" },
            ],
          },
          {
            code: "export default ($0, $1, $2) => {\n  const skipped = 10;\n  return $0($1, $2);\n};",
            map: '{"version":3,"mappings":"eAmBa,CAAAA,EAAA,EAAAC,EAAA,EAAAC,EAAA;EACH,MAAMC,OAAO,GAAG,EAAE;EAClB,OAAOH,EAAA,CAAAC,EAAA,EAAAC,EAAA,CAAC;AACV,CAAC","names":["$0","$1","$2","skipped"],"ignoreList":[],"sources":["script-bound-tag-capture.test.tsx"]}',
            imports: [],
            exportAt: 0,
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
              code: 'import { createComponent as _$createComponent } from "solid-js/web";\nexport default ($0, $1) => _$createComponent($0, {\n  get n() {\n    return $1[0]() + 1000;\n  }\n});',
              map: '{"version":3,"mappings":";eAwBuB,CAAAA,EAAA,EAAAC,EAAA,KAAAC,iBAAA,CAACF,EAAK;EAAA,IAACG,CAACA,CAAA;IAAA,OAAEF,EAAK,CAAC,CAAC,CAAC,EAAE,GAAG,IAAI;EAAA;AAAA,EAAI","names":["$0","$1","_$createComponent","n"],"ignoreList":[],"sources":["script-bound-tag-capture.test.tsx"]}',
              imports: [
                {
                  from: "solid-js/web",
                  range: [0, 68],
                  bindings: [
                    { name: "createComponent", local: "_$createComponent" },
                  ],
                },
              ],
              exportAt: 69,
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
            code: 'import { createComponent as _$createComponent } from "solid-js/web";\nexport default ($0, $1, $2) => _$createComponent($0, {\n  each: [1, 2],\n  children: m => _$createComponent($1, {\n    get n() {\n      return m * $2[0]();\n    }\n  })\n});',
            map: '{"version":3,"mappings":";eA0Ba,CAAAA,EAAA,EAAAC,EAAA,EAAAC,EAAA,KAAAC,iBAAA,CAACH,EAAG;EAACI,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC;EAAAC,QAAA,EAClBC,CAAS,IAAAH,iBAAA,CAAMF,EAAK;IAAA,IAACM,CAACA,CAAA;MAAA,OAAED,CAAC,GAAGJ,EAAK,CAAC,CAAC,CAAC,EAAE;IAAA;EAAA;AAAI,EACxC","names":["$0","$1","$2","_$createComponent","each","children","m","n"],"ignoreList":[],"sources":["script-bound-tag-capture.test.tsx"]}',
            imports: [
              {
                from: "solid-js/web",
                range: [0, 68],
                bindings: [
                  { name: "createComponent", local: "_$createComponent" },
                ],
              },
            ],
            exportAt: 69,
          },
        ),
        bindings: ["count$2un2f82x2jr3i$0", "Badge$2un2f82x2jr3i$1"],
      },
    ],
  },
  {
    code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<b>`),\n  _tmpl$2 = /*#__PURE__*/_$template(`<div><button>more`);\nexport default ($0, $1, $2, $3, $4) => {\n  const count = $0()(0);\n  const Badge = props => (() => {\n    var _el$ = _tmpl$();\n    _$insert(_el$, () => "n " + props.n);\n    return _el$;\n  })();\n  return (() => {\n    var _el$2 = _tmpl$2(),\n      _el$3 = _el$2.firstChild;\n    _$insert(_el$2, () => $1(count, Badge), _el$3);\n    _$insert(_el$2, () => $2(count, Badge), _el$3);\n    _$insert(_el$2, () => $3(count, Badge), _el$3);\n    _$insert(_el$2, () => $4(count, Badge), _el$3);\n    _el$3.$$click = () => count[1](count[0]() + 1);\n    return _el$2;\n  })();\n};\n_$delegateEvents(["click"]);',
    map: '{"version":3,"mappings":";;;;;eAWiC,CAAAA,EAAA,EAAAC,EAAA,EAAAC,EAAA,EAAAC,EAAA,EAAAC,EAAA;EAC/B,MAAMC,KAAK,GAAGL,EAAA,EAAa,CAAC,CAAC,CAAC;EAC9B,MAAMM,KAAK,GAAIC,KAAoB;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,QAAA,CAAAF,IAAA,QAAS,IAAI,GAAGD,KAAK,CAACI,CAAC;IAAA,OAAAH,IAAA;EAAA,IAAK;EAE/D;IAAA,IAAAI,KAAA,GAAAC,OAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAG,UAAA;IAAAL,QAAA,CAAAE,KAAA,QAEKX,EAAA,CAAAI,KAAA,EAAAC,KAAA,CAA+B,EAAAQ,KAAA;IAAAJ,QAAA,CAAAE,KAAA,QAE9BV,EAAA,CAAAG,KAAA,EAAAC,KAAA,CAIF,EAAAQ,KAAA;IAAAJ,QAAA,CAAAE,KAAA,QACCT,EAAA,CAAAE,KAAA,EAAAC,KAAA,CAA6D,EAAAQ,KAAA;IAAAJ,QAAA,CAAAE,KAAA,QAE5DR,EAAA,CAAAC,KAAA,EAAAC,KAAA,CAGF,EAAAQ,KAAA;IAAAA,KAAA,CAAAE,OAAA,GACiB,MAAMX,KAAK,CAAC,CAAC,CAAC,CAACA,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;IAAA,OAAAO,KAAA;EAAA;AAGrD,CAAC;AAAAK,gBAAA","names":["$0","$1","$2","$3","$4","count","Badge","props","_el$","_tmpl$","_$insert","n","_el$2","_tmpl$2","_el$3","firstChild","$$click","_$delegateEvents"],"ignoreList":[],"sources":["script-bound-tag-capture.test.tsx"]}',
    imports: [
      {
        from: "solid-js/web",
        range: [0, 54],
        bindings: [{ name: "template", local: "_$template" }],
      },
      {
        from: "solid-js/web",
        range: [55, 121],
        bindings: [{ name: "delegateEvents", local: "_$delegateEvents" }],
      },
      {
        from: "solid-js/web",
        range: [122, 172],
        bindings: [{ name: "insert", local: "_$insert" }],
      },
    ],
    exportAt: 276,
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
