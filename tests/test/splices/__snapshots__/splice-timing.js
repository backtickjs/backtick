import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { bundle, evaluate } from "../evaluate.ts";
const $module0 = {
  id: "378qi1aswe42g:13:18",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => () => $splice0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAYqBA,QAAA,UAAMA,QAAA,EAAM","names":["$splice0"],"ignoreList":[],"sources":["splices/splice-timing.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "function",
};
const $module1 = {
  id: "378qi1aswe42g:21:17",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const get = () => $splice0();\n    return get;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAoBoBA,QAAA;IACd,MAAMC,GAAG,GAAGA,GAAA,GAAMD,QAAA,EAAE;IACpB,OAAOC,GAAG;AACZ,CAAC","names":["$splice0","get"],"ignoreList":[],"sources":["splices/splice-timing.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "block",
};
const $module2 = {
  id: "378qi1aswe42g:32:20",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() * 10;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA+BuBA,QAAA,IAAAA,QAAA,EAAE,GAAG,EAAE","names":["$splice0"],"ignoreList":[],"sources":["splices/splice-timing.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module3 = {
  id: "378qi1aswe42g:39:17",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => {\n    const now = $splice0();\n    const later = () => $splice1();\n    return [now, later()];\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAsCoB,CAAAA,QAAA,EAAAC,QAAA;IACd,MAAMC,GAAG,GAAGF,QAAA,EAAK;IACjB,MAAMG,KAAK,GAAGA,GAAA,GAAMF,QAAA,EAAK;IACzB,OAAO,CAACC,GAAG,EAAEC,KAAK,EAAE,CAAC;AACvB,CAAC","names":["$splice0","$splice1","now","later"],"ignoreList":[],"sources":["splices/splice-timing.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "block",
};
const $module4 = {
  id: "378qi1aswe42g:51:19",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0().map(item => item * $splice1());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkDsB,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAM,CAACE,GAAG,CAAEC,IAAY,IAAKA,IAAI,GAAGF,QAAA,EAAO,CAAC","names":["$splice0","$splice1","map","item"],"ignoreList":[],"sources":["splices/splice-timing.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module5 = {
  id: "378qi1aswe42g:59:17",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => () => $splice0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA0DoBA,QAAA,UAAMA,QAAA,EAAE","names":["$splice0"],"ignoreList":[],"sources":["splices/splice-timing.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "function",
};
const $module6 = {
  id: "378qi1aswe42g:67:15",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkEkBA,QAAA,IAAAA,QAAA,EAAS","names":["$splice0"],"ignoreList":[],"sources":["splices/splice-timing.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
// A splice is read when the `cs` line runs, as a `${}` is in a template
// literal: the script gets the value of that moment, wherever in the script
// it's written, a function included. Reading one before its declaration is
// refused by the typechecker (see `typecheck-errors/splice-before-declaration`).
describe("a splice is read when the `cs` line runs", () => {
  it("in a function, a let assigned after", async () => {
    let theme = "light";
    const label = cs.create($module0, [theme]);
    theme = "dark";
    const read = await evaluate(label);
    assert.equal(read(), "light");
  });
  it("in a function inside a block, a let assigned after", async () => {
    let x = "a";
    const read = cs.create($module1, [x]);
    x = "b";
    const get = await evaluate(read);
    assert.equal(get(), "a");
  });
  it("in an expression, a let assigned after", async () => {
    let n = 1;
    const tenfold = cs.create($module2, [n]);
    n = 2;
    assert.equal(await evaluate(tenfold), 10);
  });
  it("in and out of a function, the same value", async () => {
    let size = 1;
    const pair = cs.create($module3, [size, size]);
    size = 2;
    assert.deepEqual(await evaluate(pair), [1, 1]);
  });
  it("in a function called at once, a let assigned after", async () => {
    let factor = 1;
    const items = [1, 2];
    const scaled = cs.create($module4, [items, factor]);
    factor = 10;
    assert.deepEqual(await evaluate(scaled), [1, 2]);
  });
  it("in a loop, each turn's value, even of a var", async () => {
    const reads = [];
    for (var i = 0; i < 3; i++) {
      reads.push(cs.create($module5, [i]));
    }
    const [a, b, c] = await Promise.all(reads.map(evaluate));
    assert.deepEqual([a(), b(), c()], [0, 1, 2]);
  });
  it("once, however many bundles read it", async () => {
    let made = 0;
    const id = cs.create($module6, [++made]);
    await bundle(id);
    await bundle(id);
    assert.equal(made, 1);
  });
});
