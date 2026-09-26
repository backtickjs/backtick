import { cs } from "@backtickjs/core";
// TypeScript decides what may index a value: an array takes a number, and a
// plain object takes only a key its type names. `coins["0"]` passes, because
// TypeScript reads a numeric string literal as a numeric index.
const point = { x: 1, y: 2 };
export default cs.create(
  "2p3ed6wqsrdah:8:15",
  { params: [{ kind: "splice", value: point, bindings: [] }] },
  {
    code: 'export default $0 => name => {\n  const coins = [5, 31, 7];\n  const first = coins["0"];\n  const wrong = coins[name];\n  const which = $0()[name];\n  return first + wrong + which;\n};',
    map: '{"version":3,"mappings":"eAOkBA,EAAA,IAACC,IAAY,IAAI;EACjC,MAAMC,KAAK,GAAG,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;EACxB,MAAMC,KAAK,GAAGD,KAAK,CAAC,GAAG,CAAC;EAExB,MAAME,KAAK,GAAGF,KAAK,CAACD,IAAI,CAAC;EAEzB,MAAMI,KAAK,GAAGL,EAAA,EAAM,CAACC,IAAI,CAAC;EAC1B,OAAOE,KAAK,GAAGC,KAAK,GAAGC,KAAK;AAC9B,CAAC","names":["$0","name","coins","first","wrong","which"],"ignoreList":[],"sources":["index-wrong-key.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
