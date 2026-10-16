import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, once } from "@backtickjs/core";
const createSignal = {
  "@backtickjs": "ClientImport",
  name: "createSignal",
  from: "solid-js",
  version: "1.9.14",
};
import { bundle } from "../evaluate.ts";
const $module0 = {
  id: "24egnsdqmbc2n:13:12",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const x = 1;\n    return $splice0(x);\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAYeA,QAAA;IACP,MAAMC,CAAC,GAAG,CAAC;IACX,OAAOD,QAAA,CAAAC,CAAA,CAAkB;AAC3B,CAAC","names":["$splice0","x"],"ignoreList":[],"sources":["once/refused.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: ["x$24egnsdqmbc2n$0"] }],
  kind: "block",
};
const $module1 = {
  id: "24egnsdqmbc2n:15:22",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => $capture0 + 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAcyBA,SAAA,IAAAA,SAAC,GAAG,CAAC","names":["$capture0"],"ignoreList":[],"sources":["once/refused.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "capture", key: "x$24egnsdqmbc2n$0" }],
  kind: "expression",
};
const $module2 = {
  id: "24egnsdqmbc2n:23:23",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => ({\n    label: $splice0()\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAsB0BA,QAAA,KAAC;IAAEC,KAAK,EAAED,QAAA;CAAQ,CAAC","names":["$splice0","label"],"ignoreList":[],"sources":["once/refused.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module3 = {
  id: "24egnsdqmbc2n:24:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0().label;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAuBgBA,QAAA,IAAAA,QAAA,EAAI,CAACC,KAAK","names":["$splice0","label"],"ignoreList":[],"sources":["once/refused.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module4 = {
  id: "24egnsdqmbc2n:26:18",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => () => {\n    const name = "n";\n    return $splice0(name);\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAyBqBA,QAAA;IACf,MAAMC,IAAI,GAAG,GAAG;IAChB,OAAOD,QAAA,CAAAC,IAAA,CAA+B;AACxC,CAAC","names":["$splice0","name"],"ignoreList":[],"sources":["once/refused.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: ["name$24egnsdqmbc2n$1"] }],
  kind: "function",
};
const $module5 = {
  id: "24egnsdqmbc2n:28:30",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => $capture0;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA2BiCA,SAAA,IAAAA,SAAI","names":["$capture0"],"ignoreList":[],"sources":["once/refused.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "capture", key: "name$24egnsdqmbc2n$1" }],
  kind: "expression",
};
// A `once` value is made at the top of the bundle, outside every script, so
// nothing of a script around it can reach it: neither a variable it reads nor
// one a fragment it splices reads.
describe("once is refused", () => {
  it("for a script that reads a variable of the script around it", () => {
    assert.throws(
      () => cs.create($module0, [once(cs.create($module1, []))]),
      /Can't make this script `once`: it reads `x` from the script around it/,
    );
  });
  it("for a fragment of the script around it, spliced in", async () => {
    async function Boxed({ label }) {
      const box = once(cs.create($module2, [label]));
      return cs.create($module3, [box]);
    }
    const outer = cs.create($module4, [
      _jsx(Boxed, { label: cs.create($module5, []) }),
    ]);
    await assert.rejects(
      () => bundle(outer),
      /Can't thread the capture `name`: .* A `once` script is made at the top of the bundle/,
    );
  });
  it("for what isn't a script", () => {
    assert.throws(() => once(createSignal), /`once` takes a script/);
    assert.throws(() => once("text"), /`once` takes a script/);
  });
});
