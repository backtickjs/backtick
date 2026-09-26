import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A host component, and a binding of the same name an enclosing script holds.
// Scope decides: the nested script's `<Card>` is the captured function, and
// only the one outside every script binding it is the host's.
async function Card(props) {
  return _jsx("h2", { children: props.title });
}
// Instantiated twice with different labels, so the enclosing script is
// polymorphic and its nested script's captures arrive through a thunk.
function labelled(label) {
  return cs.create(
    "2mv5sg07ackia:16:9",
    {
      params: [
        { kind: "splice", value: label, bindings: [] },
        {
          kind: "splice",
          value: cs.create(
            "2mv5sg07ackia:18:17",
            { params: [{ kind: "capture", key: "Card$2mv5sg07ackia$0" }] },
            {
              code: 'import { createComponent as _$createComponent } from "solid-js/web";\nexport default $0 => _$createComponent($0, {\n  n: 1\n});',
              map: '{"version":3,"mappings":";eAiBoBA,EAAA,IAAAC,iBAAA,CAACD,EAAI;EAACE,CAAC,EAAE;AAAC,EAAI","names":["$0","_$createComponent","n"],"ignoreList":[],"sources":["script-bound-tag-capture-shadow.test.tsx"]}',
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
          bindings: ["Card$2mv5sg07ackia$0"],
        },
      ],
    },
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<i>`),\n  _tmpl$2 = /*#__PURE__*/_$template(`<p>`);\nexport default ($0, $1) => {\n  const Card = props => (() => {\n    var _el$ = _tmpl$();\n    _$insert(_el$, () => $0() + props.n);\n    return _el$;\n  })();\n  return (() => {\n    var _el$2 = _tmpl$2();\n    _$insert(_el$2, () => $1(Card));\n    return _el$2;\n  })();\n};',
      map: '{"version":3,"mappings":";;;;eAeY,CAAAA,EAAA,EAAAC,EAAA;EACR,MAAMC,IAAI,GAAIC,KAAoB;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,QAAA,CAAAF,IAAA,QAASJ,EAAA,EAAM,GAAGG,KAAK,CAACI,CAAC;IAAA,OAAAH,IAAA;EAAA,IAAK;EAChE;IAAA,IAAAI,KAAA,GAAAC,OAAA;IAAAH,QAAA,CAAAE,KAAA,QAAWP,EAAA,CAAAC,IAAA,CAAqB;IAAA,OAAAM,KAAA;EAAA;AAClC,CAAC","names":["$0","$1","Card","props","_el$","_tmpl$","_$insert","n","_el$2","_tmpl$2"],"ignoreList":[],"sources":["script-bound-tag-capture-shadow.test.tsx"]}',
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
      exportAt: 195,
    },
  );
}
it("scriptBoundTagCaptureShadow", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagCaptureShadow",
    cs.create(
      "2mv5sg07ackia:26:4",
      {
        params: [
          {
            kind: "splice",
            value: labelled(
              cs.create(
                "2mv5sg07ackia:28:18",
                { params: [] },
                {
                  code: 'export default () => "a";',
                  map: '{"version":3,"mappings":"eA2BqB,SAAG","names":[],"ignoreList":[],"sources":["script-bound-tag-capture-shadow.test.tsx"]}',
                  imports: [],
                  exportAt: 0,
                },
              ),
            ),
            bindings: [],
          },
          {
            kind: "splice",
            value: labelled(
              cs.create(
                "2mv5sg07ackia:29:18",
                { params: [] },
                {
                  code: 'export default () => "b";',
                  map: '{"version":3,"mappings":"eA4BqB,SAAG","names":[],"ignoreList":[],"sources":["script-bound-tag-capture-shadow.test.tsx"]}',
                  imports: [],
                  exportAt: 0,
                },
              ),
            ),
            bindings: [],
          },
          { kind: "tag", value: Card },
        ],
      },
      {
        code: 'import { template as _$template } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div>`);\nexport default ($0, $1, $2) => (() => {\n  var _el$ = _tmpl$();\n  _$insert(_el$, _$createComponent($2, {\n    title: "host"\n  }), null);\n  _$insert(_el$, $0, null);\n  _$insert(_el$, $1, null);\n  return _el$;\n})();',
        map: '{"version":3,"mappings":";;;;eAyBO,CAAAA,EAAA,EAAAC,EAAA,EAAAC,EAAA;EAAA,IAAAC,IAAA,GAAAC,MAAA;EAAAC,QAAA,CAAAF,IAAA,EAAAG,iBAAA,CACAJ,EAAI;IAACK,KAAK;EAAA;EAAAF,QAAA,CAAAF,IAAA,EACVH,EAAA;EAAAK,QAAA,CAAAF,IAAA,EACAF,EAAA;EAAA,OAAAE,IAAA;AAAA,IACG","names":["$0","$1","$2","_el$","_tmpl$","_$insert","_$createComponent","title"],"ignoreList":[],"sources":["script-bound-tag-capture-shadow.test.tsx"]}',
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
        exportAt: 222,
      },
    ),
  );
});
// Which tag names a function the script holds is the scope rule every name
// follows. Inside the arrow, `Card` is its parameter; outside it, the same
// name is the host's component, spliced as before.
it("scriptBoundTagScope", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagScope",
    cs.create(
      "2mv5sg07ackia:41:4",
      { params: [{ kind: "tag", value: Card }] },
      {
        code: 'import { template as _$template } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div>`),\n  _tmpl$2 = /*#__PURE__*/_$template(`<section>`),\n  _tmpl$3 = /*#__PURE__*/_$template(`<i>`);\nexport default $0 => {\n  const twice = Card => (() => {\n    var _el$ = _tmpl$();\n    _$insert(_el$, _$createComponent(Card, {\n      n: 1\n    }), null);\n    _$insert(_el$, _$createComponent(Card, {\n      n: 2\n    }), null);\n    return _el$;\n  })();\n  return (() => {\n    var _el$2 = _tmpl$2();\n    _$insert(_el$2, _$createComponent($0, {\n      title: "host"\n    }), null);\n    _$insert(_el$2, () => twice(props => (() => {\n      var _el$3 = _tmpl$3();\n      _$insert(_el$3, () => "row " + props.n);\n      return _el$3;\n    })()), null);\n    return _el$2;\n  })();\n};',
        map: '{"version":3,"mappings":";;;;;;eAwCOA,EAAA;EACD,MAAMC,KAAK,GAAIC,IAA+C;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,QAAA,CAAAF,IAAA,EAAAG,iBAAA,CAEzDJ,IAAI;MAACK,CAAC,EAAE;IAAC;IAAAF,QAAA,CAAAF,IAAA,EAAAG,iBAAA,CACTJ,IAAI;MAACK,CAAC,EAAE;IAAC;IAAA,OAAAJ,IAAA;EAAA,IAEb;EAED;IAAA,IAAAK,KAAA,GAAAC,OAAA;IAAAJ,QAAA,CAAAG,KAAA,EAAAF,iBAAA,CAEKN,EAAI;MAACU,KAAK;IAAA;IAAAL,QAAA,CAAAG,KAAA,QACVP,KAAK,CAAEU,KAAoB;MAAA,IAAAC,KAAA,GAAAC,OAAA;MAAAR,QAAA,CAAAO,KAAA,QACtB,MAAM,GAAGD,KAAK,CAACJ,CAAC;MAAA,OAAAK,KAAA;IAAA,IACrB,CAAC;IAAA,OAAAJ,KAAA;EAAA;AAGR,CAAC","names":["$0","twice","Card","_el$","_tmpl$","_$insert","_$createComponent","n","_el$2","_tmpl$2","title","props","_el$3","_tmpl$3"],"ignoreList":[],"sources":["script-bound-tag-capture-shadow.test.tsx"]}',
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
        exportAt: 316,
      },
    ),
  );
});
