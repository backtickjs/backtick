import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
// An object with storage of its own, made by a client function: a signal holds
// what it is, arrows are what may be done to it, and the object hands them over
// together. Reading is a value, so it stands in a children position; writing is
// an action, so it stands in a handler.
const counter = cs.create(
  "21rbgxcosm7y3:10:16",
  { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
  {
    code: "export default $0 => initial => {\n  const count = $0()(initial);\n  return {\n    get: () => count[0](),\n    add: n => {\n      count[1](count[0]() + n);\n    }\n  };\n};",
    map: '{"version":3,"mappings":"eASmBA,EAAA,IAACC,OAAe,IAAI;EACrC,MAAMC,KAAK,GAAGF,EAAA,EAAa,CAACC,OAAO,CAAC;EACpC,OAAO;IACLE,GAAG,EAAEA,CAAA,KAAMD,KAAK,CAAC,CAAC,CAAC,EAAE;IACrBE,GAAG,EAAGC,CAAS,IAAI;MACjBH,KAAK,CAAC,CAAC,CAAC,CAACA,KAAK,CAAC,CAAC,CAAC,EAAE,GAAGG,CAAC,CAAC;IAC1B;GACD;AACH,CAAC","names":["$0","initial","count","get","add","n"],"ignoreList":[],"sources":["stateful-object.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
it("statefulObject", async (t) => {
  await snapshotCase(
    t,
    "statefulObject",
    cs.create(
      "21rbgxcosm7y3:24:4",
      { params: [{ kind: "splice", value: counter, bindings: [] }] },
      {
        code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<button>`);\nexport default $0 => {\n  const c = $0()(10);\n  return (() => {\n    var _el$ = _tmpl$();\n    _el$.$$click = () => {\n      c.add(5);\n    };\n    _$insert(_el$, () => c.get());\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
        map: '{"version":3,"mappings":";;;;eAuBOA,EAAA;EACD,MAAMC,CAAC,GAAGD,EAAA,EAAQ,CAAC,EAAE,CAAC;EACtB;IAAA,IAAAE,IAAA,GAAAC,MAAA;IAAAD,IAAA,CAAAE,OAAA,GAEa,MAAK;MACZH,CAAC,CAACI,GAAG,CAAC,CAAC,CAAC;IACV,CAAC;IAAAC,QAAA,CAAAJ,IAAA,QAEAD,CAAC,CAACM,GAAG,EAAE;IAAA,OAAAL,IAAA;EAAA;AAGd,CAAC;AAAAM,gBAAA","names":["$0","c","_el$","_tmpl$","$$click","add","_$insert","get","_$delegateEvents"],"ignoreList":[],"sources":["stateful-object.test.tsx"]}',
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
        exportAt: 223,
      },
    ),
  );
});
