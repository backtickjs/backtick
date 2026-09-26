import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
const make = (f) =>
  cs.create(
    "15sw9grlgz4v:9:2",
    { params: [{ kind: "splice", value: f, bindings: [] }] },
    "($0) => {\n    return $0()(1)[0]();\n}",
    '{"version":3,"file":"builtin-hole-sharing.test.jsx","sourceRoot":"","sources":["stdlib/builtin-hole-sharing.test.tsx"],"names":[],"mappings":"AAQK;IACD,OAAO,IAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC;AACpB,CAAC"}',
  );
const wrapped = cs.create(
  "15sw9grlgz4v:13:16",
  { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
  "($0) => (n) => $0()(n + 10)",
  '{"version":3,"file":"builtin-hole-sharing.test.jsx","sourceRoot":"","sources":["stdlib/builtin-hole-sharing.test.tsx"],"names":[],"mappings":"AAYmB,QAAA,CAAC,CAAS,EAAE,EAAE,CAAC,IAAa,CAAC,CAAC,GAAG,EAAE,CAAC"}',
);
it("builtinHoleSharing", async (t) => {
  await snapshotCase(
    t,
    "builtinHoleSharing",
    cs.create(
      "15sw9grlgz4v:19:4",
      {
        params: [
          { kind: "splice", value: make(createSignal), bindings: [] },
          { kind: "splice", value: make(wrapped), bindings: [] },
        ],
      },
      "($0, $1) => {\n    return $0() + $1();\n}",
      '{"version":3,"file":"builtin-hole-sharing.test.jsx","sourceRoot":"","sources":["stdlib/builtin-hole-sharing.test.tsx"],"names":[],"mappings":"AAkBO;IACD,OAAO,IAAC,GAAuB,IAAC,CAAgB;AAClD,CAAC"}',
    ),
  );
});
