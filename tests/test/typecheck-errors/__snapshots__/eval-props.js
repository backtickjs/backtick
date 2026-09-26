import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { bundler } from "@backtickjs/bundler";
import { transform } from "@backtickjs/solid-js/transform";
import { cs } from "@backtickjs/core";
// Built rather than written out: what a bundle looks like is the bundler's, and
// a fixture that spelled one would pin the format twice. The claim about what
// each takes is still written, because that is what is under test.
async function Row({ count }) {
  return cs.create(
    "1zsasunacegt:15:9",
    { params: [{ kind: "splice", value: count, bindings: [] }] },
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<em>`);\nexport default $0 => (() => {\n  var _el$ = _tmpl$();\n  _$insert(_el$, () => "rows " + $0());\n  return _el$;\n})();',
      map: '{"version":3,"mappings":";;;eAcYA,EAAA;EAAA,IAAAC,IAAA,GAAAC,MAAA;EAAAC,QAAA,CAAAF,IAAA,QAAK,OAAO,GAAGD,EAAA,EAAM;EAAA,OAAAC,IAAA;AAAA,IAAM","names":["$0","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["eval-props.test.tsx"]}',
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
      exportAt: 152,
    },
  );
}
async function Nothing() {
  return cs.create(
    "1zsasunacegt:19:9",
    { params: [] },
    {
      code: 'import { template as _$template } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<em>nothing to hand it`);\nexport default () => _tmpl$();',
      map: '{"version":3,"mappings":";;eAkBY,MAAAA,MAAA,EAA+B","names":["_tmpl$"],"ignoreList":[],"sources":["eval-props.test.tsx"]}',
      imports: [
        {
          from: "solid-js/web",
          range: [0, 54],
          bindings: [{ name: "template", local: "_$template" }],
        },
      ],
      exportAt: 119,
    },
  );
}
const rows = await bundler.run(
  cs.create(
    "1zsasunacegt:23:2",
    {
      params: [
        {
          kind: "splice",
          value: _jsx(Row, {
            count: cs.create(
              "1zsasunacegt:23:50",
              { params: [{ kind: "capture", key: "props$1zsasunacegt$0" }] },
              {
                code: "export default $0 => $0.count;",
                map: '{"version":3,"mappings":"eAsBqDA,EAAA,IAAAA,EAAK,CAACC,KAAK","names":["$0","count"],"ignoreList":[],"sources":["eval-props.test.tsx"]}',
                imports: [],
                exportAt: 0,
              },
            ),
          }),
          bindings: ["props$1zsasunacegt$0"],
        },
      ],
    },
    {
      code: "export default $0 => props => $0(props);",
      map: '{"version":3,"mappings":"eAsBKA,EAAA,IAACC,KAAwB,IAAKD,EAAA,CAAAC,KAAA,CAAC","names":["$0","props"],"ignoreList":[],"sources":["eval-props.test.tsx"]}',
      imports: [],
      exportAt: 0,
    },
  ),
  { transform },
);
const empty = await bundler.run(_jsx(Nothing, {}), {
  transform,
});
export default cs.create(
  "1zsasunacegt:31:15",
  {
    params: [
      { kind: "splice", value: rows, bindings: [] },
      { kind: "splice", value: empty, bindings: [] },
    ],
  },
  {
    code: 'import { template as _$template } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div>`);\nexport default ($0, $1) => {\n  const Rows = eval($0());\n  const Empty = eval($1());\n  const wrongType = _$createComponent(Rows, {\n    count: "one"\n  });\n  const unknownName = _$createComponent(Rows, {\n    nope: 1\n  });\n  const missing = _$createComponent(Rows, {});\n  const called = _$createComponent(Empty, {\n    count: 1\n  });\n  return (() => {\n    var _el$ = _tmpl$();\n    _$insert(_el$, _$createComponent(Rows, {\n      count: 1\n    }), null);\n    _$insert(_el$, Empty, null);\n    _$insert(_el$, wrongType, null);\n    _$insert(_el$, unknownName, null);\n    _$insert(_el$, missing, null);\n    _$insert(_el$, called, null);\n    _$insert(_el$, () => eval(null), null);\n    return _el$;\n  })();\n};',
    map: '{"version":3,"mappings":";;;;eA8BkB,CAAAA,EAAA,EAAAC,EAAA;EAChB,MAAMC,IAAI,GAAGC,IAAI,CAACH,EAAA,EAAK,CAAC;EACxB,MAAMI,KAAK,GAAGD,IAAI,CAACF,EAAA,EAAM,CAAC;EAI1B,MAAMI,SAAS,GAAAC,iBAAA,CAAIJ,IAAI;IAACK,KAAK,EAAE;EAAK,EAAI;EAExC,MAAMC,WAAW,GAAAF,iBAAA,CAAIJ,IAAI;IAACO,IAAI,EAAE;EAAC,EAAI;EAErC,MAAMC,OAAO,GAAAJ,iBAAA,CAAIJ,IAAI,KAAG;EAIxB,MAAMS,MAAM,GAAAL,iBAAA,CAAIF,KAAK;IAACG,KAAK,EAAE;EAAC,EAAI;EAElC;IAAA,IAAAK,IAAA,GAAAC,MAAA;IAAAC,QAAA,CAAAF,IAAA,EAAAN,iBAAA,CAGKJ,IAAI;MAACK,KAAK,EAAE;IAAC;IAAAO,QAAA,CAAAF,IAAA,EACbR,KAAK;IAAAU,QAAA,CAAAF,IAAA,EACLP,SAAS;IAAAS,QAAA,CAAAF,IAAA,EACTJ,WAAW;IAAAM,QAAA,CAAAF,IAAA,EACXF,OAAO;IAAAI,QAAA,CAAAF,IAAA,EACPD,MAAM;IAAAG,QAAA,CAAAF,IAAA,QAILT,IAAI,CAAC,IAAI,CACX;IAAA,OAAAS,IAAA;EAAA;AAGN,CAAC","names":["$0","$1","Rows","eval","Empty","wrongType","_$createComponent","count","unknownName","nope","missing","called","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["eval-props.test.tsx"]}',
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
);
