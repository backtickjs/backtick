import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "277pr9nok10br:8:12",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    window.console.log("logged");\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAOe;IACbA,MAAM,CAACC,OAAO,CAACC,GAAG,CAAC,QAAQ,CAAC;AAC9B,CAAC","names":["window","console","log"],"ignoreList":[],"sources":["splices/action-spliced-twice.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
const $module1 = {
  id: "277pr9nok10br:19:19",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => {\n    $splice0();\n    $splice1();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkBsB,CAAAA,QAAA,EAAAC,QAAA;IAChBD,QAAA,EAAI;IACJC,QAAA,EAAI;AACN,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["splices/action-spliced-twice.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "block",
};
// An action spliced twice as a statement runs twice: each `$log;` is the
// action's code, run where it stands.
const log = cs.create($module0, []);
it("an action spliced twice runs twice", async () => {
  const seen = [];
  const consoleLog = window.console.log;
  window.console.log = (...args) => {
    seen.push(args[0]);
  };
  try {
    await evaluate(cs.create($module1, [log, log]));
  } finally {
    window.console.log = consoleLog;
  }
  assert.deepEqual(seen, ["logged", "logged"]);
});
