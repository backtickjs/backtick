import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1pn78z89zmc5d:8:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => o => {\n    return [o.label, o.inner?.z ?? 0];\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAOgB,MAACA,CAA4C;IAC3D,OAAO,CAACA,CAAC,CAACC,KAAK,EAAED,CAAC,CAACE,KAAK,EAAEC,CAAC,IAAI,CAAC,CAAC;AACnC,CAAC","names":["o","label","inner","z"],"ignoreList":[],"sources":["objects/optional-property.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "function",
};
const $module1 = {
  id: "1pn78z89zmc5d:16:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => ({\n    present: $splice0()({\n        label: "a",\n        inner: {\n            z: 3\n        }\n    }),\n    partial: $splice0()({\n        label: "b",\n        inner: {}\n    }),\n    omitted: $splice0()({\n        label: "c"\n    })\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAeOA,QAAA,KAAC;IACFC,OAAO,EAAED,QAAA,EAAK,CAAC;QAAEE,KAAK,EAAE,GAAG;QAAEC,KAAK,EAAE;YAAEC,CAAC,EAAE;SAAC;KAAI,CAAC;IAC/CC,OAAO,EAAEL,QAAA,EAAK,CAAC;QAAEE,KAAK,EAAE,GAAG;QAAEC,KAAK,EAAE;KAAI,CAAC;IACzCG,OAAO,EAAEN,QAAA,EAAK,CAAC;QAAEE,KAAK,EAAE;KAAK;CAC9B,CAAC","names":["$splice0","present","label","inner","z","partial","omitted"],"ignoreList":[],"sources":["objects/optional-property.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
// `?` on a property means omittable: an absent member reads as null — the
// language's absent value; `undefined` never arises — and `?.` composes on
// top for the nullable reads.
const read = cs.create($module0, []);
it("optionalProperty", async (t) => {
  await snapshotCase(t, "optionalProperty", cs.create($module1, [read]));
});
