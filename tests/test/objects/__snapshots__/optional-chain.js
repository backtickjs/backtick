import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `?.` propagates null one step: a null receiver reads as null — the
// language's absent value; `undefined` never arises. A chain spells `?.` at
// each access, and a null method receiver skips the call.
const pick = cs.create(
  "2dtorvijco8u0:8:13",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => p => {\n    return p?.x;\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAOgB,MAACA,CAAuB;IACtC,OAAOA,CAAC,EAAEC,CAAC;AACb,CAAC","names":["p","x"],"ignoreList":[],"sources":["objects/optional-chain.test.tsx"]}',
  [],
);
const deep = cs.create(
  "2dtorvijco8u0:12:13",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => o => {\n    return o?.inner?.z;\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAWgB,MAACA,CAAyC;IACxD,OAAOA,CAAC,EAAEC,KAAK,EAAEC,CAAC;AACpB,CAAC","names":["o","inner","z"],"ignoreList":[],"sources":["objects/optional-chain.test.tsx"]}',
  [],
);
const shout = cs.create(
  "2dtorvijco8u0:16:14",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => s => {\n    return s?.concat("!");\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAeiB,MAACA,CAAgB;IAChC,OAAOA,CAAC,EAAEC,MAAM,CAAC,GAAG,CAAC;AACvB,CAAC","names":["s","concat"],"ignoreList":[],"sources":["objects/optional-chain.test.tsx"]}',
  [],
);
it("optionalChain", async (t) => {
  await snapshotCase(
    t,
    "optionalChain",
    cs.create(
      "2dtorvijco8u0:24:4",
      {
        params: [
          { kind: "splice", value: pick, bindings: [] },
          { kind: "splice", value: deep, bindings: [] },
          { kind: "splice", value: shout, bindings: [] },
        ],
      },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1, $splice2) => ({\n    found: $splice0()({\n        x: 5\n    }),\n    missing: $splice0()(null),\n    deep: $splice1()({\n        inner: {\n            z: 7\n        }\n    }),\n    cut: $splice1()({\n        inner: null\n    }),\n    top: $splice1()(null),\n    loud: $splice2()("hi"),\n    silent: $splice2()(null)\n});\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAuBO,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA,MAAC;IACFC,KAAK,EAAEH,QAAA,EAAK,CAAC;QAAEI,CAAC,EAAE;KAAG,CAAC;IACtBC,OAAO,EAAEL,QAAA,EAAK,CAAC,IAAI,CAAC;IACpBM,IAAI,EAAEL,QAAA,EAAK,CAAC;QAAEM,KAAK,EAAE;YAAEC,CAAC,EAAE;SAAC;KAAI,CAAC;IAChCC,GAAG,EAAER,QAAA,EAAK,CAAC;QAAEM,KAAK,EAAE;KAAM,CAAC;IAC3BG,GAAG,EAAET,QAAA,EAAK,CAAC,IAAI,CAAC;IAChBU,IAAI,EAAET,QAAA,EAAM,CAAC,IAAI,CAAC;IAClBU,MAAM,EAAEV,QAAA,EAAM,CAAC,IAAI;CACpB,CAAC","names":["$splice0","$splice1","$splice2","found","x","missing","deep","inner","z","cut","top","loud","silent"],"ignoreList":[],"sources":["objects/optional-chain.test.tsx"]}',
      [],
    ),
  );
});
