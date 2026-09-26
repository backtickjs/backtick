import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
const make = (f) =>
  cs.create(
    "15sw9grlgz4v:9:2",
    { params: [{ kind: "splice", value: f, bindings: [] }] },
    "($splice0) => {\n    return $splice0()(1)[0]();\n}",
    '{"version":3,"file":"builtin-hole-sharing.test.jsx","sourceRoot":"","sources":["stdlib/builtin-hole-sharing.test.tsx"],"names":[],"mappings":"AAQK;IACD,OAAO,UAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC;AACpB,CAAC"}',
  );
const wrapped = cs.create(
  "15sw9grlgz4v:13:16",
  { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
  "($splice0) => (n) => $splice0()(n + 10)",
  '{"version":3,"file":"builtin-hole-sharing.test.jsx","sourceRoot":"","sources":["stdlib/builtin-hole-sharing.test.tsx"],"names":[],"mappings":"AAYmB,cAAA,CAAC,CAAS,EAAE,EAAE,CAAC,UAAa,CAAC,CAAC,GAAG,EAAE,CAAC"}',
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
      "($splice0, $splice1) => {\n    return $splice0() + $splice1();\n}",
      '{"version":3,"file":"builtin-hole-sharing.test.jsx","sourceRoot":"","sources":["stdlib/builtin-hole-sharing.test.tsx"],"names":[],"mappings":"AAkBO;IACD,OAAO,UAAC,GAAuB,UAAC,CAAgB;AAClD,CAAC"}',
    ),
  );
});
