import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "1aostf2ucnrf8:6:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => class Point {\n    x;\n    constructor(x) {\n        this.x = x;\n    }\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAKiB,YAAMA,KAAK;IACLC,CAAA;IAArBC,YAAqBD,CAAS;QAAT,KAAAA,CAAC,GAADA,CAAC;IAAW;CAClC","names":["Point","x","constructor"],"ignoreList":[],"sources":["objects/class-identity.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "class",
};
const $module1 = {
  id: "1aostf2ucnrf8:10:24",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => class Made {\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAS2B,YAAMA,IAAI;CAAG","names":["Made"],"ignoreList":[],"sources":["objects/class-identity.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "class",
};
const $module2 = {
  id: "1aostf2ucnrf8:15:32",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0() === $splice1();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAcmC,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAM,KAAKC,QAAA,EAAM","names":["$splice0","$splice1"],"ignoreList":[],"sources":["objects/class-identity.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module3 = {
  id: "1aostf2ucnrf8:19:32",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0() === $splice1();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkBmC,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAc,KAAKC,QAAA,EAAc","names":["$splice0","$splice1"],"ignoreList":[],"sources":["objects/class-identity.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module4 = {
  id: "1aostf2ucnrf8:23:32",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const make = label => $splice0(label);\n    const A = make("a");\n    return [A === make("b"), new A().name];\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAsBmCA,QAAA;IAC7B,MAAMC,IAAI,GAAIC,KAAa,IACzBF,QAAA,CAAAE,KAAA,CAEG;IACL,MAAMC,CAAC,GAAGF,IAAI,CAAC,GAAG,CAAC;IACnB,OAAO,CAACE,CAAC,KAAKF,IAAI,CAAC,GAAG,CAAC,EAAE,IAAIE,CAAC,EAAE,CAACC,IAAI,CAAC;AACxC,CAAC","names":["$splice0","make","label","A","name"],"ignoreList":[],"sources":["objects/class-identity.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: ["label$1aostf2ucnrf8$3"] }],
  kind: "block",
};
const $module5 = {
  id: "1aostf2ucnrf8:25:10",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => class Labelled {\n    name = $capture0;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAwBaA,SAAA,UAAMC,QAAQ;IACjBC,IAAI,GAAGF,SAAK;CACb","names":["$capture0","Labelled","name"],"ignoreList":[],"sources":["objects/class-identity.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "capture", key: "label$1aostf2ucnrf8$3" }],
  kind: "class",
};
const Point = cs.create($module0, []);
const makeClass = () => cs.create($module1, []);
// A class is one class for the bundle, as a module-level class is.
describe("a class script", () => {
  it("is the same class at every read", async () => {
    assert.equal(await evaluate(cs.create($module2, [Point, Point])), true);
  });
  it("is one class per script, not per code", async () => {
    assert.equal(
      await evaluate(cs.create($module3, [makeClass(), makeClass()])),
      false,
    );
  });
  it("is made at each run where it captures", async () => {
    const same = await evaluate(cs.create($module4, [cs.create($module5, [])]));
    assert.deepEqual(same, [false, "a"]);
  });
});
