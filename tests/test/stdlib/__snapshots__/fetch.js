import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "2gt79jmb8630e:15:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => () => {\n    const [held, setHeld] = $splice0()("waiting");\n    window.fetch("/cases/built-ins/Math/trunc/Math.trunc_Success", {\n        signal: window.AbortSignal.timeout(3000)\n    }).then(response => {\n        if (response.status !== 200) {\n            throw "answered " + response.status;\n        }\n        return response.json();\n    }).then(value => {\n        setHeld(value === null ? "null" : "a value");\n    }).catch(error => {\n        setHeld("failed \u2014 " + String(error));\n    });\n    window.fetch("/cases", {\n        method: "POST",\n        headers: {\n            "content-type": "application/json"\n        },\n        body: JSON.stringify({\n            name: "Math.trunc",\n            passed: true\n        })\n    }).then(response => response.text()).then(text => {\n        setHeld(text);\n    }, error => {\n        setHeld(String(error));\n    });\n    return held();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAcOA,QAAA;IACD,MAAM,CAACC,IAAI,EAAEC,OAAO,CAAC,GAAGF,QAAA,EAAa,CAAC,SAAS,CAAC;IAEhDG,MAAM,CACHC,KAAK,CAAC,gDAAgD,EAAE;QACvDC,MAAM,EAAEF,MAAM,CAACG,WAAW,CAACC,OAAO,CAAC,IAAI;KACxC,CAAC,CACDC,IAAI,CAAEC,QAAkB;QACvB,IAAIA,QAAQ,CAACC,MAAM,KAAK,GAAG,EAAE;YAC3B,MAAM,WAAW,GAAGD,QAAQ,CAACC,MAAM;QACrC;QACA,OAAOD,QAAQ,CAACE,IAAI,EAAE;IACxB,CAAC,CAAC,CACDH,IAAI,CAAEI,KAAc;QACnBV,OAAO,CAACU,KAAK,KAAK,IAAI,GAAG,MAAM,GAAG,SAAS,CAAC;IAC9C,CAAC,CAAC,CACDC,KAAK,CAAEC,KAAc;QACpBZ,OAAO,CAAC,WAAW,GAAGa,MAAM,CAACD,KAAK,CAAC,CAAC;IACtC,CAAC,CAAC;IAEJX,MAAM,CACHC,KAAK,CAAC,QAAQ,EAAE;QACfY,MAAM,EAAE,MAAM;QACdC,OAAO,EAAE;YAAE,cAAc,EAAE;SAAoB;QAC/CC,IAAI,EAAEC,IAAI,CAACC,SAAS,CAAC;YAAEC,IAAI,EAAE,YAAY;YAAEC,MAAM,EAAE;SAAM;KAC1D,CAAC,CACDd,IAAI,CAAEC,QAAkB,IAAKA,QAAQ,CAACc,IAAI,EAAE,CAAC,CAC7Cf,IAAI,CACFe,IAAY;QACXrB,OAAO,CAACqB,IAAI,CAAC;IACf,CAAC,EACAT,KAAc;QACbZ,OAAO,CAACa,MAAM,CAACD,KAAK,CAAC,CAAC;IACxB,CAAC,CACF;IAEH,OAAOb,IAAI,EAAE;AACf,CAAC","names":["$splice0","held","setHeld","window","fetch","signal","AbortSignal","timeout","then","response","status","json","value","catch","error","String","method","headers","body","JSON","stringify","name","passed","text"],"ignoreList":[],"sources":["stdlib/fetch.test.tsx"]}',
  dependencies: [],
};
// The platform's own `fetch`: a status is failed on by throwing, and so is a
// body that is not JSON, and either reaches the `catch`.
//
// An arrow rather than a call, so what this pins is the bundling and the
// typechecking: nothing is asked of a network to snapshot a value.
it("fetchRequests", async (t) => {
  await snapshotCase(
    t,
    "fetchRequests",
    cs.create($module0, [
      { kind: "splice", value: createSignal, bindings: [] },
    ]),
  );
});
