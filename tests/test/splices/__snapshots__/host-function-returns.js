import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A host function may answer with anything spliceable: it is expanded once
// against a hole per parameter, and what it answered is written as the arrow's
// body. Each call binds the hole to what the script passed, and what comes back
// is typed as what the answer becomes on the client.
const returnsNull = (_n) => null;
const returnsUndefined = (_n) => undefined;
const returnsNumber = (_n) => 1;
const returnsBoolean = (_n) => true;
const returnsString = (_n) => "text";
const returnsArray = (n) => [n, 2];
const returnsObject = (n) => ({ value: n, label: "n" });
const returnsScript = (n) =>
  cs.create(
    "3gm133h0o1a3j:17:45",
    { params: [{ kind: "splice", value: n, bindings: [] }] },
    "($splice0) => $splice0() + 1",
    '{"version":3,"file":"host-function-returns.test.jsx","sourceRoot":"","sources":["splices/host-function-returns.test.tsx"],"names":[],"mappings":"AAgBgD,cAAA,UAAE,GAAG,CAAC"}',
  );
const returnsFunction = (n) => (m) =>
  cs.create(
    "3gm133h0o1a3j:19:2",
    {
      params: [
        { kind: "splice", value: n, bindings: [] },
        { kind: "splice", value: m, bindings: [] },
      ],
    },
    "($splice0, $splice1) => $splice0() * $splice1()",
    '{"version":3,"file":"host-function-returns.test.jsx","sourceRoot":"","sources":["splices/host-function-returns.test.tsx"],"names":[],"mappings":"AAkBK,wBAAA,UAAE,GAAG,UAAE"}',
  );
const returnsElement = (n) => _jsx("b", { children: n });
it("hostFunctionReturns", async (t) => {
  await snapshotCase(
    t,
    "hostFunctionReturns",
    cs.create(
      "3gm133h0o1a3j:26:4",
      {
        params: [
          { kind: "splice", value: returnsNull, bindings: [] },
          { kind: "splice", value: returnsUndefined, bindings: [] },
          { kind: "splice", value: returnsNumber, bindings: [] },
          { kind: "splice", value: returnsBoolean, bindings: [] },
          { kind: "splice", value: returnsString, bindings: [] },
          { kind: "splice", value: returnsArray, bindings: [] },
          { kind: "splice", value: returnsObject, bindings: [] },
          { kind: "splice", value: returnsScript, bindings: [] },
          { kind: "splice", value: returnsFunction, bindings: [] },
          { kind: "splice", value: returnsElement, bindings: [] },
        ],
      },
      "($splice0, $splice1, $splice2, $splice3, $splice4, $splice5, $splice6, $splice7, $splice8, $splice9) => {\n    const none = $splice0()(1);\n    const missing = $splice1()(1);\n    const number = $splice2()(1);\n    const boolean = $splice3()(1);\n    const string = $splice4()(1);\n    const array = $splice5()(3);\n    const object = $splice6()(4);\n    const script = $splice7()(5);\n    const called = $splice8()(6)(7);\n    const element = $splice9()(8);\n    return {\n        none: none,\n        missing: missing,\n        number: number,\n        boolean: boolean,\n        string: string,\n        array: array,\n        object: object,\n        script: script,\n        called: called,\n        element: element,\n    };\n}",
      '{"version":3,"file":"host-function-returns.test.jsx","sourceRoot":"","sources":["splices/host-function-returns.test.tsx"],"names":[],"mappings":"AAyBO;IACD,MAAM,IAAI,GAAS,UAAY,CAAC,CAAC,CAAC,CAAC;IACnC,MAAM,OAAO,GAAc,UAAiB,CAAC,CAAC,CAAC,CAAC;IAChD,MAAM,MAAM,GAAW,UAAc,CAAC,CAAC,CAAC,CAAC;IACzC,MAAM,OAAO,GAAY,UAAe,CAAC,CAAC,CAAC,CAAC;IAC5C,MAAM,MAAM,GAAW,UAAc,CAAC,CAAC,CAAC,CAAC;IACzC,MAAM,KAAK,GAAa,UAAa,CAAC,CAAC,CAAC,CAAC;IACzC,MAAM,MAAM,GAAqC,UAAc,CAAC,CAAC,CAAC,CAAC;IACnE,MAAM,MAAM,GAAW,UAAc,CAAC,CAAC,CAAC,CAAC;IACzC,MAAM,MAAM,GAAW,UAAgB,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;IAC9C,MAAM,OAAO,GAAG,UAAe,CAAC,CAAC,CAAC,CAAC;IACnC,OAAO;QACL,IAAI,EAAE,IAAI;QACV,OAAO,EAAE,OAAO;QAChB,MAAM,EAAE,MAAM;QACd,OAAO,EAAE,OAAO;QAChB,MAAM,EAAE,MAAM;QACd,KAAK,EAAE,KAAK;QACZ,MAAM,EAAE,MAAM;QACd,MAAM,EAAE,MAAM;QACd,MAAM,EAAE,MAAM;QACd,OAAO,EAAE,OAAO;KACjB,CAAC;AACJ,CAAC"}',
    ),
  );
});
