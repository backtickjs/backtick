import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
const make = (f) =>
  cs.create(
    "15sw9grlgz4v:9:2",
    { params: [{ kind: "splice", value: f, bindings: [] }] },
    {
      code: "export default $0 => {\n  return $0()(1)[0]();\n};",
      map: '{"version":3,"mappings":"eAQKA,EAAA;EACD,OAAOA,EAAA,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE;AACnB,CAAC","names":["$0"],"ignoreList":[],"sources":["builtin-hole-sharing.test.tsx"]}',
      imports: [],
      exportAt: 0,
    },
  );
const wrapped = cs.create(
  "15sw9grlgz4v:13:16",
  { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
  {
    code: "export default $0 => n => $0()(n + 10);",
    map: '{"version":3,"mappings":"eAYmBA,EAAA,IAACC,CAAS,IAAKD,EAAA,EAAa,CAACC,CAAC,GAAG,EAAE,CAAC","names":["$0","n"],"ignoreList":[],"sources":["builtin-hole-sharing.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
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
      {
        code: "export default ($0, $1) => {\n  return $0() + $1();\n};",
        map: '{"version":3,"mappings":"eAkBO,CAAAA,EAAA,EAAAC,EAAA;EACD,OAAOD,EAAA,EAAC,GAAuBC,EAAA,EAAC;AAClC,CAAC","names":["$0","$1"],"ignoreList":[],"sources":["builtin-hole-sharing.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
