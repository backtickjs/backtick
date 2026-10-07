import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1i6s8vesd5nbi:8:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => name => {\n    return name?.concat("!");\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAOiB,MAACA,IAAa;IAC7B,OAAOA,IAAI,EAAEC,MAAM,CAAC,GAAG,CAAC;AAC1B,CAAC","names":["name","concat"],"ignoreList":[],"sources":["objects/optional-parameter.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "function",
};
const $module1 = {
  id: "1i6s8vesd5nbi:14:15",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => () => 2;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAakB,YAAM,CAAC","names":[],"ignoreList":[],"sources":["objects/optional-parameter.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "function",
};
const $module2 = {
  id: "1i6s8vesd5nbi:16:20",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => cb => {\n    return cb?.() ?? 0;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAeuB,MAACA,EAAiB;IACvC,OAAOA,EAAE,IAAI,IAAI,CAAC;AACpB,CAAC","names":["cb"],"ignoreList":[],"sources":["objects/optional-parameter.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "function",
};
const $module3 = {
  id: "1i6s8vesd5nbi:24:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1, $splice2, $splice3, $splice4, $splice5, $splice6) => ({\n    named: $splice0()("hi"),\n    explicit: $splice1()(undefined),\n    omitted: $splice2()(),\n    supplied: $splice3()($splice4()),\n    fallback: $splice5()(undefined),\n    omittedCallback: $splice6()()\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAuBO,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,MAAC;IACFC,KAAK,EAAEP,QAAA,EAAM,CAAC,IAAI,CAAC;IACnBQ,QAAQ,EAAEP,QAAA,EAAM,CAACQ,SAAS,CAAC;IAC3BC,OAAO,EAAER,QAAA,EAAM,EAAE;IACjBS,QAAQ,EAAER,QAAA,EAAY,CAACC,QAAA,EAAO,CAAC;IAC/BQ,QAAQ,EAAEP,QAAA,EAAY,CAACI,SAAS,CAAC;IACjCI,eAAe,EAAEP,QAAA,EAAY;CAC9B,CAAC","names":["$splice0","$splice1","$splice2","$splice3","$splice4","$splice5","$splice6","named","explicit","undefined","omitted","supplied","fallback","omittedCallback"],"ignoreList":[],"sources":["objects/optional-parameter.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
// `?` marks an optional parameter: a caller may omit it or pass `undefined`,
// and either way it binds `undefined`. `null` is a value of its own and not
// accepted here.
const greet = cs.create($module0, []);
// A function-typed annotation unions parenthesized: `(() => number) |
// undefined`.
const double = cs.create($module1, []);
const callIfGiven = cs.create($module2, []);
it("optionalParameter", async (t) => {
  await snapshotCase(
    t,
    "optionalParameter",
    cs.create($module3, [
      greet,
      greet,
      greet,
      callIfGiven,
      double,
      callIfGiven,
      callIfGiven,
    ]),
  );
});
