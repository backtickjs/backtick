import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createRoot } from "@backtickjs/solid-js";
import { evaluate } from "../evaluate.ts";
// A script's own names and the client's globals, read where the checker sees
// them written another way: a shorthand, a type's `typeof`, a class's
// `extends`.
describe("a script's names, wherever they stand", () => {
  it("as a shorthand, its own and a global's", async () => {
    assert.deepEqual(
      await evaluate(
        cs.create(
          "1zxbxktkrvb3o:14:8",
          { params: [{ kind: "splice", value: createRoot, bindings: [] }] },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => {\n    const x = 1;\n    const both = {\n        x,\n        Math\n    };\n    return [both.x, both.Math.max(2, 3)];\n});\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;kBAaWA,QAAA,IAAAA,QAAA,EAAW,CAAC;IACb,MAAMC,CAAC,GAAG,CAAC;IACX,MAAMC,IAAI,GAAG;QAAED,CAAC;QAAEE;KAAM;IACxB,OAAO,CAACD,IAAI,CAACD,CAAC,EAAEC,IAAI,CAACC,IAAI,CAACC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;AACtC,CAAC,CAAC","names":["$splice0","x","both","Math","max"],"ignoreList":[],"sources":["bindings/renamed-positions.test.tsx"]}',
          [],
        ),
      ),
      [1, 3],
    );
  });
  it("in a type's `typeof`, and a class's `extends`", async () => {
    assert.deepEqual(
      await evaluate(
        cs.create(
          "1zxbxktkrvb3o:27:8",
          { params: [{ kind: "splice", value: createRoot, bindings: [] }] },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => {\n    const start = {\n        n: 1\n    };\n    const copy = {\n        n: start.n + 1\n    };\n    class Base {\n        twice() {\n            return copy.n * 2;\n        }\n    }\n    class Child extends Base {\n    }\n    return [copy.n, new Child().twice()];\n});\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;kBA0BWA,QAAA,IAAAA,QAAA,EAAW,CAAC;IACb,MAAMC,KAAK,GAAG;QAAEC,CAAC,EAAE;KAAG;IACtB,MAAMC,IAAI,GAAiB;QAAED,CAAC,EAAED,KAAK,CAACC,CAAC,GAAG;KAAG;IAC7C,MAAME,IAAI;QACRC,KAAKA;YACH,OAAOF,IAAI,CAACD,CAAC,GAAG,CAAC;QACnB;;IAEF,MAAMI,KAAM,SAAQF,IAAI;KAAA;IACxB,OAAO,CAACD,IAAI,CAACD,CAAC,EAAE,IAAII,KAAK,EAAE,CAACD,KAAK,EAAE,CAAC;AACtC,CAAC,CAAC","names":["$splice0","start","n","copy","Base","twice","Child"],"ignoreList":[],"sources":["bindings/renamed-positions.test.tsx"]}',
          [],
        ),
      ),
      [2, 4],
    );
  });
});
