import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "13e6vrhonm3wb:12:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const base = {\n        a: 1\n    };\n    return {\n        ...base,\n        "...": 2\n    };\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAWO;IACD,MAAMA,IAAI,GAAG;QAAEC,CAAC,EAAE;KAAG;IACrB,OAAO;QAAE,GAAGD,IAAI;QAAE,KAAK,EAAE;KAAG;AAC9B,CAAC","names":["base","a"],"ignoreList":[],"sources":["objects/object-dots-key.test.tsx"]}',
  dependencies: [],
};
// A property literally named `...`, in a literal a spread also runs through —
// which is the one shape where a spread and a pair holding `...` sit in the
// same list. A pair is an array of its own, so its `...` is only a string.
it("objectDotsKey", async (t) => {
  await snapshotCase(t, "objectDotsKey", cs.create($module0, []));
});
