import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { window } from "@backtickjs/browser";
import { snapshotCase } from "../snapshotCase.ts";
// The platform's own `fetch`: a status is failed on by throwing, and so is a
// body that is not JSON, and either reaches the `catch`.
//
// An arrow rather than a call, so what this pins is the bundling and the
// typechecking: nothing is asked of a network to snapshot a value.
it("fetchRequests", async (t) => {
  await snapshotCase(
    t,
    "fetchRequests",
    cs.create(
      "32y7bkpf4sqjs:15:4",
      {
        params: [
          { kind: "splice", value: state, bindings: [] },
          { kind: "splice", value: window, bindings: [] },
        ],
      },
      {
        code: 'export default ($0, $1) => () => {\n  const held = $0()("waiting");\n  $1().fetch("/cases/built-ins/Math/trunc/Math.trunc_Success", {\n    signal: $1().AbortSignal.timeout(3000)\n  }).then(response => {\n    if (response.status !== 200) {\n      throw "answered " + response.status;\n    }\n    return response.json();\n  }).then(value => {\n    held.set(value === null ? "null" : "a value");\n  }).catch(error => {\n    held.set("failed \u2014 " + String(error));\n  });\n  $1().fetch("/cases", {\n    method: "POST",\n    headers: {\n      "content-type": "application/json"\n    },\n    body: JSON.stringify({\n      name: "Math.trunc",\n      passed: true\n    })\n  }).then(response => response.text()).then(text => {\n    held.set(text);\n  }, error => {\n    held.set(String(error));\n  });\n  return held.get();\n};',
        map: '{"version":3,"mappings":"eAcO,CAAAA,EAAA,EAAAC,EAAA,WAAK;EACN,MAAMC,IAAI,GAAGF,EAAA,EAAM,CAAC,SAAS,CAAC;EAE9BC,EAAA,EAAO,CACJE,KAAK,CAAC,gDAAgD,EAAE;IACvDC,MAAM,EAAEH,EAAA,EAAO,CAACI,WAAW,CAACC,OAAO,CAAC,IAAI;GACzC,CAAC,CACDC,IAAI,CAAEC,QAAkB,IAAI;IAC3B,IAAIA,QAAQ,CAACC,MAAM,KAAK,GAAG,EAAE;MAC3B,MAAM,WAAW,GAAGD,QAAQ,CAACC,MAAM;IACrC;IACA,OAAOD,QAAQ,CAACE,IAAI,EAAE;EACxB,CAAC,CAAC,CACDH,IAAI,CAAEI,KAAc,IAAI;IACvBT,IAAI,CAACU,GAAG,CAACD,KAAK,KAAK,IAAI,GAAG,MAAM,GAAG,SAAS,CAAC;EAC/C,CAAC,CAAC,CACDE,KAAK,CAAEC,KAAc,IAAI;IACxBZ,IAAI,CAACU,GAAG,CAAC,WAAW,GAAGG,MAAM,CAACD,KAAK,CAAC,CAAC;EACvC,CAAC,CAAC;EAEJb,EAAA,EAAO,CACJE,KAAK,CAAC,QAAQ,EAAE;IACfa,MAAM,EAAE,MAAM;IACdC,OAAO,EAAE;MAAE,cAAc,EAAE;IAAkB,CAAE;IAC/CC,IAAI,EAAEC,IAAI,CAACC,SAAS,CAAC;MAAEC,IAAI,EAAE,YAAY;MAAEC,MAAM,EAAE;IAAI,CAAE;GAC1D,CAAC,CACDf,IAAI,CAAEC,QAAkB,IAAKA,QAAQ,CAACe,IAAI,EAAE,CAAC,CAC7ChB,IAAI,CACFgB,IAAY,IAAI;IACfrB,IAAI,CAACU,GAAG,CAACW,IAAI,CAAC;EAChB,CAAC,EACAT,KAAc,IAAI;IACjBZ,IAAI,CAACU,GAAG,CAACG,MAAM,CAACD,KAAK,CAAC,CAAC;EACzB,CAAC,CACF;EAEH,OAAOZ,IAAI,CAACsB,GAAG,EAAE;AACnB,CAAC","names":["$0","$1","held","fetch","signal","AbortSignal","timeout","then","response","status","json","value","set","catch","error","String","method","headers","body","JSON","stringify","name","passed","text","get"],"ignoreList":[],"sources":["fetch.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
