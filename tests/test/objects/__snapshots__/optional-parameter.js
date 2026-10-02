import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `?` marks an optional parameter: a caller may omit it or pass `undefined`,
// and either way it binds `undefined`. `null` is a value of its own and not
// accepted here.
const greet = cs.create(
  "1i6s8vesd5nbi:8:14",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => name => {\n    return name?.concat("!");\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAOiB,MAACA,IAAa;IAC7B,OAAOA,IAAI,EAAEC,MAAM,CAAC,GAAG,CAAC;AAC1B,CAAC","names":["name","concat"],"ignoreList":[],"sources":["objects/optional-parameter.test.tsx"]}',
  [],
);
// A function-typed annotation unions parenthesized: `(() => number) |
// undefined`.
const double = cs.create(
  "1i6s8vesd5nbi:14:15",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => () => 2;\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAakB,YAAM,CAAC","names":[],"ignoreList":[],"sources":["objects/optional-parameter.test.tsx"]}',
  [],
);
const callIfGiven = cs.create(
  "1i6s8vesd5nbi:16:20",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => cb => {\n    return cb?.() ?? 0;\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAeuB,MAACA,EAAiB;IACvC,OAAOA,EAAE,IAAI,IAAI,CAAC;AACpB,CAAC","names":["cb"],"ignoreList":[],"sources":["objects/optional-parameter.test.tsx"]}',
  [],
);
it("optionalParameter", async (t) => {
  await snapshotCase(
    t,
    "optionalParameter",
    cs.create(
      "1i6s8vesd5nbi:24:4",
      {
        params: [
          { kind: "splice", value: greet, bindings: [] },
          { kind: "splice", value: callIfGiven, bindings: [] },
          { kind: "splice", value: double, bindings: [] },
        ],
      },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1, $splice2) => ({\n    named: $splice0()("hi"),\n    explicit: $splice0()(undefined),\n    omitted: $splice0()(),\n    supplied: $splice1()($splice2()),\n    fallback: $splice1()(undefined),\n    omittedCallback: $splice1()()\n});\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAuBO,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA,MAAC;IACFC,KAAK,EAAEH,QAAA,EAAM,CAAC,IAAI,CAAC;IACnBI,QAAQ,EAAEJ,QAAA,EAAM,CAACK,SAAS,CAAC;IAC3BC,OAAO,EAAEN,QAAA,EAAM,EAAE;IACjBO,QAAQ,EAAEN,QAAA,EAAY,CAACC,QAAA,EAAO,CAAC;IAC/BM,QAAQ,EAAEP,QAAA,EAAY,CAACI,SAAS,CAAC;IACjCI,eAAe,EAAER,QAAA,EAAY;CAC9B,CAAC","names":["$splice0","$splice1","$splice2","named","explicit","undefined","omitted","supplied","fallback","omittedCallback"],"ignoreList":[],"sources":["objects/optional-parameter.test.tsx"]}',
      [],
    ),
  );
});
