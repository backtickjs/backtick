import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A binding declared in an enclosing script and captured by a script spliced
// into it: the spliced script is handed `x` where it is called.
const script = cs.create(
  "njvzopgmpqpe:7:15",
  {
    params: [
      {
        kind: "splice",
        value: cs.create(
          "njvzopgmpqpe:9:11",
          { params: [{ kind: "capture", key: "x$njvzopgmpqpe$0" }] },
          "($capture0) => <span onclick={() => $capture0}/>",
          '{"version":3,"file":"jsx-capture.test.jsx","sourceRoot":"","sources":["captures/jsx-capture.test.tsx"],"names":[],"mappings":"AAQc,eAAA,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,SAAC,CAAC,EAAG"}',
        ),
        bindings: ["x$njvzopgmpqpe$0"],
      },
    ],
  },
  "($splice0) => () => {\n    const x = 1;\n    return $splice0(x);\n}",
  '{"version":3,"file":"jsx-capture.test.jsx","sourceRoot":"","sources":["captures/jsx-capture.test.tsx"],"names":[],"mappings":"AAMkB,cAAA,GAAG,EAAE;IACrB,MAAM,CAAC,GAAG,CAAC,CAAC;IACZ,OAAO,WAAC,CAAiC;AAC3C,CAAC"}',
);
it("jsxCapture", async (t) => {
  await snapshotCase(t, "jsxCapture", script);
});
