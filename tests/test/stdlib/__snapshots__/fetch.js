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
        code: 'export default ($0, $1) => () => {\n    const held = $0()("waiting");\n    $1()\n        .fetch("/cases/built-ins/Math/trunc/Math.trunc_Success", {\n        signal: $1().AbortSignal.timeout(3000),\n    })\n        .then((response) => {\n        if (response.status !== 200) {\n            throw "answered " + response.status;\n        }\n        return response.json();\n    })\n        .then((value) => {\n        held.set(value === null ? "null" : "a value");\n    })\n        .catch((error) => {\n        held.set("failed \u2014 " + String(error));\n    });\n    $1()\n        .fetch("/cases", {\n        method: "POST",\n        headers: { "content-type": "application/json" },\n        body: JSON.stringify({ name: "Math.trunc", passed: true }),\n    })\n        .then((response) => response.text())\n        .then((text) => {\n        held.set(text);\n    }, (error) => {\n        held.set(String(error));\n    });\n    return held.get();\n};',
        map: '{"version":3,"file":"fetch.test.jsx","sourceRoot":"","sources":["stdlib/fetch.test.tsx"],"names":[],"mappings":"eAcO,YAAA,GAAG,EAAE;IACN,MAAM,IAAI,GAAG,IAAM,CAAC,SAAS,CAAC,CAAC;IAE/B,IAAO;SACJ,KAAK,CAAC,gDAAgD,EAAE;QACvD,MAAM,EAAE,IAAO,CAAC,WAAW,CAAC,OAAO,CAAC,IAAI,CAAC;KAC1C,CAAC;SACD,IAAI,CAAC,CAAC,QAAkB,EAAE,EAAE;QAC3B,IAAI,QAAQ,CAAC,MAAM,KAAK,GAAG,EAAE,CAAC;YAC5B,MAAM,WAAW,GAAG,QAAQ,CAAC,MAAM,CAAC;QACtC,CAAC;QACD,OAAO,QAAQ,CAAC,IAAI,EAAE,CAAC;IACzB,CAAC,CAAC;SACD,IAAI,CAAC,CAAC,KAAc,EAAE,EAAE;QACvB,IAAI,CAAC,GAAG,CAAC,KAAK,KAAK,IAAI,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC;IAChD,CAAC,CAAC;SACD,KAAK,CAAC,CAAC,KAAc,EAAE,EAAE;QACxB,IAAI,CAAC,GAAG,CAAC,WAAW,GAAG,MAAM,CAAC,KAAK,CAAC,CAAC,CAAC;IACxC,CAAC,CAAC,CAAC;IAEL,IAAO;SACJ,KAAK,CAAC,QAAQ,EAAE;QACf,MAAM,EAAE,MAAM;QACd,OAAO,EAAE,EAAE,cAAc,EAAE,kBAAkB,EAAE;QAC/C,IAAI,EAAE,IAAI,CAAC,SAAS,CAAC,EAAE,IAAI,EAAE,YAAY,EAAE,MAAM,EAAE,IAAI,EAAE,CAAC;KAC3D,CAAC;SACD,IAAI,CAAC,CAAC,QAAkB,EAAE,EAAE,CAAC,QAAQ,CAAC,IAAI,EAAE,CAAC;SAC7C,IAAI,CACH,CAAC,IAAY,EAAE,EAAE;QACf,IAAI,CAAC,GAAG,CAAC,IAAI,CAAC,CAAC;IACjB,CAAC,EACD,CAAC,KAAc,EAAE,EAAE;QACjB,IAAI,CAAC,GAAG,CAAC,MAAM,CAAC,KAAK,CAAC,CAAC,CAAC;IAC1B,CAAC,CACF,CAAC;IAEJ,OAAO,IAAI,CAAC,GAAG,EAAE,CAAC;AACpB,CAAC"}',
      },
    ),
  );
});
