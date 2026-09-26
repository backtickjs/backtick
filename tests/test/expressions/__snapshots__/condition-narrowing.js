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
    {
      code: "export default () => true;",
      map: '{"version":3,"file":"condition-narrowing.test.jsx","sourceRoot":"","sources":["condition-narrowing.test.tsx"],"names":[],"mappings":"eAO2B,MAAA,IAAI"}',
    },
  ),
};
const label = cs.create(
  "g29mnwu0pbnr:10:71",
  { params: [{ kind: "splice", value: flags.strict, bindings: [] }] },
  {
    code: 'export default ($0) => (text, upper) => {\n    if (upper && text !== null) {\n        return text.toUpperCase();\n    }\n    if ($0() && text !== null && text.charAt(0) === "!") {\n        return text.concat("?");\n    }\n    return "none";\n};',
    map: '{"version":3,"file":"condition-narrowing.test.jsx","sourceRoot":"","sources":["condition-narrowing.test.tsx"],"names":[],"mappings":"eAS0E,QAAA,CACxE,IAAmB,EACnB,KAAc,EACd,EAAE;IACF,IAAI,KAAK,IAAI,IAAI,KAAK,IAAI,EAAE,CAAC;QAC3B,OAAO,IAAI,CAAC,WAAW,EAAE,CAAC;IAC5B,CAAC;IACD,IAAI,IAAC,IAAkB,IAAI,KAAK,IAAI,IAAI,IAAI,CAAC,MAAM,CAAC,CAAC,CAAC,KAAK,GAAG,EAAE,CAAC;QAC/D,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,CAAC;IAC1B,CAAC;IACD,OAAO,MAAM,CAAC;AAChB,CAAC"}',
  },
);
it("conditionNarrowing", async (t) => {
  await snapshotCase(
    t,
    "conditionNarrowing",
    cs.create(
      "g29mnwu0pbnr:27:4",
      { params: [{ kind: "splice", value: label, bindings: [] }] },
      {
        code: 'export default ($0) => ({\n    missing: $0()(null, true),\n    loud: $0()("!hi", true),\n    quiet: $0()("!hi", false),\n    plain: $0()("zz", false),\n});',
        map: '{"version":3,"file":"condition-narrowing.test.jsx","sourceRoot":"","sources":["condition-narrowing.test.tsx"],"names":[],"mappings":"eA0BO,QAAA,CAAC;IACF,OAAO,EAAE,IAAM,CAAC,IAAI,EAAE,IAAI,CAAC;IAC3B,IAAI,EAAE,IAAM,CAAC,KAAK,EAAE,IAAI,CAAC;IACzB,KAAK,EAAE,IAAM,CAAC,KAAK,EAAE,KAAK,CAAC;IAC3B,KAAK,EAAE,IAAM,CAAC,IAAI,EAAE,KAAK,CAAC;CAC3B,CAAC"}',
      },
    ),
  );
});
