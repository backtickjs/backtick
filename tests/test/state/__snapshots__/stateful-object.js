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
    code: "export default ($0) => (initial) => {\n    const count = $0()(initial);\n    return {\n        get: () => count[0](),\n        add: (n) => {\n            count[1](count[0]() + n);\n        },\n    };\n};",
    map: '{"version":3,"file":"stateful-object.test.jsx","sourceRoot":"","sources":["stateful-object.test.tsx"],"names":[],"mappings":"eASmB,QAAA,CAAC,OAAe,EAAE,EAAE;IACrC,MAAM,KAAK,GAAG,IAAa,CAAC,OAAO,CAAC,CAAC;IACrC,OAAO;QACL,GAAG,EAAE,GAAG,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE;QACrB,GAAG,EAAE,CAAC,CAAS,EAAE,EAAE;YACjB,KAAK,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC;QAC3B,CAAC;KACF,CAAC;AACJ,CAAC"}',
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
        code: "export default ($0) => {\n    const c = $0()(10);\n    return (<button onclick={() => {\n            c.add(5);\n        }}>\n          {c.get()}\n        </button>);\n};",
        map: '{"version":3,"file":"stateful-object.test.jsx","sourceRoot":"","sources":["stateful-object.test.tsx"],"names":[],"mappings":"eAuBO;IACD,MAAM,CAAC,GAAG,IAAQ,CAAC,EAAE,CAAC,CAAC;IACvB,OAAO,CACL,CAAC,MAAM,CACL,OAAO,CAAC,CAAC,GAAG,EAAE;YACZ,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;QACX,CAAC,CAAC,CAEF;UAAA,CAAC,CAAC,CAAC,GAAG,EAAE,CACV;QAAA,EAAE,MAAM,CAAC,CACV,CAAC;AACJ,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
