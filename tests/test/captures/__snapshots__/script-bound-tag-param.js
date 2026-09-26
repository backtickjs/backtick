import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A tag naming a parameter of an arrow in the enclosing script. The nested
// scripts sit inside the arrow's body, so the parameter reaches them through
// the holes they fill rather than as a capture of the whole script.
it("scriptBoundTagParam", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagParam",
    cs.create(
      "3ehgcl2xwg3z1:13:4",
      {
        params: [
          {
            kind: "splice",
            value: cs.create(
              "3ehgcl2xwg3z1:16:13",
              { params: [{ kind: "capture", key: "Row$3ehgcl2xwg3z1$1" }] },
              {
                code: 'import { createComponent as _$createComponent } from "solid-js/web";\nexport default $0 => _$createComponent($0, {\n  n: 1\n});',
                map: '{"version":3,"mappings":";eAegBA,EAAA,IAAAC,iBAAA,CAACD,EAAG;EAACE,CAAC,EAAE;AAAC,EAAI","names":["$0","_$createComponent","n"],"ignoreList":[],"sources":["script-bound-tag-param.test.tsx"]}',
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
            bindings: ["Row$3ehgcl2xwg3z1$1"],
          },
          {
            kind: "splice",
            value: cs.create(
              "3ehgcl2xwg3z1:17:13",
              { params: [{ kind: "capture", key: "Row$3ehgcl2xwg3z1$1" }] },
              {
                code: 'import { createComponent as _$createComponent } from "solid-js/web";\nexport default $0 => _$createComponent($0, {\n  n: 2\n});',
                map: '{"version":3,"mappings":";eAgBgBA,EAAA,IAAAC,iBAAA,CAACD,EAAG;EAACE,CAAC,EAAE;AAAC,EAAI","names":["$0","_$createComponent","n"],"ignoreList":[],"sources":["script-bound-tag-param.test.tsx"]}',
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
            bindings: ["Row$3ehgcl2xwg3z1$1"],
          },
        ],
      },
      {
        code: 'import { template as _$template } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<ul>`),\n  _tmpl$2 = /*#__PURE__*/_$template(`<li>`);\nexport default ($0, $1) => {\n  const twice = Row => (() => {\n    var _el$ = _tmpl$();\n    _$insert(_el$, () => $0(Row), null);\n    _$insert(_el$, () => $1(Row), null);\n    return _el$;\n  })();\n  return twice(p => (() => {\n    var _el$2 = _tmpl$2();\n    _$insert(_el$2, () => "row " + p.n);\n    return _el$2;\n  })());\n};',
        map: '{"version":3,"mappings":";;;;eAYO,CAAAA,EAAA,EAAAC,EAAA;EACD,MAAMC,KAAK,GAAIC,GAA0C;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,QAAA,CAAAF,IAAA,QAEpDJ,EAAA,CAAAG,GAAA,CAAoB;IAAAG,QAAA,CAAAF,IAAA,QACpBH,EAAA,CAAAE,GAAA,CAAoB;IAAA,OAAAC,IAAA;EAAA,IAExB;EACD,OAAOF,KAAK,CAAEK,CAAgB;IAAA,IAAAC,KAAA,GAAAC,OAAA;IAAAH,QAAA,CAAAE,KAAA,QAAU,MAAM,GAAGD,CAAC,CAACG,CAAC;IAAA,OAAAF,KAAA;EAAA,IAAM,CAAC;AAC7D,CAAC","names":["$0","$1","twice","Row","_el$","_tmpl$","_$insert","p","_el$2","_tmpl$2","n"],"ignoreList":[],"sources":["script-bound-tag-param.test.tsx"]}',
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
        exportAt: 197,
      },
    ),
  );
});
