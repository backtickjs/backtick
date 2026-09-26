import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// An object is reached by a string key, and the type has to admit one: this
// record says any string names a number, so a key computed at runtime is a read
// the typechecker can allow. It reads as `number | null` — a record says
// nothing about which keys it has — so the absent case is answered here.
const rates = { usd: 3, eur: 4 };
it("objectIndex", async (t) => {
  await snapshotCase(
    t,
    "objectIndex",
    cs.create(
      "o3ttyh4dq4dw:15:4",
      { params: [{ kind: "splice", value: rates, bindings: [] }] },
      {
        code: 'export default $0 => currency => {\n  const table = $0();\n  const asked = table[currency] ?? 0;\n  const usd = table["usd"] ?? 0;\n  return asked + usd;\n};',
        map: '{"version":3,"mappings":"eAcOA,EAAA,IAACC,QAAgB,IAAI;EACtB,MAAMC,KAAK,GAAGF,EAAA,EAAM;EACpB,MAAMG,KAAK,GAAGD,KAAK,CAACD,QAAQ,CAAC,IAAI,CAAC;EAClC,MAAMG,GAAG,GAAGF,KAAK,CAAC,KAAK,CAAC,IAAI,CAAC;EAC7B,OAAOC,KAAK,GAAGC,GAAG;AACpB,CAAC","names":["$0","currency","table","asked","usd"],"ignoreList":[],"sources":["object-index.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
