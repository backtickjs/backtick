import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { transform } from "@backtickjs/solid-js/transform";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A bundle evaluated among siblings. What it draws goes where the call stands,
// and nothing of its own does: the spans either side keep their order.
async function Other() {
  return cs.create(
    "az5543lq4fyi:10:9",
    { params: [] },
    {
      code: 'import { template as _$template } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<em>from another bundle`);\nexport default () => _tmpl$();',
      map: '{"version":3,"mappings":";;eASY,MAAAA,MAAA,EAAgC","names":["_tmpl$"],"ignoreList":[],"sources":["eval-siblings.test.tsx"]}',
      imports: [
        {
          from: "solid-js/web",
          range: [0, 54],
          bindings: [{ name: "template", local: "_$template" }],
        },
      ],
      exportAt: 120,
    },
  );
}
const otherBundle = await bundler.run(_jsx(Other, {}), { transform });
it("evalSiblings", async (t) => {
  await snapshotCase(
    t,
    "evalSiblings",
    cs.create(
      "az5543lq4fyi:19:4",
      { params: [{ kind: "splice", value: otherBundle, bindings: [] }] },
      {
        code: 'import { template as _$template } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><span>before</span><span>after`);\nexport default $0 => (() => {\n  var _el$ = _tmpl$(),\n    _el$2 = _el$.firstChild,\n    _el$3 = _el$2.nextSibling;\n  _$insert(_el$, () => eval($0()), _el$3);\n  return _el$;\n})();',
        map: '{"version":3,"mappings":";;;eAkBOA,EAAA;EAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;IAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;EAAAC,QAAA,CAAAN,IAAA,QAEAO,IAAI,CAACR,EAAA,EAAY,CAAC,EAAAK,KAAA;EAAA,OAAAJ,IAAA;AAAA,IAEf","names":["$0","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_$insert","eval"],"ignoreList":[],"sources":["eval-siblings.test.tsx"]}',
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
        exportAt: 183,
      },
    ),
  );
});
