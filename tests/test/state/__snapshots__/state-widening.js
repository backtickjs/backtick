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
    '($0, $1, $2) => {\n    const flag = $0()(true);\n    const tone = $0()($1());\n    const step = $0()(() => 0);\n    return (<span onclick={() => {\n            flag[1](false);\n            tone[1]($2());\n            step[1](() => () => 1);\n        }}>\n        {flag[0]() + " " + tone[0]() + " " + step[0]()()}\n      </span>);\n}',
    '{"version":3,"file":"state-widening.test.jsx","sourceRoot":"","sources":["state/state-widening.test.tsx"],"names":[],"mappings":"AAuBY;IACR,MAAM,IAAI,GAAG,IAAa,CAAC,IAAI,CAAC,CAAC;IACjC,MAAM,IAAI,GAAG,IAAa,CAAC,IAAC,CAAY,CAAC;IACzC,MAAM,IAAI,GAAG,IAAa,CAAe,GAAG,EAAE,CAAC,CAAC,CAAC,CAAC;IAClD,OAAO,CACL,CAAC,IAAI,CACH,OAAO,CAAC,CAAC,GAAG,EAAE;YACZ,IAAI,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC;YACf,IAAI,CAAC,CAAC,CAAC,CAAC,IAAC,CAAY,CAAC;YACtB,IAAI,CAAC,CAAC,CAAC,CAAC,GAAG,EAAE,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,CAAC;QACzB,CAAC,CAAC,CAEF;QAAA,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,GAAG,GAAG,GAAG,IAAI,CAAC,CAAC,CAAC,EAAE,GAAG,GAAG,GAAG,IAAI,CAAC,CAAC,CAAC,EAAE,EAAE,CAClD;MAAA,EAAE,IAAI,CAAC,CACR,CAAC;AACJ,CAAC"}',
  );
}
it("Widened", async (t) => {
  await snapshotCase(t, "Widened", _jsx(Widened, {}));
});
