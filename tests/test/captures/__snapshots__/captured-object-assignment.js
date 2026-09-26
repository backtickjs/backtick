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
              {
                code: "export default $0 => () => {\n  $0.count += 1;\n};",
                map: '{"version":3,"mappings":"eAawBA,EAAA,UAAK;EACrBA,EAAO,CAACC,KAAK,IAAI,CAAC;AACpB,CAAC","names":["$0","count"],"ignoreList":[],"sources":["captured-object-assignment.test.tsx"]}',
                imports: [],
                exportAt: 0,
              },
            ),
            bindings: ["counter$385xpgt8q0ek2$0"],
          },
        ],
      },
      {
        code: "export default $0 => {\n  const counter = {\n    count: 0\n  };\n  const bump = $0(counter);\n  bump();\n  bump();\n  return counter.count;\n};",
        map: '{"version":3,"mappings":"eAWOA,EAAA;EACD,MAAMC,OAAO,GAAG;IAAEC,KAAK,EAAE;EAAC,CAAE;EAC5B,MAAMC,IAAI,GAAGH,EAAA,CAAAC,OAAA,CAAC;EAGdE,IAAI,EAAE;EACNA,IAAI,EAAE;EACN,OAAOF,OAAO,CAACC,KAAK;AACtB,CAAC","names":["$0","counter","count","bump"],"ignoreList":[],"sources":["captured-object-assignment.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
