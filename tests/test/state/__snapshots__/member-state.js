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
    "29y7yt4pe8mj3:20:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    '($splice0, $tag1) => {\n    const build = (from) => {\n        return Array.from({ length: 3 }, (_, at) => {\n            return { id: from + at, label: $splice0()("row " + (from + at)) };\n        });\n    };\n    const held = $splice0()(build(1));\n    return (<div>\n        <ul class="rows">\n          <$tag1 each={held[0]()}>\n            {(row) => (<li onclick={() => row.label[1]("pressed")}>{row.label[0]()}</li>)}\n          </$tag1>\n        </ul>\n      </div>);\n}',
    '{"version":3,"file":"member-state.test.jsx","sourceRoot":"","sources":["state/member-state.test.tsx"],"names":[],"mappings":"AAmBY;IACR,MAAM,KAAK,GAAG,CAAC,IAAY,EAAE,EAAE;QAC7B,OAAO,KAAK,CAAC,IAAI,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,EAAE,CAAC,CAAC,EAAE,EAAE,EAAE,EAAE;YACzC,OAAO,EAAE,EAAE,EAAE,IAAI,GAAG,EAAE,EAAE,KAAK,EAAE,UAAa,CAAC,MAAM,GAAG,CAAC,IAAI,GAAG,EAAE,CAAC,CAAC,EAAE,CAAC;QACvE,CAAC,CAAC,CAAC;IACL,CAAC,CAAC;IAEF,MAAM,IAAI,GAAG,UAAa,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC;IAErC,OAAO,CACL,CAAC,GAAG,CACF;QAAA,CAAC,EAAE,CAAC,KAAK,CAAC,MAAM,CACd;UAAA,CAAC,KAAG,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,CAAC,CACnB;YAAA,CAAC,CAAC,GAAQ,EAAE,EAAE,CAAC,CACb,CAAC,EAAE,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,EAAE,CAAC,CAClE,CACH;UAAA,EAAE,KAAG,CACP;QAAA,EAAE,EAAE,CACN;MAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
  );
}
it("MemberRows", async (t) => {
  await snapshotCase(t, "MemberRows", _jsx(MemberRows, {}));
});
