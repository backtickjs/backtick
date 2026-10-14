import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "qp6pfo1a5jaq:7:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => class Base {\n    value;\n    constructor(value) {\n        this.value = value;\n    }\n    greet() {\n        return "hi " + String(this.value);\n    }\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAMgB,YAAMA,IAAI;IACHC,KAAA;IAArBC,YAAqBD,KAAQ;QAAR,KAAAA,KAAK,GAALA,KAAK;IAAM;IAChCE,KAAKA;QACH,OAAO,KAAK,GAAGC,MAAM,CAAC,IAAI,CAACH,KAAK,CAAC;IACnC;CACD","names":["Base","value","constructor","greet","String"],"ignoreList":[],"sources":["objects/class-extends-splice.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "class",
};
const $module1 = {
  id: "qp6pfo1a5jaq:16:36",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    class Loud extends $splice0() {\n        greet() {\n            return super.greet() + "!";\n        }\n    }\n    return new Loud("Ada").greet();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAeuCA,QAAA;IACjC,MAAMC,IAAK,SAAQD,QAAA,EAAK;QACtBE,KAAKA;YACH,OAAO,KAAK,CAACA,KAAK,EAAE,GAAG,GAAG;QAC5B;;IAEF,OAAO,IAAID,IAAI,CAAC,KAAK,CAAC,CAACC,KAAK,EAAE;AAChC,CAAC","names":["$splice0","Loud","greet"],"ignoreList":[],"sources":["objects/class-extends-splice.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "block",
};
const $module2 = {
  id: "qp6pfo1a5jaq:28:36",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    class Counted extends $splice0() {\n        greet() {\n            return super.greet() + " times";\n        }\n    }\n    return new Counted(3).greet();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA2BuCA,QAAA;IACjC,MAAMC,OAAQ,SAAQD,QAAA,EAAa;QACjCE,KAAKA;YACH,OAAO,KAAK,CAACA,KAAK,EAAE,GAAG,QAAQ;QACjC;;IAEF,OAAO,IAAID,OAAO,CAAC,CAAC,CAAC,CAACC,KAAK,EAAE;AAC/B,CAAC","names":["$splice0","Counted","greet"],"ignoreList":[],"sources":["objects/class-extends-splice.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "block",
};
// A class, for scripts to extend.
const Base = cs.create($module0, []);
describe("a class extending a spliced class", () => {
  it("extends it", async () => {
    const greeting = await evaluate(cs.create($module1, [Base]));
    assert.equal(greeting, "hi Ada!");
  });
  it("extends it with type arguments", async () => {
    const greeting = await evaluate(cs.create($module2, [Base]));
    assert.equal(greeting, "hi 3 times");
  });
});
