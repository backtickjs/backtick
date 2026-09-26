import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
// A list whose members carry storage of their own: `build` declares a signal per
// row, and the signal the list reads holds those signals along with the rows.
// A press writes into one row's signal, so only what read it runs again —
// the array is the array it was, and no other row moves.
//
// What a signal starts at is the other half of this: the initial is a call
// here, not data, which is what a signal declared where it is evaluated allows.
async function MemberRows() {
  return cs.create(
    "1etovz890mmch:20:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><ul class=rows>`),\n  _tmpl$2 = /*#__PURE__*/_$template(`<li>`);\nexport default ($0, $1) => {\n  const build = from => {\n    return Array.from({\n      length: 3\n    }, (_, at) => {\n      return {\n        id: from + at,\n        label: $0()("row " + (from + at))\n      };\n    });\n  };\n  const held = $0()(build(1));\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild;\n    _$insert(_el$2, _$createComponent($1, {\n      get each() {\n        return held[0]();\n      },\n      children: row => (() => {\n        var _el$3 = _tmpl$2();\n        _el$3.$$click = () => row.label[1]("pressed");\n        _$insert(_el$3, () => row.label[0]());\n        return _el$3;\n      })()\n    }));\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
      map: '{"version":3,"mappings":";;;;;;eAmBY,CAAAA,EAAA,EAAAC,EAAA;EACR,MAAMC,KAAK,GAAIC,IAAY,IAAI;IAC7B,OAAOC,KAAK,CAACD,IAAI,CAAC;MAAEE,MAAM,EAAE;IAAC,CAAE,EAAE,CAACC,CAAC,EAAEC,EAAE,KAAI;MACzC,OAAO;QAAEC,EAAE,EAAEL,IAAI,GAAGI,EAAE;QAAEE,KAAK,EAAET,EAAA,EAAa,CAAC,MAAM,IAAIG,IAAI,GAAGI,EAAE,CAAC;MAAC,CAAE;IACtE,CAAC,CAAC;EACJ,CAAC;EAED,MAAMG,IAAI,GAAGV,EAAA,EAAa,CAACE,KAAK,CAAC,CAAC,CAAC,CAAC;EAEpC;IAAA,IAAAS,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;IAAAC,QAAA,CAAAF,KAAA,EAAAG,iBAAA,CAGOf,EAAG;MAAA,IAACgB,IAAIA,CAAA;QAAA,OAAEP,IAAI,CAAC,CAAC,CAAC,EAAE;MAAA;MAAAQ,QAAA,EAChBC,GAAQ;QAAA,IAAAC,KAAA,GAAAC,OAAA;QAAAD,KAAA,CAAAE,OAAA,GACK,MAAMH,GAAG,CAACV,KAAK,CAAC,CAAC,CAAC,CAAC,SAAS,CAAC;QAAAM,QAAA,CAAAK,KAAA,QACvCD,GAAG,CAACV,KAAK,CAAC,CAAC,CAAC,EAAE;QAAA,OAAAW,KAAA;MAAA;IAElB;IAAA,OAAAT,IAAA;EAAA;AAKX,CAAC;AAAAY,gBAAA","names":["$0","$1","build","from","Array","length","_","at","id","label","held","_el$","_tmpl$","_el$2","firstChild","_$insert","_$createComponent","each","children","row","_el$3","_tmpl$2","$$click","_$delegateEvents"],"ignoreList":[],"sources":["member-state.test.tsx"]}',
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
      exportAt: 349,
    },
  );
}
it("MemberRows", async (t) => {
  await snapshotCase(t, "MemberRows", _jsx(MemberRows, {}));
});
