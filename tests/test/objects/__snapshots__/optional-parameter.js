import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `?` marks an optional parameter: a caller may omit it or pass `undefined`,
// and either way it binds `undefined`. `null` is a value of its own and not
// accepted here.
const greet = cs.create(
  "1i6s8vesd5nbi:8:14",
  { params: [] },
  '() => (name) => {\n    return name?.concat("!");\n}',
  '{"version":3,"file":"optional-parameter.test.jsx","sourceRoot":"","sources":["objects/optional-parameter.test.tsx"],"names":[],"mappings":"AAOiB,MAAA,CAAC,IAAa,EAAE,EAAE;IACjC,OAAO,IAAI,EAAE,MAAM,CAAC,GAAG,CAAC,CAAC;AAC3B,CAAC"}',
);
// A function-typed annotation unions parenthesized: `(() => number) |
// undefined`.
const double = cs.create(
  "1i6s8vesd5nbi:14:15",
  { params: [] },
  "() => () => 2",
  '{"version":3,"file":"optional-parameter.test.jsx","sourceRoot":"","sources":["objects/optional-parameter.test.tsx"],"names":[],"mappings":"AAakB,MAAA,GAAG,EAAE,CAAC,CAAC"}',
);
const callIfGiven = cs.create(
  "1i6s8vesd5nbi:16:20",
  { params: [] },
  "() => (cb) => {\n    return cb?.() ?? 0;\n}",
  '{"version":3,"file":"optional-parameter.test.jsx","sourceRoot":"","sources":["objects/optional-parameter.test.tsx"],"names":[],"mappings":"AAeuB,MAAA,CAAC,EAAiB,EAAE,EAAE;IAC3C,OAAO,EAAE,EAAE,EAAE,IAAI,CAAC,CAAC;AACrB,CAAC"}',
);
it("optionalParameter", async (t) => {
  await snapshotCase(
    t,
    "optionalParameter",
    cs.create(
      "1i6s8vesd5nbi:24:4",
      {
        params: [
          { kind: "splice", value: greet, bindings: [] },
          { kind: "splice", value: callIfGiven, bindings: [] },
          { kind: "splice", value: double, bindings: [] },
        ],
      },
      '($0, $1, $2) => ({\n    named: $0()("hi"),\n    explicit: $0()(undefined),\n    omitted: $0()(),\n    supplied: $1()($2()),\n    fallback: $1()(undefined),\n    omittedCallback: $1()(),\n})',
      '{"version":3,"file":"optional-parameter.test.jsx","sourceRoot":"","sources":["objects/optional-parameter.test.tsx"],"names":[],"mappings":"AAuBO,gBAAA,CAAC;IACF,KAAK,EAAE,IAAM,CAAC,IAAI,CAAC;IACnB,QAAQ,EAAE,IAAM,CAAC,SAAS,CAAC;IAC3B,OAAO,EAAE,IAAM,EAAE;IACjB,QAAQ,EAAE,IAAY,CAAC,IAAO,CAAC;IAC/B,QAAQ,EAAE,IAAY,CAAC,SAAS,CAAC;IACjC,eAAe,EAAE,IAAY,EAAE;CAChC,CAAC"}',
    ),
  );
});
