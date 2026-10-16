import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
const createRoot = {
  "@backtickjs": "ClientImport",
  name: "createRoot",
  from: "solid-js",
  version: "1.9.14",
};
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "2ei948aod194:14:8",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => {\n    const x = 1;\n    const both = {\n        x,\n        Math\n    };\n    return [both.x, both.Math.max(2, 3)];\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAaWA,QAAA,IAAAA,QAAA,EAAW,CAAC;IACb,MAAMC,CAAC,GAAG,CAAC;IACX,MAAMC,IAAI,GAAG;QAAED,CAAC;QAAEE;KAAM;IACxB,OAAO,CAACD,IAAI,CAACD,CAAC,EAAEC,IAAI,CAACC,IAAI,CAACC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;AACtC,CAAC,CAAC","names":["$splice0","x","both","Math","max"],"ignoreList":[],"sources":["bindings/renamed-positions.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module1 = {
  id: "2ei948aod194:27:8",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => {\n    const start = {\n        n: 1\n    };\n    const copy = {\n        n: start.n + 1\n    };\n    class Base {\n        twice() {\n            return copy.n * 2;\n        }\n    }\n    class Child extends Base {\n    }\n    return [copy.n, new Child().twice()];\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA0BWA,QAAA,IAAAA,QAAA,EAAW,CAAC;IACb,MAAMC,KAAK,GAAG;QAAEC,CAAC,EAAE;KAAG;IACtB,MAAMC,IAAI,GAAiB;QAAED,CAAC,EAAED,KAAK,CAACC,CAAC,GAAG;KAAG;IAC7C,MAAME,IAAI;QACRC,KAAKA;YACH,OAAOF,IAAI,CAACD,CAAC,GAAG,CAAC;QACnB;;IAEF,MAAMI,KAAM,SAAQF,IAAI;KAAA;IACxB,OAAO,CAACD,IAAI,CAACD,CAAC,EAAE,IAAII,KAAK,EAAE,CAACD,KAAK,EAAE,CAAC;AACtC,CAAC,CAAC","names":["$splice0","start","n","copy","Base","twice","Child"],"ignoreList":[],"sources":["bindings/renamed-positions.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module2 = {
  id: "2ei948aod194:46:8",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => {\n    const game = {\n        imps: [{\n                x: 1\n            }]\n    };\n    const first = game.imps[0];\n    return first.x;\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA6CWA,QAAA,IAAAA,QAAA,EAAW,CAAC;IACb,MAAMC,IAAI,GAAG;QAAEC,IAAI,EAAE,CAAC;gBAAEC,CAAC,EAAE;aAAG;KAAG;IACjC,MAAMC,KAAK,GAA+BH,IAAI,CAACC,IAAI,CAAC,CAAC,CAAC;IACtD,OAAOE,KAAK,CAACD,CAAC;AAChB,CAAC,CAAC","names":["$splice0","game","imps","x","first"],"ignoreList":[],"sources":["bindings/renamed-positions.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
// A script's own names and the client's globals, read where the checker sees
// them written another way: a shorthand, a type's `typeof`, a class's
// `extends`.
describe("a script's names, wherever they stand", () => {
  it("as a shorthand, its own and a global's", async () => {
    assert.deepEqual(await evaluate(cs.create($module0, [createRoot])), [1, 3]);
  });
  it("in a type's `typeof`, and a class's `extends`", async () => {
    assert.deepEqual(await evaluate(cs.create($module1, [createRoot])), [2, 4]);
  });
  it("in a `typeof` nested in a type", async () => {
    assert.equal(await evaluate(cs.create($module2, [createRoot])), 1);
  });
});
