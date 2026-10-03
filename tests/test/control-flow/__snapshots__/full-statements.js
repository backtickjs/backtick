import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createRoot } from "@backtickjs/solid-js";
import { evaluate } from "../evaluate.ts";
// Statements a script writes as any JavaScript function would, each running as
// the language says.
describe("statements", () => {
  it("`var`, scoped to the function, and in a `for` header", async () => {
    assert.equal(
      await evaluate(
        cs.create(
          "1h786qz0qm14w:13:8",
          { params: [{ kind: "splice", value: createRoot, bindings: [] }] },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => {\n    {\n        var late = 1;\n    }\n    let total = 0;\n    for (var i = 0; i < 3; i = i + 1) {\n        total = total + i;\n    }\n    return late + " " + total + " " + i;\n});\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;kBAYWA,QAAA,IAAAA,QAAA,EAAW,CAAC;IACb;QACE,IAAIC,IAAI,GAAG,CAAC;IACd;IACA,IAAIC,KAAK,GAAG,CAAC;IACb,KAAK,IAAIC,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAGA,CAAC,GAAG,CAAC,EAAE;QAChCD,KAAK,GAAGA,KAAK,GAAGC,CAAC;IACnB;IACA,OAAOF,IAAI,GAAG,GAAG,GAAGC,KAAK,GAAG,GAAG,GAAGC,CAAC;AACrC,CAAC,CAAC","names":["$splice0","late","total","i"],"ignoreList":[],"sources":["control-flow/full-statements.test.tsx"]}',
          [],
        ),
      ),
      "1 3 3",
    );
  });
  it("`let` without an initializer, and several declarators", async () => {
    assert.deepEqual(
      await evaluate(
        cs.create(
          "1h786qz0qm14w:31:8",
          { params: [{ kind: "splice", value: createRoot, bindings: [] }] },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => {\n    let x;\n    const a = 1, b = 2;\n    return [x, a + b];\n});\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;kBA8BWA,QAAA,IAAAA,QAAA,EAAW,CAAC;IACb,IAAIC,CAAC;IACL,MAAMC,CAAC,GAAG,CAAC,EACTC,CAAC,GAAG,CAAC;IACP,OAAO,CAACF,CAAC,EAAEC,CAAC,GAAGC,CAAC,CAAC;AACnB,CAAC,CAAC","names":["$splice0","x","a","b"],"ignoreList":[],"sources":["control-flow/full-statements.test.tsx"]}',
          [],
        ),
      ),
      [undefined, 3],
    );
  });
  it("a labeled `break` and `continue`", async () => {
    assert.deepEqual(
      await evaluate(
        cs.create(
          "1h786qz0qm14w:45:8",
          { params: [{ kind: "splice", value: createRoot, bindings: [] }] },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => {\n    const seen = [];\n    outer: for (let i = 0; i < 3; i++) {\n        for (let j = 0; j < 3; j++) {\n            if (j === 1)\n                continue outer;\n            if (i === 2)\n                break outer;\n            seen.push(i + ":" + j);\n        }\n    }\n    return seen;\n});\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;kBA4CWA,QAAA,IAAAA,QAAA,EAAW,CAAC;IACb,MAAMC,IAAI,GAAa,EAAE;IACzBC,KAAK,EAAE,KAAK,IAAIC,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAG,CAAC,EAAEA,CAAC,EAAE,EAAE;QACjC,KAAK,IAAIC,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAG,CAAC,EAAEA,CAAC,EAAE,EAAE;YAC1B,IAAIA,CAAC,KAAK,CAAC;gBAAE,SAASF,KAAK;YAC3B,IAAIC,CAAC,KAAK,CAAC;gBAAE,MAAMD,KAAK;YACxBD,IAAI,CAACI,IAAI,CAACF,CAAC,GAAG,GAAG,GAAGC,CAAC,CAAC;QACxB;IACF;IACA,OAAOH,IAAI;AACb,CAAC,CAAC","names":["$splice0","seen","outer","i","j","push"],"ignoreList":[],"sources":["control-flow/full-statements.test.tsx"]}',
          [],
        ),
      ),
      ["0:0", "1:0"],
    );
  });
  it("`finally`, which runs however the block ends", async () => {
    assert.deepEqual(
      await evaluate(
        cs.create(
          "1h786qz0qm14w:64:8",
          { params: [{ kind: "splice", value: createRoot, bindings: [] }] },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => {\n    const log = [];\n    const run = fail => {\n        try {\n            if (fail)\n                throw new Error("no");\n            log.push("tried");\n        }\n        catch (error) {\n            log.push("caught");\n        }\n        finally {\n            log.push("finally");\n        }\n    };\n    run(false);\n    run(true);\n    const overridden = (() => {\n        try {\n            return 1;\n        }\n        finally {\n            return 2;\n        }\n    })();\n    return [log, overridden];\n});\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;kBA+DWA,QAAA,IAAAA,QAAA,EAAW,CAAC;IACb,MAAMC,GAAG,GAAa,EAAE;IACxB,MAAMC,GAAG,GAAIC,IAAa;QACxB,IAAI;YACF,IAAIA,IAAI;gBAAE,MAAM,IAAIC,KAAK,CAAC,IAAI,CAAC;YAC/BH,GAAG,CAACI,IAAI,CAAC,OAAO,CAAC;QACnB,CAAC;QAAC,OAAOC,KAAK,EAAE;YACdL,GAAG,CAACI,IAAI,CAAC,QAAQ,CAAC;QACpB,CAAC;gBAAS;YACRJ,GAAG,CAACI,IAAI,CAAC,SAAS,CAAC;QACrB;IACF,CAAC;IACDH,GAAG,CAAC,KAAK,CAAC;IACVA,GAAG,CAAC,IAAI,CAAC;IACT,MAAMK,UAAU,GAAG,CAAC;QAClB,IAAI;YACF,OAAO,CAAC;QACV,CAAC;gBAAS;YACR,OAAO,CAAC;QACV;IACF,CAAC,GAAG;IACJ,OAAO,CAACN,GAAG,EAAEM,UAAU,CAAC;AAC1B,CAAC,CAAC","names":["$splice0","log","run","fail","Error","push","error","overridden"],"ignoreList":[],"sources":["control-flow/full-statements.test.tsx"]}',
          [],
        ),
      ),
      [["tried", "finally", "caught", "finally"], 2],
    );
  });
  it("a destructured `catch` binding", async () => {
    assert.equal(
      await evaluate(
        cs.create(
          "1h786qz0qm14w:95:8",
          { params: [{ kind: "splice", value: createRoot, bindings: [] }] },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => {\n    try {\n        throw new Error("boom");\n    }\n    catch ({ message }) {\n        return message;\n    }\n});\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;kBA8FWA,QAAA,IAAAA,QAAA,EAAW,CAAC;IACb,IAAI;QACF,MAAM,IAAIC,KAAK,CAAC,MAAM,CAAC;IACzB,CAAC;IAAC,OAAO,EAAEC,SAAc,EAAE;QACzB,OAAOA,OAAO;IAChB;AACF,CAAC,CAAC","names":["$splice0","Error","message"],"ignoreList":[],"sources":["control-flow/full-statements.test.tsx"]}',
          [],
        ),
      ),
      "boom",
    );
  });
});
