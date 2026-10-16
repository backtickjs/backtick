import { it } from "node:test";
import { cs } from "@backtickjs/core";
const createSignal = {
  "@backtickjs": "ClientImport",
  name: "createSignal",
  from: "solid-js",
  version: "1.9.14",
};
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1xbvwys0tu8ne:9:2",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    return $splice0()(1)[0]();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAQKA,QAAA;IACD,OAAOA,QAAA,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE;AACnB,CAAC","names":["$splice0"],"ignoreList":[],"sources":["stdlib/builtin-hole-sharing.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "block",
};
const $module1 = {
  id: "1xbvwys0tu8ne:13:16",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => n => $splice0()(n + 10);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAYmBA,QAAA,IAACC,CAAS,IAAKD,QAAA,EAAa,CAACC,CAAC,GAAG,EAAE,CAAC","names":["$splice0","n"],"ignoreList":[],"sources":["stdlib/builtin-hole-sharing.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "function",
};
const $module2 = {
  id: "1xbvwys0tu8ne:19:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => {\n    return $splice0() + $splice1();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkBO,CAAAA,QAAA,EAAAC,QAAA;IACD,OAAOD,QAAA,EAAqB,GAAGC,QAAA,EAAgB;AACjD,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["stdlib/builtin-hole-sharing.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "block",
};
const make = (f) => cs.create($module0, [f]);
const wrapped = cs.create($module1, [createSignal]);
it("builtinHoleSharing", async (t) => {
  await snapshotCase(
    t,
    "builtinHoleSharing",
    cs.create($module2, [make(createSignal), make(wrapped)]),
  );
});
