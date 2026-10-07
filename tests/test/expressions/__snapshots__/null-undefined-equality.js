import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "../evaluate.ts";
import { createRoot } from "@backtickjs/solid-js";
const $module0 = {
  id: "dggvpbrq8knn:10:32",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => null === null);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBASmCA,QAAA,IAAAA,QAAA,EAAW,CAAC,MAAM,IAAI,KAAK,IAAI,CAAC","names":["$splice0"],"ignoreList":[],"sources":["expressions/null-undefined-equality.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module1 = {
  id: "dggvpbrq8knn:12:21",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => undefined === undefined);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAWwBA,QAAA,IAAAA,QAAA,EAAW,CAAC,MAAMC,SAAS,KAAKA,SAAS,CAAC","names":["$splice0","undefined"],"ignoreList":[],"sources":["expressions/null-undefined-equality.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module2 = {
  id: "dggvpbrq8knn:19:21",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => null !== undefined);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkBwBA,QAAA,IAAAA,QAAA,EAAW,CAAC,MAAM,IAAI,KAAKC,SAAS,CAAC","names":["$splice0","undefined"],"ignoreList":[],"sources":["expressions/null-undefined-equality.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module3 = {
  id: "dggvpbrq8knn:23:21",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => null === undefined);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAsBwBA,QAAA,IAAAA,QAAA,EAAW,CAAC,MAAM,IAAI,KAAKC,SAAS,CAAC","names":["$splice0","undefined"],"ignoreList":[],"sources":["expressions/null-undefined-equality.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module4 = {
  id: "dggvpbrq8knn:34:21",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1, $splice2, $splice3, $splice4) => $splice0()(() => {\n    const names = ["a"];\n    return [$splice1() === undefined, $splice2() !== null, $splice3() === null, $splice4() !== undefined, names[1] === undefined, names[1] !== null];\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAiCwB,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,KAAAJ,QAAA,EAAW,CAAC;IAC5B,MAAMK,KAAK,GAAG,CAAC,GAAG,CAAC;IACnB,OAAO,CACLJ,QAAA,EAAQ,KAAKK,SAAS,EACtBJ,QAAA,EAAQ,KAAK,IAAI,EACjBC,QAAA,EAAM,KAAK,IAAI,EACfC,QAAA,EAAM,KAAKE,SAAS,EACpBD,KAAK,CAAC,CAAC,CAAC,KAAKC,SAAS,EACtBD,KAAK,CAAC,CAAC,CAAC,KAAK,IAAI,CAClB;AACH,CAAC,CAAC","names":["$splice0","$splice1","$splice2","$splice3","$splice4","names","undefined"],"ignoreList":[],"sources":["expressions/null-undefined-equality.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
// `null` and `undefined` are two values, each equal only to itself.
describe("null and undefined", () => {
  it("are each equal to themselves", async () => {
    assert.equal(await evaluate(cs.create($module0, [createRoot])), true);
    assert.equal(await evaluate(cs.create($module1, [createRoot])), true);
  });
  it("are not equal to each other", async () => {
    assert.equal(await evaluate(cs.create($module2, [createRoot])), true);
    assert.equal(await evaluate(cs.create($module3, [createRoot])), false);
  });
  // The same holds wherever the value came from: a splice, or a read past
  // the end of an array.
  it("compare the same when they arrive another way", async () => {
    const nothing = undefined;
    const empty = null;
    assert.deepEqual(
      await evaluate(
        cs.create($module4, [createRoot, nothing, nothing, empty, empty]),
      ),
      [true, true, true, true, true, true],
    );
  });
});
