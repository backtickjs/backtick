import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createRoot } from "@backtickjs/solid-js";
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "2hf37cx98c6lp:12:8",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => {\n    const [a, , b = 5, ...others] = [1, 2, undefined, 4, 6];\n    const { x, y: { z }, w = 7, ...more } = {\n        x: 1,\n        y: {\n            z: 2\n        },\n        extra: 3\n    };\n    return [a, b, others, x, z, w, more];\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAWWA,QAAA,IAAAA,QAAA,EAAW,CAAC;IACb,MAAM,CAACC,CAAC,IAAIC,CAAC,GAAG,CAAC,EAAE,GAAGC,MAAM,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,EAAEC,SAAS,EAAE,CAAC,EAAE,CAAC,CAAC;IACvD,MAAM,EACJC,CAAC,EACDC,CAAC,EAAE,EAAEC,GAAG,EACRC,CAAC,GAAG,CAAC,EACL,GAAGC,MACJ,GAAG;QAAEJ,CAAC,EAAE,CAAC;QAAEC,CAAC,EAAE;YAAEC,CAAC,EAAE;SAAG;QAAEG,KAAK,EAAE;KAAG;IACnC,OAAO,CAACT,CAAC,EAAEC,CAAC,EAAEC,MAAM,EAAEE,CAAC,EAAEE,CAAC,EAAEC,CAAC,EAAEC,IAAI,CAAC;AACtC,CAAC,CAAC","names":["$splice0","a","b","others","undefined","x","y","z","w","more","extra"],"ignoreList":[],"sources":["expressions/destructuring.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
};
const $module1 = {
  id: "2hf37cx98c6lp:30:8",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => {\n    const sum = (...values) => values.reduce((t, v) => t + v, 0);\n    const scaled = (n, by = 2) => n * by;\n    const named = ({ first, last }) => first + " " + last;\n    const pair = ([left, right]) => left - right;\n    return [sum(1, 2, 3), scaled(4), scaled(4, 3), named({\n            first: "A",\n            last: "B"\n        }), pair([5, 2])];\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA6BWA,QAAA,IAAAA,QAAA,EAAW,CAAC;IACb,MAAMC,GAAG,GAAGA,CAAC,GAAGC,MAAgB,KAC9BA,MAAM,CAACC,MAAM,CAAC,CAACC,CAAC,EAAEC,CAAC,KAAKD,CAAC,GAAGC,CAAC,EAAE,CAAC,CAAC;IACnC,MAAMC,MAAM,GAAGA,CAACC,CAAS,EAAEC,EAAA,GAAa,CAAC,KAAKD,CAAC,GAAGC,EAAE;IACpD,MAAMC,KAAK,GAAGA,CAAC,EAAEC,KAAK,EAAEC,MAAuC,KAC7DD,KAAK,GAAG,GAAG,GAAGC,IAAI;IACpB,MAAMC,IAAI,GAAGA,CAAC,CAACC,IAAI,EAAEC,KAAK,CAAmB,KAAKD,IAAI,GAAGC,KAAK;IAC9D,OAAO,CACLb,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,EACZK,MAAM,CAAC,CAAC,CAAC,EACTA,MAAM,CAAC,CAAC,EAAE,CAAC,CAAC,EACZG,KAAK,CAAC;YAAEC,KAAK,EAAE,GAAG;YAAEC,IAAI,EAAE;SAAK,CAAC,EAChCC,IAAI,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CACb;AACH,CAAC,CAAC","names":["$splice0","sum","values","reduce","t","v","scaled","n","by","named","first","last","pair","left","right"],"ignoreList":[],"sources":["expressions/destructuring.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
};
// Destructuring, in a declaration and in parameters, as JavaScript reads it.
describe("destructuring", () => {
  it("arrays and objects, nested, with defaults and rest", async () => {
    assert.deepEqual(await evaluate(cs.create($module0, [createRoot])), [
      1,
      5,
      [4, 6],
      1,
      2,
      7,
      { extra: 3 },
    ]);
  });
  it("parameters: rest, defaults and patterns", async () => {
    assert.deepEqual(await evaluate(cs.create($module1, [createRoot])), [
      6,
      8,
      12,
      "A B",
      3,
    ]);
  });
});
