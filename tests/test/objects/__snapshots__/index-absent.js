import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "26sqkhggd8j15:14:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const names = ["zero", "one"];\n    const missing = $splice0()["nowhere"] ?? "gone";\n    return names[1] + "/" + missing;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAaOA,QAAA;IACD,MAAMC,KAAK,GAAG,CAAC,MAAM,EAAE,KAAK,CAAC;IAC7B,MAAMC,OAAO,GAAGF,QAAA,EAAQ,CAAC,SAAS,CAAC,IAAI,MAAM;IAC7C,OAAOC,KAAK,CAAC,CAAC,CAAC,GAAG,GAAG,GAAGC,OAAO;AACjC,CAAC","names":["$splice0","names","missing"],"ignoreList":[],"sources":["objects/index-absent.test.tsx"]}',
  dependencies: [],
};
// A key an object hasn't got reads as the language's one absent value. A
// record's member reads as `string | null` — a record says nothing about which
// keys it has — so this one is answered rather than assumed.
const answers = { here: "yes" };
it("indexAbsent", async (t) => {
  await snapshotCase(
    t,
    "indexAbsent",
    cs.create($module0, [{ kind: "splice", value: answers, bindings: [] }]),
  );
});
