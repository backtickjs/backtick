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
      map: '{"version":3,"mappings":"eAO2B,UAAI","names":[],"ignoreList":[],"sources":["condition-narrowing.test.tsx"]}',
      imports: [],
      exportAt: 0,
    },
  ),
};
const label = cs.create(
  "g29mnwu0pbnr:10:71",
  { params: [{ kind: "splice", value: flags.strict, bindings: [] }] },
  {
    code: 'export default $0 => (text, upper) => {\n  if (upper && text !== null) {\n    return text.toUpperCase();\n  }\n  if ($0() && text !== null && text.charAt(0) === "!") {\n    return text.concat("?");\n  }\n  return "none";\n};',
    map: '{"version":3,"mappings":"eAS0EA,EAAA,KACxEC,IAAmB,EACnBC,KAAc,KACZ;EACF,IAAIA,KAAK,IAAID,IAAI,KAAK,IAAI,EAAE;IAC1B,OAAOA,IAAI,CAACE,WAAW,EAAE;EAC3B;EACA,IAAIH,EAAA,EAAC,IAAkBC,IAAI,KAAK,IAAI,IAAIA,IAAI,CAACG,MAAM,CAAC,CAAC,CAAC,KAAK,GAAG,EAAE;IAC9D,OAAOH,IAAI,CAACI,MAAM,CAAC,GAAG,CAAC;EACzB;EACA,OAAO,MAAM;AACf,CAAC","names":["$0","text","upper","toUpperCase","charAt","concat"],"ignoreList":[],"sources":["condition-narrowing.test.tsx"]}',
    imports: [],
    exportAt: 0,
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
        code: 'export default $0 => ({\n  missing: $0()(null, true),\n  loud: $0()("!hi", true),\n  quiet: $0()("!hi", false),\n  plain: $0()("zz", false)\n});',
        map: '{"version":3,"mappings":"eA0BOA,EAAA,KAAC;EACFC,OAAO,EAAED,EAAA,EAAM,CAAC,IAAI,EAAE,IAAI,CAAC;EAC3BE,IAAI,EAAEF,EAAA,EAAM,CAAC,KAAK,EAAE,IAAI,CAAC;EACzBG,KAAK,EAAEH,EAAA,EAAM,CAAC,KAAK,EAAE,KAAK,CAAC;EAC3BI,KAAK,EAAEJ,EAAA,EAAM,CAAC,IAAI,EAAE,KAAK;CAC1B,CAAC","names":["$0","missing","loud","quiet","plain"],"ignoreList":[],"sources":["condition-narrowing.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
