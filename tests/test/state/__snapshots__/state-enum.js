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
  '($splice0) => (c) => {\n    return c === $splice0() ? "blue" : "red";\n}',
  '{"version":3,"file":"state-enum.test.jsx","sourceRoot":"","sources":["state/state-enum.test.tsx"],"names":[],"mappings":"AAkBmD,cAAA,CAAC,CAAQ,EAAE,EAAE;IAC9D,OAAO,CAAC,KAAK,UAAC,CAAa,CAAC,CAAC,MAAM,CAAC,CAAC,CAAC,KAAK,CAAC;AAC9C,CAAC"}',
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
    "($splice0, $splice1, $splice2, $splice3) => {\n    const held = $splice0()($splice1());\n    return (<span onclick={() => held[1]($splice2())}>\n        {$splice3()(held[0]())}\n      </span>);\n}",
    '{"version":3,"file":"state-enum.test.jsx","sourceRoot":"","sources":["state/state-enum.test.tsx"],"names":[],"mappings":"AAuBY;IACR,MAAM,IAAI,GAAG,UAAa,CAAC,UAAC,CAAY,CAAC;IACzC,OAAO,CACL,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,UAAC,CAAa,CAAC,CAC1C;QAAA,CAAC,UAAU,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,CAAC,CACxB;MAAA,EAAE,IAAI,CAAC,CACR,CAAC;AACJ,CAAC"}',
  );
}
it("Swatch", async (t) => {
  await snapshotCase(t, "Swatch", _jsx(Swatch, {}));
});
