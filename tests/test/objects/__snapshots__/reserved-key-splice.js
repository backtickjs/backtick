import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A runtime object spliced into a script inlines as the plain data it is, so
// it can't carry `#` — the bundle's one reserved key — either.
it("reservedKeySplice", async (t) => {
  await snapshotCase(
    t,
    "reservedKeySplice",
    cs.create(
      "2dryy6my0qubf:8:45",
      { params: [{ kind: "splice", value: { "#": "value" }, bindings: [] }] },
      {
        code: "export default $0 => $0();",
        map: '{"version":3,"mappings":"eAOgDA,EAAA,IAAAA,EAAA,EAAC","names":["$0"],"ignoreList":[],"sources":["reserved-key-splice.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
