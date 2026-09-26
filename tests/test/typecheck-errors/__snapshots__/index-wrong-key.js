import { cs } from "@backtickjs/core";
// TypeScript decides what may index a value: an array takes a number, and a
// plain object takes only a key its type names. `coins["0"]` passes, because
// TypeScript reads a numeric string literal as a numeric index.
const point = { x: 1, y: 2 };
export default cs.create(
  "2p3ed6wqsrdah:8:15",
  { params: [{ kind: "splice", value: point, bindings: [] }] },
  {
    code: 'export default ($0) => (name) => {\n    const coins = [5, 31, 7];\n    const first = coins["0"];\n    const wrong = coins[name];\n    const which = $0()[name];\n    return first + wrong + which;\n};',
    map: '{"version":3,"file":"index-wrong-key.test.jsx","sourceRoot":"","sources":["index-wrong-key.test.tsx"],"names":[],"mappings":"eAOkB,QAAA,CAAC,IAAY,EAAE,EAAE;IACjC,MAAM,KAAK,GAAG,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC;IACzB,MAAM,KAAK,GAAG,KAAK,CAAC,GAAG,CAAC,CAAC;IAEzB,MAAM,KAAK,GAAG,KAAK,CAAC,IAAI,CAAC,CAAC;IAE1B,MAAM,KAAK,GAAG,IAAM,CAAC,IAAI,CAAC,CAAC;IAC3B,OAAO,KAAK,GAAG,KAAK,GAAG,KAAK,CAAC;AAC/B,CAAC"}',
  },
);
