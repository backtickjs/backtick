import { it } from "node:test";
import { cs, once } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1d06ev3au4s3y:8:19",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => ({\n    n: 1\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAOsB,OAAC;IAAEA,CAAC,EAAE;CAAG,CAAC","names":["n"],"ignoreList":[],"sources":["once/nested.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
const $module1 = {
  id: "1d06ev3au4s3y:9:19",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1, $splice2) => ({\n    inner: $splice0(),\n    same: $splice1() === $splice2()\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAQsB,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA,MAAC;IAAEC,KAAK,EAAEH,QAAA,EAAM;IAAEI,IAAI,EAAEH,QAAA,EAAM,KAAKC,QAAA;CAAQ,CAAC","names":["$splice0","$splice1","$splice2","inner","same"],"ignoreList":[],"sources":["once/nested.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module2 = {
  id: "1d06ev3au4s3y:15:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1, $splice2) => ({\n    outer: $splice0(),\n    shared: $splice1().inner === $splice2()\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAcO,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA,MAAC;IAAEC,KAAK,EAAEH,QAAA,EAAM;IAAEI,MAAM,EAAEH,QAAA,EAAM,CAACI,KAAK,KAAKH,QAAA;CAAQ,CAAC","names":["$splice0","$splice1","$splice2","outer","shared","inner"],"ignoreList":[],"sources":["once/nested.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module3 = {
  id: "1d06ev3au4s3y:20:39",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => "root";\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAmB0C,YAAM","names":[],"ignoreList":[],"sources":["once/nested.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
const $module4 = {
  id: "1d06ev3au4s3y:23:20",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => n => n * 2;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAsBuB,MAACA,CAAS,IAAKA,CAAC,GAAG,CAAC","names":["n"],"ignoreList":[],"sources":["once/nested.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "function",
};
const $module5 = {
  id: "1d06ev3au4s3y:26:38",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(21);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAyByCA,QAAA,IAAAA,QAAA,EAAO,CAAC,EAAE,CAAC","names":["$splice0"],"ignoreList":[],"sources":["once/nested.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
// A `once` script splicing another is made after it, as every constant is
// made after what it reads; one at the root is the root; a function made once
// is the function it already was.
const inner = once(cs.create($module0, []));
const outer = once(cs.create($module1, [inner, inner, inner]));
it("nested", async (t) => {
  await snapshotCase(t, "nested", cs.create($module2, [outer, outer, inner]));
});
it("atRoot", async (t) => {
  await snapshotCase(t, "atRoot", once(cs.create($module3, [])));
});
const double = once(cs.create($module4, []));
it("ofFunction", async (t) => {
  await snapshotCase(t, "ofFunction", cs.create($module5, [double]));
});
