import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
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
      "cwjgymif0jr:15:4",
      { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
      '($splice0) => () => {\n    const held = $splice0()("waiting");\n    window\n        .fetch("/cases/built-ins/Math/trunc/Math.trunc_Success", {\n        signal: window.AbortSignal.timeout(3000),\n    })\n        .then((response) => {\n        if (response.status !== 200) {\n            throw "answered " + response.status;\n        }\n        return response.json();\n    })\n        .then((value) => {\n        held[1](value === null ? "null" : "a value");\n    })\n        .catch((error) => {\n        held[1]("failed \u2014 " + String(error));\n    });\n    window\n        .fetch("/cases", {\n        method: "POST",\n        headers: { "content-type": "application/json" },\n        body: JSON.stringify({ name: "Math.trunc", passed: true }),\n    })\n        .then((response) => response.text())\n        .then((text) => {\n        held[1](text);\n    }, (error) => {\n        held[1](String(error));\n    });\n    return held[0]();\n}',
      '{"version":3,"file":"fetch.test.jsx","sourceRoot":"","sources":["stdlib/fetch.test.tsx"],"names":[],"mappings":"AAcO,cAAA,GAAG,EAAE;IACN,MAAM,IAAI,GAAG,UAAa,CAAC,SAAS,CAAC,CAAC;IAEtC,MAAM;SACH,KAAK,CAAC,gDAAgD,EAAE;QACvD,MAAM,EAAE,MAAM,CAAC,WAAW,CAAC,OAAO,CAAC,IAAI,CAAC;KACzC,CAAC;SACD,IAAI,CAAC,CAAC,QAAkB,EAAE,EAAE;QAC3B,IAAI,QAAQ,CAAC,MAAM,KAAK,GAAG,EAAE,CAAC;YAC5B,MAAM,WAAW,GAAG,QAAQ,CAAC,MAAM,CAAC;QACtC,CAAC;QACD,OAAO,QAAQ,CAAC,IAAI,EAAE,CAAC;IACzB,CAAC,CAAC;SACD,IAAI,CAAC,CAAC,KAAc,EAAE,EAAE;QACvB,IAAI,CAAC,CAAC,CAAC,CAAC,KAAK,KAAK,IAAI,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC;IAC/C,CAAC,CAAC;SACD,KAAK,CAAC,CAAC,KAAc,EAAE,EAAE;QACxB,IAAI,CAAC,CAAC,CAAC,CAAC,WAAW,GAAG,MAAM,CAAC,KAAK,CAAC,CAAC,CAAC;IACvC,CAAC,CAAC,CAAC;IAEL,MAAM;SACH,KAAK,CAAC,QAAQ,EAAE;QACf,MAAM,EAAE,MAAM;QACd,OAAO,EAAE,EAAE,cAAc,EAAE,kBAAkB,EAAE;QAC/C,IAAI,EAAE,IAAI,CAAC,SAAS,CAAC,EAAE,IAAI,EAAE,YAAY,EAAE,MAAM,EAAE,IAAI,EAAE,CAAC;KAC3D,CAAC;SACD,IAAI,CAAC,CAAC,QAAkB,EAAE,EAAE,CAAC,QAAQ,CAAC,IAAI,EAAE,CAAC;SAC7C,IAAI,CACH,CAAC,IAAY,EAAE,EAAE;QACf,IAAI,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC;IAChB,CAAC,EACD,CAAC,KAAc,EAAE,EAAE;QACjB,IAAI,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,KAAK,CAAC,CAAC,CAAC;IACzB,CAAC,CACF,CAAC;IAEJ,OAAO,IAAI,CAAC,CAAC,CAAC,EAAE,CAAC;AACnB,CAAC"}',
    ),
  );
});
