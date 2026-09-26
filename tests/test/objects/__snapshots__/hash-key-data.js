import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Only the bare `#` key is reserved: a plain data object is free to use keys
// that merely start with `#`, even ones spelled like the tagged forms.
it("hashKeyData", async (t) => {
  await snapshotCase(
    t,
    "hashKeyData",
    cs.create(
      "m50lyvn0wkye:8:39",
      { params: [{ kind: "splice", value: { "#call": "#f0" }, bindings: [] }] },
      {
        code: "export default $0 => () => $0();",
        map: '{"version":3,"mappings":"eAO0CA,EAAA,UAAMA,EAAA,EAAC","names":["$0"],"ignoreList":[],"sources":["hash-key-data.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
