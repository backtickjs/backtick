import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { transform } from "@backtickjs/solid-js/transform";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A bundle whose value is a function: evaluated, then called like any other.
// One answers a string; the other a drawing, handed its props as a value.
const greet = await bundler.run(
  cs.create(
    "6whsjakbge6h:9:32",
    { params: [] },
    {
      code: 'export default () => name => "hello " + name;',
      map: '{"version":3,"mappings":"eAQmC,MAACA,IAAY,IAAK,QAAQ,GAAGA,IAAI","names":["name"],"ignoreList":[],"sources":["eval-function.test.tsx"]}',
      imports: [],
      exportAt: 0,
    },
  ),
  {
    transform,
  },
);
const badge = await bundler.run(
  cs.create(
    "6whsjakbge6h:14:2",
    { params: [] },
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<b>`);\nexport default () => props => (() => {\n  var _el$ = _tmpl$();\n  _$insert(_el$, () => "count " + props.count);\n  return _el$;\n})();',
      map: '{"version":3,"mappings":";;;eAaK,MAACA,KAAwB;EAAA,IAAAC,IAAA,GAAAC,MAAA;EAAAC,QAAA,CAAAF,IAAA,QAAS,QAAQ,GAAGD,KAAK,CAACI,KAAK;EAAA,OAAAH,IAAA;AAAA,IAAK","names":["props","_el$","_tmpl$","_$insert","count"],"ignoreList":[],"sources":["eval-function.test.tsx"]}',
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
      exportAt: 151,
    },
  ),
  { transform },
);
it("evalFunction", async (t) => {
  await snapshotCase(
    t,
    "evalFunction",
    cs.create(
      "6whsjakbge6h:22:4",
      {
        params: [
          { kind: "splice", value: greet, bindings: [] },
          { kind: "splice", value: badge, bindings: [] },
        ],
      },
      {
        code: 'import { template as _$template } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><span>`);\nexport default ($0, $1) => (() => {\n  var _el$ = _tmpl$(),\n    _el$2 = _el$.firstChild;\n  _$insert(_el$2, () => eval($0())("ada"));\n  _$insert(_el$, () => eval($1())({\n    count: 3\n  }), null);\n  return _el$;\n})();',
        map: '{"version":3,"mappings":";;;eAqBO,CAAAA,EAAA,EAAAC,EAAA;EAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;EAAAC,QAAA,CAAAF,KAAA,QACMG,IAAI,CAACP,EAAA,EAAM,CAAC,CAAC,KAAK,CAAC;EAAAM,QAAA,CAAAJ,IAAA,QACzBK,IAAI,CAACN,EAAA,EAAM,CAAC,CAAC;IAAEO,KAAK,EAAE;EAAC,CAAE,CAAC;EAAA,OAAAN,IAAA;AAAA,IACvB","names":["$0","$1","_el$","_tmpl$","_el$2","firstChild","_$insert","eval","count"],"ignoreList":[],"sources":["eval-function.test.tsx"]}',
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
        exportAt: 159,
      },
    ),
  );
});
