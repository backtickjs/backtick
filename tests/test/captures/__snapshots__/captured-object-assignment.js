import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A nested script captures a variable's value, and an object's value is a
// reference: assigning to a member of a captured object writes the one object
// the enclosing script holds.
it("capturedObjectAssignment", async (t) => {
  await snapshotCase(
    t,
    "capturedObjectAssignment",
    cs.create(
      "385xpgt8q0ek2:12:4",
      {
        params: [
          {
            kind: "splice",
            value: cs.create(
              "385xpgt8q0ek2:14:21",
              { params: [{ kind: "capture", key: "counter$385xpgt8q0ek2$0" }] },
              "($capture0) => () => {\n    $capture0.count += 1;\n}",
              '{"version":3,"file":"captured-object-assignment.test.jsx","sourceRoot":"","sources":["captures/captured-object-assignment.test.tsx"],"names":[],"mappings":"AAawB,eAAA,GAAG,EAAE;IACrB,SAAO,CAAC,KAAK,IAAI,CAAC,CAAC;AACrB,CAAC"}',
            ),
            bindings: ["counter$385xpgt8q0ek2$0"],
          },
        ],
      },
      "($splice0) => {\n    const counter = { count: 0 };\n    const bump = $splice0(counter);\n    bump();\n    bump();\n    return counter.count;\n}",
      '{"version":3,"file":"captured-object-assignment.test.jsx","sourceRoot":"","sources":["captures/captured-object-assignment.test.tsx"],"names":[],"mappings":"AAWO;IACD,MAAM,OAAO,GAAG,EAAE,KAAK,EAAE,CAAC,EAAE,CAAC;IAC7B,MAAM,IAAI,GAAG,iBAAC,CAEV;IACJ,IAAI,EAAE,CAAC;IACP,IAAI,EAAE,CAAC;IACP,OAAO,OAAO,CAAC,KAAK,CAAC;AACvB,CAAC"}',
    ),
  );
});
