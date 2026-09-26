import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A splice prints as an expression ending in a type, and a `<` after a type is
// where type arguments start — so a spliced value to the left of `<` is the
// one place the virtual file could stop being the program it stands for.
const low = 3;
const high = 9;
it("splicedComparison", async (t) => {
  await snapshotCase(
    t,
    "splicedComparison",
    cs.create(
      "3jdm2y7f9tpf:15:4",
      {
        params: [
          { kind: "splice", value: low, bindings: [] },
          { kind: "splice", value: high, bindings: [] },
        ],
      },
      {
        code: "export default ($0, $1) => ({\n  under: $0() < $1(),\n  atMost: $0() <= $1(),\n  over: $1() > $0(),\n  between: $0() < $1() && $1() > $0()\n});",
        map: '{"version":3,"mappings":"eAcO,CAAAA,EAAA,EAAAC,EAAA,MAAC;EACFC,KAAK,EAAEF,EAAA,EAAI,GAAGC,EAAA,EAAK;EACnBE,MAAM,EAAEH,EAAA,EAAI,IAAIC,EAAA,EAAK;EACrBG,IAAI,EAAEH,EAAA,EAAK,GAAGD,EAAA,EAAI;EAClBK,OAAO,EAAEL,EAAA,EAAI,GAAGC,EAAA,EAAK,IAAIA,EAAA,EAAK,GAAGD,EAAA;CAClC,CAAC","names":["$0","$1","under","atMost","over","between"],"ignoreList":[],"sources":["spliced-comparison.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
