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
      '($splice0) => {\n    const names = ["zero", "one"];\n    const missing = $splice0()["nowhere"] ?? "gone";\n    return names[1] + "/" + missing;\n}',
      '{"version":3,"file":"index-absent.test.jsx","sourceRoot":"","sources":["objects/index-absent.test.tsx"],"names":[],"mappings":"AAaO;IACD,MAAM,KAAK,GAAG,CAAC,MAAM,EAAE,KAAK,CAAC,CAAC;IAC9B,MAAM,OAAO,GAAG,UAAQ,CAAC,SAAS,CAAC,IAAI,MAAM,CAAC;IAC9C,OAAO,KAAK,CAAC,CAAC,CAAC,GAAG,GAAG,GAAG,OAAO,CAAC;AAClC,CAAC"}',
    ),
  );
});
