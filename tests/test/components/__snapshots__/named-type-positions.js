import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
async function Rows() {
  return cs.create(
    "3njqkp1magllx:19:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><span>add</span><div>`),\n  _tmpl$2 = /*#__PURE__*/_$template(`<span>`);\nexport default ($0, $1) => {\n  const rows = $0()([]);\n  const add = row => {\n    rows[1]([row]);\n  };\n  const label = row => {\n    return row.label;\n  };\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild,\n      _el$3 = _el$2.nextSibling;\n    _el$2.$$click = () => add({\n      id: 1,\n      label: "one"\n    });\n    _$insert(_el$3, _$createComponent($1, {\n      get each() {\n        return rows[0]();\n      },\n      children: row => (() => {\n        var _el$4 = _tmpl$2();\n        _$insert(_el$4, () => label(row));\n        return _el$4;\n      })()\n    }));\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
      map: '{"version":3,"mappings":";;;;;;eAkBY,CAAAA,EAAA,EAAAC,EAAA;EACR,MAAMC,IAAI,GAAGF,EAAA,EAAa,CAAQ,EAAE,CAAC;EACrC,MAAMG,GAAG,GAAIC,GAAQ,IAAI;IACvBF,IAAI,CAAC,CAAC,CAAC,CAAC,CAACE,GAAG,CAAC,CAAC;EAChB,CAAC;EACD,MAAMC,KAAK,GAAID,GAAQ,IAAI;IACzB,OAAOA,GAAG,CAACC,KAAK;EAClB,CAAC;EACD;IAAA,IAAAC,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;IAAAH,KAAA,CAAAI,OAAA,GAEmB,MAAMT,GAAG,CAAC;MAAEU,EAAE,EAAE,CAAC;MAAER,KAAK,EAAE;IAAK,CAAE,CAAC;IAAAS,QAAA,CAAAJ,KAAA,EAAAK,iBAAA,CAE9Cd,EAAG;MAAA,IAACe,IAAIA,CAAA;QAAA,OAAEd,IAAI,CAAC,CAAC,CAAC,EAAE;MAAA;MAAAe,QAAA,EAAIb,GAAQ;QAAA,IAAAc,KAAA,GAAAC,OAAA;QAAAL,QAAA,CAAAI,KAAA,QAAYb,KAAK,CAACD,GAAG,CAAC;QAAA,OAAAc,KAAA;MAAA;IAAQ;IAAA,OAAAZ,IAAA;EAAA;AAItE,CAAC;AAAAc,gBAAA","names":["$0","$1","rows","add","row","label","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","id","_$insert","_$createComponent","each","children","_el$4","_tmpl$2","_$delegateEvents"],"ignoreList":[],"sources":["named-type-positions.test.tsx"]}',
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
        {
          from: "solid-js/web",
          range: [173, 241],
          bindings: [{ name: "createComponent", local: "_$createComponent" }],
        },
      ],
      exportAt: 357,
    },
  );
}
it("Rows", async (t) => {
  await snapshotCase(t, "Rows", _jsx(Rows, {}));
});
