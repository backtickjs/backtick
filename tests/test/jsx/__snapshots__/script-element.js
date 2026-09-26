import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
// An element a script writes, rather than one the host wrote and the script
// spliced in. What it lowers to is the node a tree entry builds, so the two
// spellings draw the same thing — the difference is where the element is
// written, not what it is.
async function Card() {
  return cs.create(
    "2qvr46mfkosun:11:9",
    { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
    {
      code: 'export default ($0) => {\n    const label = $0()("hi");\n    const row = (size) => {\n        const css = "font-size: " + size + "px";\n        const press = () => label[1]("held");\n        return (<div style={css}>\n          <span style={css} onclick={() => label[1]("pressed")}>\n            {label[0]()}\n          </span>\n          <span style="font-size: 8px">fixed</span>\n          <span style={css} onclick={press}>\n            held\n          </span>\n        </div>);\n    };\n    return <div style="padding: 0">{row(12)}</div>;\n};',
      map: '{"version":3,"file":"script-element.test.jsx","sourceRoot":"","sources":["jsx/script-element.test.tsx"],"names":[],"mappings":"eAUY;IACR,MAAM,KAAK,GAAG,IAAa,CAAC,IAAI,CAAC,CAAC;IAIlC,MAAM,GAAG,GAAG,CAAC,IAAY,EAAE,EAAE;QAC3B,MAAM,GAAG,GAAG,aAAa,GAAG,IAAI,GAAG,IAAI,CAAC;QACxC,MAAM,KAAK,GAAG,GAAG,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC;QACrC,OAAO,CACL,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,GAAG,CAAC,CACd;UAAA,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,GAAG,CAAC,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,CACnD;YAAA,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,CACb;UAAA,EAAE,IAAI,CACN;UAAA,CAAC,IAAI,CAAC,KAAK,CAAC,gBAAgB,CAAC,KAAK,EAAE,IAAI,CACxC;UAAA,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,GAAG,CAAC,CAAC,OAAO,CAAC,CAAC,KAAK,CAAC,CAC/B;;UACF,EAAE,IAAI,CACR;QAAA,EAAE,GAAG,CAAC,CACP,CAAC;IACJ,CAAC,CAAC;IAEF,OAAO,CAAC,GAAG,CAAC,KAAK,CAAC,YAAY,CAAC,CAAC,GAAG,CAAC,EAAE,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;AACjD,CAAC"}',
    },
  );
}
it("Card", async (t) => {
  await snapshotCase(t, "Card", _jsx(Card, {}));
});
