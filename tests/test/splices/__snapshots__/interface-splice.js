import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createRoot } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "2gnb8oih8cuiw:21:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1, $splice2, $splice3) => $splice0()(() => $splice1().title + " " + $splice2().done + " " + $splice3().tags[0]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAoBO,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,KAAAH,QAAA,EAAW,CAAC,MAAMC,QAAA,EAAK,CAACG,KAAK,GAAG,GAAG,GAAGF,QAAA,EAAK,CAACG,IAAI,GAAG,GAAG,GAAGF,QAAA,EAAK,CAACG,IAAI,CAAC,CAAC,CAAC,CAAC","names":["$splice0","$splice1","$splice2","$splice3","title","done","tags"],"ignoreList":[],"sources":["splices/interface-splice.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module1 = {
  id: "2gnb8oih8cuiw:30:36",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => "computed";\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA6BuC,gBAAU","names":[],"ignoreList":[],"sources":["splices/interface-splice.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
const $module2 = {
  id: "2gnb8oih8cuiw:36:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()(() => $splice1().label.toUpperCase());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAmCO,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAW,CAAC,MAAMC,QAAA,EAAS,CAACC,KAAK,CAACC,WAAW,EAAE,CAAC","names":["$splice0","$splice1","label","toUpperCase"],"ignoreList":[],"sources":["splices/interface-splice.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module3 = {
  id: "2gnb8oih8cuiw:50:23",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0().title;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAiD0BA,QAAA,IAAAA,QAAA,EAAW,CAACC,KAAK","names":["$splice0","title"],"ignoreList":[],"sources":["splices/interface-splice.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const todo = { title: "Ship 0.1.5", done: false, tags: ["release"] };
it("interfaceSplice", async (t) => {
  await snapshotCase(
    t,
    "interfaceSplice",
    cs.create($module0, [createRoot, todo, todo, todo]),
  );
});
const labelled = { label: cs.create($module1, []) };
it("interfaceScriptMember", async (t) => {
  await snapshotCase(
    t,
    "interfaceScriptMember",
    cs.create($module2, [createRoot, labelled]),
  );
});
const withMethod = { title: "t", shout: () => "T" };
// @ts-expect-error: Argument of type 'WithMethod' is not assignable to parameter of type 'Spliceable'.
export const refused = cs.create($module3, [withMethod]);
