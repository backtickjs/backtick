import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createRoot } from "@backtickjs/solid-js";
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "2y61w4tnq5y93:13:8",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => {\n    const a = 1;\n    const key = "dyn";\n    const counter = {\n        a,\n        count: 0,\n        [key + "amic"]: true,\n        bump() {\n            this.count = this.count + 1;\n            return this.count;\n        },\n        get double() {\n            return this.count * 2;\n        },\n        set to(value) {\n            this.count = value;\n        }\n    };\n    counter.bump();\n    counter.to = 5;\n    return [counter.a, counter.dynamic, counter.bump(), counter.double];\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAYWA,QAAA,IAAAA,QAAA,EAAW,CAAC;IACb,MAAMC,CAAC,GAAG,CAAC;IACX,MAAMC,GAAG,GAAG,KAAK;IACjB,MAAMC,OAAO,GAAG;QACdF,CAAC;QACDG,KAAK,EAAE,CAAC;QACR,CAACF,GAAG,GAAG,MAAM,GAAG,IAAI;QACpBG,IAAIA;YACF,IAAI,CAACD,KAAK,GAAG,IAAI,CAACA,KAAK,GAAG,CAAC;YAC3B,OAAO,IAAI,CAACA,KAAK;QACnB,CAAC;QACD,IAAIE,MAAMA;YACR,OAAO,IAAI,CAACF,KAAK,GAAG,CAAC;QACvB,CAAC;QACD,IAAIG,EAAEA,CAACC,KAAa;YAClB,IAAI,CAACJ,KAAK,GAAGI,KAAK;QACpB;KACD;IACDL,OAAO,CAACE,IAAI,EAAE;IACdF,OAAO,CAACI,EAAE,GAAG,CAAC;IACd,OAAO,CAACJ,OAAO,CAACF,CAAC,EAAEE,OAAO,CAACM,OAAO,EAAEN,OAAO,CAACE,IAAI,EAAE,EAAEF,OAAO,CAACG,MAAM,CAAC;AACrE,CAAC,CAAC","names":["$splice0","a","key","counter","count","bump","double","to","value","dynamic"],"ignoreList":[],"sources":["objects/literal-forms.test.tsx"]}',
  dependencies: [],
};
const $module1 = {
  id: "2y61w4tnq5y93:43:8",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => {\n    const names = ["a"];\n    const none = null;\n    const o = {\n        inner: {\n            z: 3\n        }\n    };\n    const empty = null;\n    return [names?.[0], none?.[0], o?.inner.z, empty?.inner.z];\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA0CWA,QAAA,IAAAA,QAAA,EAAW,CAAC;IACb,MAAMC,KAAK,GAAG,CAAC,GAAG,CAA6B;IAC/C,MAAMC,IAAI,GAAG,IAAgC;IAC7C,MAAMC,CAAC,GAAG;QAAEC,KAAK,EAAE;YAAEC,CAAC,EAAE;SAAC;KAAuC;IAChE,MAAMC,KAAK,GAAG,IAAuC;IACrD,OAAO,CAACL,KAAK,GAAG,CAAC,CAAC,EAAEC,IAAI,GAAG,CAAC,CAAC,EAAEC,CAAC,EAAEC,KAAK,CAACC,CAAC,EAAEC,KAAK,EAAEF,KAAK,CAACC,CAAC,CAAC;AAC5D,CAAC,CAAC","names":["$splice0","names","none","o","inner","z","empty"],"ignoreList":[],"sources":["objects/literal-forms.test.tsx"]}',
  dependencies: [],
};
// An object literal's every form, and optional access, as JavaScript reads
// them.
describe("object literals", () => {
  it("shorthand, methods, accessors, computed keys and `this`", async () => {
    assert.deepEqual(
      await evaluate(
        cs.create($module0, [
          { kind: "splice", value: createRoot, bindings: [] },
        ]),
      ),
      [1, true, 6, 12],
    );
  });
  it("`?.[` and a chain mixing `?.` and `.`", async () => {
    assert.deepEqual(
      await evaluate(
        cs.create($module1, [
          { kind: "splice", value: createRoot, bindings: [] },
        ]),
      ),
      ["a", undefined, 3, undefined],
    );
  });
});
