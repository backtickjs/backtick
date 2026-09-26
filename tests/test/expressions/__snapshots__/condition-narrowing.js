import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A condition narrows in the virtual code: `text !== null` narrows `text` in
// the branch it guards and from a `&&` left operand into the right, a braced
// splice included.
const flags = {
  strict: cs.create(
    "g29mnwu0pbnr:8:24",
    { params: [] },
    "() => true",
    '{"version":3,"file":"condition-narrowing.test.jsx","sourceRoot":"","sources":["expressions/condition-narrowing.test.tsx"],"names":[],"mappings":"AAO2B,MAAA,IAAI"}',
  ),
};
const label = cs.create(
  "g29mnwu0pbnr:10:71",
  { params: [{ kind: "splice", value: flags.strict, bindings: [] }] },
  '($splice0) => (text, upper) => {\n    if (upper && text !== null) {\n        return text.toUpperCase();\n    }\n    if ($splice0() && text !== null && text.charAt(0) === "!") {\n        return text.concat("?");\n    }\n    return "none";\n}',
  '{"version":3,"file":"condition-narrowing.test.jsx","sourceRoot":"","sources":["expressions/condition-narrowing.test.tsx"],"names":[],"mappings":"AAS0E,cAAA,CACxE,IAAmB,EACnB,KAAc,EACd,EAAE;IACF,IAAI,KAAK,IAAI,IAAI,KAAK,IAAI,EAAE,CAAC;QAC3B,OAAO,IAAI,CAAC,WAAW,EAAE,CAAC;IAC5B,CAAC;IACD,IAAI,UAAC,IAAkB,IAAI,KAAK,IAAI,IAAI,IAAI,CAAC,MAAM,CAAC,CAAC,CAAC,KAAK,GAAG,EAAE,CAAC;QAC/D,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,CAAC;IAC1B,CAAC;IACD,OAAO,MAAM,CAAC;AAChB,CAAC"}',
);
it("conditionNarrowing", async (t) => {
  await snapshotCase(
    t,
    "conditionNarrowing",
    cs.create(
      "g29mnwu0pbnr:27:4",
      { params: [{ kind: "splice", value: label, bindings: [] }] },
      '($splice0) => ({\n    missing: $splice0()(null, true),\n    loud: $splice0()("!hi", true),\n    quiet: $splice0()("!hi", false),\n    plain: $splice0()("zz", false),\n})',
      '{"version":3,"file":"condition-narrowing.test.jsx","sourceRoot":"","sources":["expressions/condition-narrowing.test.tsx"],"names":[],"mappings":"AA0BO,cAAA,CAAC;IACF,OAAO,EAAE,UAAM,CAAC,IAAI,EAAE,IAAI,CAAC;IAC3B,IAAI,EAAE,UAAM,CAAC,KAAK,EAAE,IAAI,CAAC;IACzB,KAAK,EAAE,UAAM,CAAC,KAAK,EAAE,KAAK,CAAC;IAC3B,KAAK,EAAE,UAAM,CAAC,IAAI,EAAE,KAAK,CAAC;CAC3B,CAAC"}',
    ),
  );
});
