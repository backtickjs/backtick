import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
// A signal holding an enum, handed to a function whose parameter is that enum.
//
// The member is spliced as itself and the signal holds `Color` rather than
// `Color.Red`, so the other member is a value it takes. What a splice hands
// over keeps the width the host gave it: `cs.splice` reads it back unbound, and
// the binding it lands in decides the width the way TypeScript decides every
// other one — a member to its enum, as a `let` would.
var Color;
(function (Color) {
  Color[(Color["Red"] = 0)] = "Red";
  Color[(Color["Blue"] = 1)] = "Blue";
})(Color || (Color = {}));
const colorName = cs.create(
  "133ie16u4j0dm:19:48",
  { params: [{ kind: "splice", value: Color.Blue, bindings: [] }] },
  {
    code: 'export default $0 => c => {\n  return c === $0() ? "blue" : "red";\n};',
    map: '{"version":3,"mappings":"eAkBmDA,EAAA,IAACC,CAAQ,IAAI;EAC9D,OAAOA,CAAC,KAAKD,EAAA,EAAC,GAAe,MAAM,GAAG,KAAK;AAC7C,CAAC","names":["$0","c"],"ignoreList":[],"sources":["state-enum.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
async function Swatch() {
  return cs.create(
    "133ie16u4j0dm:24:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "splice", value: Color.Red, bindings: [] },
        { kind: "splice", value: Color.Blue, bindings: [] },
        { kind: "splice", value: colorName, bindings: [] },
      ],
    },
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<span>`);\nexport default ($0, $1, $2, $3) => {\n  const held = $0()($1());\n  return (() => {\n    var _el$ = _tmpl$();\n    _el$.$$click = () => held[1]($2());\n    _$insert(_el$, () => $3()(held[0]()));\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
      map: '{"version":3,"mappings":";;;;eAuBY,CAAAA,EAAA,EAAAC,EAAA,EAAAC,EAAA,EAAAC,EAAA;EACR,MAAMC,IAAI,GAAGJ,EAAA,EAAa,CAACC,EAAA,EAAC,CAAY;EACxC;IAAA,IAAAI,IAAA,GAAAC,MAAA;IAAAD,IAAA,CAAAE,OAAA,GACiB,MAAMH,IAAI,CAAC,CAAC,CAAC,CAACF,EAAA,EAAC,CAAa;IAAAM,QAAA,CAAAH,IAAA,QACxCF,EAAA,EAAU,CAACC,IAAI,CAAC,CAAC,CAAC,EAAE,CAAC;IAAA,OAAAC,IAAA;EAAA;AAG5B,CAAC;AAAAI,gBAAA","names":["$0","$1","$2","$3","held","_el$","_tmpl$","$$click","_$insert","_$delegateEvents"],"ignoreList":[],"sources":["state-enum.test.tsx"]}',
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
      exportAt: 221,
    },
  );
}
it("Swatch", async (t) => {
  await snapshotCase(t, "Swatch", _jsx(Swatch, {}));
});
