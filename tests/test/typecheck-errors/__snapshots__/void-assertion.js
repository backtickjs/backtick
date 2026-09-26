import { cs } from "@backtickjs/core";
const one = 1;
// An assertion needs no check of its own: TypeScript already refuses to
// assert a value to `void`.
const asserted = cs.create(
  "3mgqg6v7h2mni:7:17",
  { params: [{ kind: "splice", value: one, bindings: [] }] },
  '($0) => {\n    const a = $0();\n    return "" + a;\n}',
  '{"version":3,"file":"void-assertion.test.jsx","sourceRoot":"","sources":["typecheck-errors/void-assertion.test.tsx"],"names":[],"mappings":"AAMoB;IAElB,MAAM,CAAC,GAAG,IAAY,CAAC;IACvB,OAAO,EAAE,GAAG,CAAC,CAAC;AAChB,CAAC"}',
);
