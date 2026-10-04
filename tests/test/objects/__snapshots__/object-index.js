import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "o3ttyh4dq4dw:15:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => currency => {\n    const table = $splice0();\n    const asked = table[currency] ?? 0;\n    const usd = table["usd"] ?? 0;\n    return asked + usd;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAcOA,QAAA,IAACC,QAAgB;IAClB,MAAMC,KAAK,GAAGF,QAAA,EAAM;IACpB,MAAMG,KAAK,GAAGD,KAAK,CAACD,QAAQ,CAAC,IAAI,CAAC;IAClC,MAAMG,GAAG,GAAGF,KAAK,CAAC,KAAK,CAAC,IAAI,CAAC;IAC7B,OAAOC,KAAK,GAAGC,GAAG;AACpB,CAAC","names":["$splice0","currency","table","asked","usd"],"ignoreList":[],"sources":["objects/object-index.test.tsx"]}',
  dependencies: [],
};
// An object is reached by a string key, and the type has to admit one: this
// record says any string names a number, so a key computed at runtime is a read
// the typechecker can allow. It reads as `number | null` — a record says
// nothing about which keys it has — so the absent case is answered here.
const rates = { usd: 3, eur: 4 };
it("objectIndex", async (t) => {
  await snapshotCase(
    t,
    "objectIndex",
    cs.create($module0, [{ kind: "splice", value: rates, bindings: [] }]),
  );
});
