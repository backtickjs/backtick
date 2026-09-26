import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const make = (f) =>
  cs.create(
    "3vatah1osfcoe:7:2",
    { params: [{ kind: "splice", value: f, bindings: [] }] },
    {
      code: "export default ($0) => {\n    return $0()(1).get();\n};",
      map: '{"version":3,"file":"builtin-hole-sharing.test.jsx","sourceRoot":"","sources":["builtin-hole-sharing.test.tsx"],"names":[],"mappings":"eAMK;IACD,OAAO,IAAE,CAAC,CAAC,CAAC,CAAC,GAAG,EAAE,CAAC;AACrB,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
const wrapped = cs.create(
  "3vatah1osfcoe:11:16",
  { params: [{ kind: "splice", value: state, bindings: [] }] },
  {
    code: "export default ($0) => (n) => $0()(n + 10);",
    map: '{"version":3,"file":"builtin-hole-sharing.test.jsx","sourceRoot":"","sources":["builtin-hole-sharing.test.tsx"],"names":[],"mappings":"eAUmB,QAAA,CAAC,CAAS,EAAE,EAAE,CAAC,IAAM,CAAC,CAAC,GAAG,EAAE,CAAC"}',
    imports: [],
    exportAt: 0,
  },
);
it("builtinHoleSharing", async (t) => {
  await snapshotCase(
    t,
    "builtinHoleSharing",
    cs.create(
      "3vatah1osfcoe:17:4",
      {
        params: [
          { kind: "splice", value: make(state), bindings: [] },
          { kind: "splice", value: make(wrapped), bindings: [] },
        ],
      },
      {
        code: "export default ($0, $1) => {\n    return $0() + $1();\n};",
        map: '{"version":3,"file":"builtin-hole-sharing.test.jsx","sourceRoot":"","sources":["builtin-hole-sharing.test.tsx"],"names":[],"mappings":"eAgBO;IACD,OAAO,IAAC,GAAgB,IAAC,CAAgB;AAC3C,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
