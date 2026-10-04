import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "g29mnwu0pbnr:8:24",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => true;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAO2B,UAAI","names":[],"ignoreList":[],"sources":["expressions/condition-narrowing.test.tsx"]}',
  dependencies: [],
};
const $module1 = {
  id: "g29mnwu0pbnr:10:71",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => (text, upper) => {\n    if (upper && text !== null) {\n        return text.toUpperCase();\n    }\n    if ($splice0() && text !== null && text.charAt(0) === "!") {\n        return text.concat("?");\n    }\n    return "none";\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAS0EA,QAAA,KACxEC,IAAmB,EACnBC,KAAc;IAEd,IAAIA,KAAK,IAAID,IAAI,KAAK,IAAI,EAAE;QAC1B,OAAOA,IAAI,CAACE,WAAW,EAAE;IAC3B;IACA,IAAIH,QAAA,EAAe,IAAIC,IAAI,KAAK,IAAI,IAAIA,IAAI,CAACG,MAAM,CAAC,CAAC,CAAC,KAAK,GAAG,EAAE;QAC9D,OAAOH,IAAI,CAACI,MAAM,CAAC,GAAG,CAAC;IACzB;IACA,OAAO,MAAM;AACf,CAAC","names":["$splice0","text","upper","toUpperCase","charAt","concat"],"ignoreList":[],"sources":["expressions/condition-narrowing.test.tsx"]}',
  dependencies: [],
};
const $module2 = {
  id: "g29mnwu0pbnr:27:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => ({\n    missing: $splice0()(null, true),\n    loud: $splice0()("!hi", true),\n    quiet: $splice0()("!hi", false),\n    plain: $splice0()("zz", false)\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA0BOA,QAAA,KAAC;IACFC,OAAO,EAAED,QAAA,EAAM,CAAC,IAAI,EAAE,IAAI,CAAC;IAC3BE,IAAI,EAAEF,QAAA,EAAM,CAAC,KAAK,EAAE,IAAI,CAAC;IACzBG,KAAK,EAAEH,QAAA,EAAM,CAAC,KAAK,EAAE,KAAK,CAAC;IAC3BI,KAAK,EAAEJ,QAAA,EAAM,CAAC,IAAI,EAAE,KAAK;CAC1B,CAAC","names":["$splice0","missing","loud","quiet","plain"],"ignoreList":[],"sources":["expressions/condition-narrowing.test.tsx"]}',
  dependencies: [],
};
// A condition narrows in the virtual code: `text !== null` narrows `text` in
// the branch it guards and from a `&&` left operand into the right, a braced
// splice included.
const flags = { strict: cs.create($module0, []) };
const label = cs.create($module1, [
  { kind: "splice", value: flags.strict, bindings: [] },
]);
it("conditionNarrowing", async (t) => {
  await snapshotCase(
    t,
    "conditionNarrowing",
    cs.create($module2, [{ kind: "splice", value: label, bindings: [] }]),
  );
});
