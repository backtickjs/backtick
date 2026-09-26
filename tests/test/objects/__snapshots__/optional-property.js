import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `?` on a property means omittable: an absent member reads as null — the
// language's absent value; `undefined` never arises — and `?.` composes on
// top for the nullable reads.
const read = cs.create(
  "1pn78z89zmc5d:8:13",
  { params: [] },
  {
    code: "export default () => (o) => {\n    return [o.label, o.inner?.z ?? 0];\n};",
    map: '{"version":3,"file":"optional-property.test.jsx","sourceRoot":"","sources":["objects/optional-property.test.tsx"],"names":[],"mappings":"eAOgB,MAAA,CAAC,CAA4C,EAAE,EAAE;IAC/D,OAAO,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,CAAC,KAAK,EAAE,CAAC,IAAI,CAAC,CAAC,CAAC;AACpC,CAAC"}',
  },
);
it("optionalProperty", async (t) => {
  await snapshotCase(
    t,
    "optionalProperty",
    cs.create(
      "1pn78z89zmc5d:16:4",
      { params: [{ kind: "splice", value: read, bindings: [] }] },
      {
        code: 'export default ($0) => ({\n    present: $0()({ label: "a", inner: { z: 3 } }),\n    partial: $0()({ label: "b", inner: {} }),\n    omitted: $0()({ label: "c" }),\n});',
        map: '{"version":3,"file":"optional-property.test.jsx","sourceRoot":"","sources":["objects/optional-property.test.tsx"],"names":[],"mappings":"eAeO,QAAA,CAAC;IACF,OAAO,EAAE,IAAK,CAAC,EAAE,KAAK,EAAE,GAAG,EAAE,KAAK,EAAE,EAAE,CAAC,EAAE,CAAC,EAAE,EAAE,CAAC;IAC/C,OAAO,EAAE,IAAK,CAAC,EAAE,KAAK,EAAE,GAAG,EAAE,KAAK,EAAE,EAAE,EAAE,CAAC;IACzC,OAAO,EAAE,IAAK,CAAC,EAAE,KAAK,EAAE,GAAG,EAAE,CAAC;CAC/B,CAAC"}',
      },
    ),
  );
});
