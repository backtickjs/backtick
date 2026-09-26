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
      code: 'export default ($0, $1) => {\n    const rows = $0()([]);\n    const add = (row) => {\n        rows[1]([row]);\n    };\n    const label = (row) => {\n        return row.label;\n    };\n    return (<div>\n        <span onclick={() => add({ id: 1, label: "one" })}>add</span>\n        <div>\n          <$1 each={rows[0]()}>{(row) => <span>{label(row)}</span>}</$1>\n        </div>\n      </div>);\n};',
      map: '{"version":3,"file":"named-type-positions.test.jsx","sourceRoot":"","sources":["named-type-positions.test.tsx"],"names":[],"mappings":"eAkBY;IACR,MAAM,IAAI,GAAG,IAAa,CAAQ,EAAE,CAAC,CAAC;IACtC,MAAM,GAAG,GAAG,CAAC,GAAQ,EAAE,EAAE;QACvB,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC;IACjB,CAAC,CAAC;IACF,MAAM,KAAK,GAAG,CAAC,GAAQ,EAAE,EAAE;QACzB,OAAO,GAAG,CAAC,KAAK,CAAC;IACnB,CAAC,CAAC;IACF,OAAO,CACL,CAAC,GAAG,CACF;QAAA,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,KAAK,EAAE,KAAK,EAAE,CAAC,CAAC,CAAC,GAAG,EAAE,IAAI,CAC5D;QAAA,CAAC,GAAG,CACF;UAAA,CAAC,EAAG,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,GAAQ,EAAE,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,KAAK,CAAC,GAAG,CAAC,CAAC,EAAE,IAAI,CAAC,CAAC,EAAE,EAAG,CACtE;QAAA,EAAE,GAAG,CACP;MAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
    },
  );
}
it("Rows", async (t) => {
  await snapshotCase(t, "Rows", _jsx(Rows, {}));
});
