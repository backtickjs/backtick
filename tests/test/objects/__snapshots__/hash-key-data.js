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
      "($0) => () => $0()",
      '{"version":3,"file":"hash-key-data.test.jsx","sourceRoot":"","sources":["objects/hash-key-data.test.tsx"],"names":[],"mappings":"AAO0C,QAAA,GAAG,EAAE,CAAC,IAAC"}',
    ),
  );
});
