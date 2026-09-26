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
      code: 'import { template as _$template } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<span>`);\nexport default $0 => _$createComponent($0, {\n  each: [1, 2, 3],\n  children: n => (() => {\n    var _el$ = _tmpl$();\n    _$insert(_el$, "item " + n);\n    return _el$;\n  })()\n});',
      map: '{"version":3,"mappings":";;;;eAYYA,EAAA,IAAAC,iBAAA,CAACD,EAAG;EAACE,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC;EAAAC,QAAA,EAC1BC,CAAS;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,QAAA,CAAAF,IAAA,EAAY,OAAO,GAAGD,CAAC;IAAA,OAAAC,IAAA;EAAA;AAAQ,EACtC","names":["$0","_$createComponent","each","children","n","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["eval.test.tsx"]}',
      imports: [
        {
          from: "solid-js/web",
          range: [0, 54],
          bindings: [{ name: "template", local: "_$template" }],
        },
        {
          from: "solid-js/web",
          range: [55, 105],
          bindings: [{ name: "insert", local: "_$insert" }],
        },
        {
          from: "solid-js/web",
          range: [106, 174],
          bindings: [{ name: "createComponent", local: "_$createComponent" }],
        },
      ],
      exportAt: 223,
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
    code: 'import { template as _$template } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><b>`);\nexport default ($0, $1) => (() => {\n  var _el$ = _tmpl$(),\n    _el$2 = _el$.firstChild;\n  _$insert(_el$, () => eval($0()), _el$2);\n  _$insert(_el$2, () => eval($1()) + 1);\n  return _el$;\n})();',
    map: '{"version":3,"mappings":";;;eAoBqB,CAAAA,EAAA,EAAAC,EAAA;EAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;EAAAC,QAAA,CAAAJ,IAAA,QAClBK,IAAI,CAACP,EAAA,EAAM,CAAC,EAAAI,KAAA;EAAAE,QAAA,CAAAF,KAAA,QACTG,IAAI,CAACN,EAAA,EAAM,CAAC,GAAG,CAAC;EAAA,OAAAC,IAAA;AAAA,IAChB","names":["$0","$1","_el$","_tmpl$","_el$2","firstChild","_$insert","eval"],"ignoreList":[],"sources":["eval.test.tsx"]}',
    imports: [
      {
        from: "solid-js/web",
        range: [0, 54],
        bindings: [{ name: "template", local: "_$template" }],
      },
      {
        from: "solid-js/web",
        range: [55, 105],
        bindings: [{ name: "insert", local: "_$insert" }],
      },
    ],
    exportAt: 156,
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
