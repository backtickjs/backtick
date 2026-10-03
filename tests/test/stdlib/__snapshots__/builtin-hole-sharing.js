import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
const make = (f) =>
  cs.create(
    "c2jul89zo389:9:2",
    { params: [{ kind: "splice", value: f, bindings: [] }] },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    return $splice0()(1)[0]();\n};\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;kBAQKA,QAAA;IACD,OAAOA,QAAA,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE;AACnB,CAAC","names":["$splice0"],"ignoreList":[],"sources":["stdlib/builtin-hole-sharing.test.tsx"]}',
    [],
  );
const wrapped = cs.create(
  "c2jul89zo389:13:16",
  { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => n => $splice0()(n + 10);\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAYmBA,QAAA,IAACC,CAAS,IAAKD,QAAA,EAAa,CAACC,CAAC,GAAG,EAAE,CAAC","names":["$splice0","n"],"ignoreList":[],"sources":["stdlib/builtin-hole-sharing.test.tsx"]}',
  [],
);
it("builtinHoleSharing", async (t) => {
  await snapshotCase(
    t,
    "builtinHoleSharing",
    cs.create(
      "c2jul89zo389:19:4",
      {
        params: [
          { kind: "splice", value: make(createSignal), bindings: [] },
          { kind: "splice", value: make(wrapped), bindings: [] },
        ],
      },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => {\n    return $splice0() + $splice1();\n};\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAkBO,CAAAA,QAAA,EAAAC,QAAA;IACD,OAAOD,QAAA,EAAqB,GAAGC,QAAA,EAAgB;AACjD,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["stdlib/builtin-hole-sharing.test.tsx"]}',
      [],
    ),
  );
});
