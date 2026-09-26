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
    code: "export default () => o => {\n  return [o.label, o.inner?.z ?? 0];\n};",
    map: '{"version":3,"mappings":"eAOgB,MAACA,CAA4C,IAAI;EAC/D,OAAO,CAACA,CAAC,CAACC,KAAK,EAAED,CAAC,CAACE,KAAK,EAAEC,CAAC,IAAI,CAAC,CAAC;AACnC,CAAC","names":["o","label","inner","z"],"ignoreList":[],"sources":["optional-property.test.tsx"]}',
    imports: [],
    exportAt: 0,
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
        code: 'export default $0 => ({\n  present: $0()({\n    label: "a",\n    inner: {\n      z: 3\n    }\n  }),\n  partial: $0()({\n    label: "b",\n    inner: {}\n  }),\n  omitted: $0()({\n    label: "c"\n  })\n});',
        map: '{"version":3,"mappings":"eAeOA,EAAA,KAAC;EACFC,OAAO,EAAED,EAAA,EAAK,CAAC;IAAEE,KAAK,EAAE,GAAG;IAAEC,KAAK,EAAE;MAAEC,CAAC,EAAE;IAAC;EAAE,CAAE,CAAC;EAC/CC,OAAO,EAAEL,EAAA,EAAK,CAAC;IAAEE,KAAK,EAAE,GAAG;IAAEC,KAAK,EAAE;EAAE,CAAE,CAAC;EACzCG,OAAO,EAAEN,EAAA,EAAK,CAAC;IAAEE,KAAK,EAAE;EAAG,CAAE;CAC9B,CAAC","names":["$0","present","label","inner","z","partial","omitted"],"ignoreList":[],"sources":["optional-property.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
