import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A key an object hasn't got reads as the language's one absent value. A
// record's member reads as `string | null` — a record says nothing about which
// keys it has — so this one is answered rather than assumed.
const answers = { here: "yes" };
it("indexAbsent", async (t) => {
  await snapshotCase(
    t,
    "indexAbsent",
    cs.create(
      "26sqkhggd8j15:14:4",
      { params: [{ kind: "splice", value: answers, bindings: [] }] },
      {
        code: 'export default $0 => {\n  const names = ["zero", "one"];\n  const missing = $0()["nowhere"] ?? "gone";\n  return names[1] + "/" + missing;\n};',
        map: '{"version":3,"mappings":"eAaOA,EAAA;EACD,MAAMC,KAAK,GAAG,CAAC,MAAM,EAAE,KAAK,CAAC;EAC7B,MAAMC,OAAO,GAAGF,EAAA,EAAQ,CAAC,SAAS,CAAC,IAAI,MAAM;EAC7C,OAAOC,KAAK,CAAC,CAAC,CAAC,GAAG,GAAG,GAAGC,OAAO;AACjC,CAAC","names":["$0","names","missing"],"ignoreList":[],"sources":["index-absent.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
