import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
// What a signal holds is the initial widened, so a second value of the same
// kind goes in after it. Each write is the assertion — every one is an error
// the moment `$createSignal` reads its initial narrowly.
//
// A function is the one initial that does not widen on its own: what an arrow
// answers with widens only against a contextual type. Written out, the type
// argument is the contextual type — `$createSignal<() => number>` holds a
// function answering with any number rather than only the one it was built
// from. Solid's setter calls a function it is handed, so storing one wraps it.
//
// `Stepper` covers a number, and `Swatch` a numeric enum handed to a function
// typed as it.
var Tone;
(function (Tone) {
  Tone["Warm"] = "warm";
  Tone["Cool"] = "cool";
})(Tone || (Tone = {}));
async function Widened() {
  return cs.create(
    "2y9ue12ubdzr3:24:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "splice", value: Tone.Warm, bindings: [] },
        { kind: "splice", value: Tone.Cool, bindings: [] },
      ],
    },
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<span>`);\nexport default ($0, $1, $2) => {\n  const flag = $0()(true);\n  const tone = $0()($1());\n  const step = $0()(() => 0);\n  return (() => {\n    var _el$ = _tmpl$();\n    _el$.$$click = () => {\n      flag[1](false);\n      tone[1]($2());\n      step[1](() => () => 1);\n    };\n    _$insert(_el$, () => flag[0]() + " " + tone[0]() + " " + step[0]()());\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
      map: '{"version":3,"mappings":";;;;eAuBY,CAAAA,EAAA,EAAAC,EAAA,EAAAC,EAAA;EACR,MAAMC,IAAI,GAAGH,EAAA,EAAa,CAAC,IAAI,CAAC;EAChC,MAAMI,IAAI,GAAGJ,EAAA,EAAa,CAACC,EAAA,EAAC,CAAY;EACxC,MAAMI,IAAI,GAAGL,EAAA,EAAa,CAAe,MAAM,CAAC,CAAC;EACjD;IAAA,IAAAM,IAAA,GAAAC,MAAA;IAAAD,IAAA,CAAAE,OAAA,GAEa,MAAK;MACZL,IAAI,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC;MACdC,IAAI,CAAC,CAAC,CAAC,CAACF,EAAA,EAAC,CAAY;MACrBG,IAAI,CAAC,CAAC,CAAC,CAAC,MAAM,MAAM,CAAC,CAAC;IACxB,CAAC;IAAAI,QAAA,CAAAH,IAAA,QAEAH,IAAI,CAAC,CAAC,CAAC,EAAE,GAAG,GAAG,GAAGC,IAAI,CAAC,CAAC,CAAC,EAAE,GAAG,GAAG,GAAGC,IAAI,CAAC,CAAC,CAAC,EAAE,EAAE;IAAA,OAAAC,IAAA;EAAA;AAGtD,CAAC;AAAAI,gBAAA","names":["$0","$1","$2","flag","tone","step","_el$","_tmpl$","$$click","_$insert","_$delegateEvents"],"ignoreList":[],"sources":["state-widening.test.tsx"]}',
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
it("Widened", async (t) => {
  await snapshotCase(t, "Widened", _jsx(Widened, {}));
});
