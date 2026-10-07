import { cs } from "@backtickjs/core";
const $module0 = {
  id: "3mgqg6v7h2mni:7:17",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const a = $splice0();\n    return "" + a;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAMoBA,QAAA;IAElB,MAAMC,CAAC,GAAGD,QAAA,EAAY;IACtB,OAAO,EAAE,GAAGC,CAAC;AACf,CAAC","names":["$splice0","a"],"ignoreList":[],"sources":["typecheck-errors/void-assertion.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "block",
};
const one = 1;
// An assertion needs no check of its own: TypeScript already refuses to
// assert a value to `void`.
const asserted = cs.create($module0, [one]);
