import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "ve43281oi72i:6:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => value => [value, value];\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAKgB,MAAKA,KAAQ,IAAa,CAACA,KAAK,EAAEA,KAAK,CAAC","names":["value"],"ignoreList":[],"sources":["expressions/instantiation-expression.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "function",
};
const $module1 = {
  id: "ve43281oi72i:11:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    function wrap(value) {\n        return [value];\n    }\n    const wrapNumber = wrap;\n    return wrapNumber(1);\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAUoC;IAC9B,SAASA,IAAIA,CAAIC,KAAQ;QACvB,OAAO,CAACA,KAAK,CAAC;IAChB;IACA,MAAMC,UAAU,GAAGF,IAAY;IAC/B,OAAOE,UAAU,CAAC,CAAC,CAAC;AACtB,CAAC","names":["wrap","value","wrapNumber"],"ignoreList":[],"sources":["expressions/instantiation-expression.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
const $module2 = {
  id: "ve43281oi72i:22:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const pairString = $splice0();\n    return pairString("a");\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAqBoCA,QAAA;IAC9B,MAAMC,UAAU,GAAGD,QAAA,EAAa;IAChC,OAAOC,UAAU,CAAC,GAAG,CAAC;AACxB,CAAC","names":["$splice0","pairString"],"ignoreList":[],"sources":["expressions/instantiation-expression.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "block",
};
const pair = cs.create($module0, []);
// `f<T>`, a function given its type arguments without a call: a value.
describe("an instantiation expression", () => {
  it("names a script's own function", async () => {
    const value = await evaluate(cs.create($module1, []));
    assert.deepEqual(value, [1]);
  });
  it("names a splice", async () => {
    const value = await evaluate(cs.create($module2, [pair]));
    assert.deepEqual(value, ["a", "a"]);
  });
});
