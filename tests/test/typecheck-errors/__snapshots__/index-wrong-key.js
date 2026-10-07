import { cs } from "@backtickjs/core";
const $module0 = {
  id: "2p3ed6wqsrdah:8:15",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => name => {\n    const coins = [5, 31, 7];\n    const first = coins["0"];\n    const wrong = coins[name];\n    const which = $splice0()[name];\n    return first + wrong + which;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAOkBA,QAAA,IAACC,IAAY;IAC7B,MAAMC,KAAK,GAAG,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;IACxB,MAAMC,KAAK,GAAGD,KAAK,CAAC,GAAG,CAAC;IAExB,MAAME,KAAK,GAAGF,KAAK,CAACD,IAAI,CAAC;IAEzB,MAAMI,KAAK,GAAGL,QAAA,EAAM,CAACC,IAAI,CAAC;IAC1B,OAAOE,KAAK,GAAGC,KAAK,GAAGC,KAAK;AAC9B,CAAC","names":["$splice0","name","coins","first","wrong","which"],"ignoreList":[],"sources":["typecheck-errors/index-wrong-key.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "function",
};
// TypeScript decides what may index a value: an array takes a number, and a
// plain object takes only a key its type names. `coins["0"]` passes, because
// TypeScript reads a numeric string literal as a numeric index.
const point = { x: 1, y: 2 };
export default cs.create($module0, [point]);
