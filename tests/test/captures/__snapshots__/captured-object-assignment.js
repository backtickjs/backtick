import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "385xpgt8q0ek2:12:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const counter = {\n        count: 0\n    };\n    const bump = $splice0(counter);\n    bump();\n    bump();\n    return counter.count;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAWOA,QAAA;IACD,MAAMC,OAAO,GAAG;QAAEC,KAAK,EAAE;KAAG;IAC5B,MAAMC,IAAI,GAAGH,QAAA,CAAAC,OAAA,CAEV;IACHE,IAAI,EAAE;IACNA,IAAI,EAAE;IACN,OAAOF,OAAO,CAACC,KAAK;AACtB,CAAC","names":["$splice0","counter","count","bump"],"ignoreList":[],"sources":["captures/captured-object-assignment.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: ["counter$385xpgt8q0ek2$0"] }],
  kind: "block",
};
const $module1 = {
  id: "385xpgt8q0ek2:14:21",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => () => {\n    $capture0.count += 1;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAawBA,SAAA;IAChBA,SAAO,CAACC,KAAK,IAAI,CAAC;AACpB,CAAC","names":["$capture0","count"],"ignoreList":[],"sources":["captures/captured-object-assignment.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "capture", key: "counter$385xpgt8q0ek2$0" }],
  kind: "function",
};
// A nested script captures a variable's value, and an object's value is a
// reference: assigning to a member of a captured object writes the one object
// the enclosing script holds.
it("capturedObjectAssignment", async (t) => {
  await snapshotCase(
    t,
    "capturedObjectAssignment",
    cs.create($module0, [cs.create($module1, [])]),
  );
});
