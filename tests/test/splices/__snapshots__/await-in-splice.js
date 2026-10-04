import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1vub2b42i0si4:14:41",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + "!";\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAa4CA,QAAA,IAAAA,QAAA,EAAwB,GAAG,GAAG","names":["$splice0"],"ignoreList":[],"sources":["splices/await-in-splice.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
};
const $module1 = {
  id: "1vub2b42i0si4:21:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const greeting = $splice0();\n    return greeting + "!";\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAoBOA,QAAA;IACD,MAAMC,QAAQ,GAAGD,QAAA,EAAwB;IACzC,OAAOC,QAAQ,GAAG,GAAG;AACvB,CAAC","names":["$splice0","greeting"],"ignoreList":[],"sources":["splices/await-in-splice.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
};
const $module2 = {
  id: "1vub2b42i0si4:32:46",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => fetch("/rows");\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA+BiD,MAAAA,KAAK,CAAC,OAAO,CAAC","names":["fetch"],"ignoreList":[],"sources":["splices/await-in-splice.test.tsx"]}',
  dependencies: [],
  params: [],
};
async function fetchGreeting() {
  return "hello";
}
// A spliced host expression evaluates in the template's own scope — the
// compiled output wraps it in no function — so `await` works wherever the
// template itself may await, here in an async test, whether the script is an
// expression or has statements.
it("awaitInSplice", async (t) => {
  await snapshotCase(
    t,
    "awaitInSplice",
    cs.create($module0, [await fetchGreeting()]),
  );
});
it("awaitInStatementsSplice", async (t) => {
  await snapshotCase(
    t,
    "awaitInStatementsSplice",
    cs.create($module1, [await fetchGreeting()]),
  );
});
// A script whose splices await nothing keeps its own value's type, a promise
// included, even in an async function: only an awaiting splice makes the
// script's function async.
export async function rows() {
  const response = cs.create($module2, []);
  return response;
}
