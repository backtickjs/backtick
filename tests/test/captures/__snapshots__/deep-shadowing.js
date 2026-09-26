import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
function outerBase(inner) {
  return cs.create(
    "8up2nb5o0inm:7:9",
    { params: [{ kind: "splice", value: middleBase(inner), bindings: [] }] },
    "($splice0) => {\n    const base = 1;\n    return base + $splice0();\n}",
    '{"version":3,"file":"deep-shadowing.test.jsx","sourceRoot":"","sources":["captures/deep-shadowing.test.tsx"],"names":[],"mappings":"AAMY;IACR,MAAM,IAAI,GAAG,CAAC,CAAC;IACf,OAAO,IAAI,GAAG,UAAC,CAAoB;AACrC,CAAC"}',
  );
}
function middleBase(inner) {
  return cs.create(
    "8up2nb5o0inm:14:9",
    { params: [{ kind: "splice", value: inner, bindings: [] }] },
    "($splice0) => {\n    const base = 2;\n    return base * $splice0();\n}",
    '{"version":3,"file":"deep-shadowing.test.jsx","sourceRoot":"","sources":["captures/deep-shadowing.test.tsx"],"names":[],"mappings":"AAaY;IACR,MAAM,IAAI,GAAG,CAAC,CAAC;IACf,OAAO,IAAI,GAAG,UAAM,CAAC;AACvB,CAAC"}',
  );
}
// `cs`base`` is written under the outer `base`, but is threaded through two
// host functions that each shadow `base` with their own binding. The captured
// value must reach the leaf untouched, so the threaded channel is renamed
// away from every `base` it passes through.
it("deepShadowing", async (t) => {
  await snapshotCase(
    t,
    "deepShadowing",
    cs.create(
      "8up2nb5o0inm:28:4",
      {
        params: [
          {
            kind: "splice",
            value: outerBase(
              cs.create(
                "8up2nb5o0inm:30:25",
                { params: [{ kind: "capture", key: "base$8up2nb5o0inm$2" }] },
                "($capture0) => $capture0",
                '{"version":3,"file":"deep-shadowing.test.jsx","sourceRoot":"","sources":["captures/deep-shadowing.test.tsx"],"names":[],"mappings":"AA6B4B,eAAA,SAAI"}',
              ),
            ),
            bindings: ["base$8up2nb5o0inm$2"],
          },
        ],
      },
      "($splice0) => {\n    const base = 10;\n    return $splice0(base);\n}",
      '{"version":3,"file":"deep-shadowing.test.jsx","sourceRoot":"","sources":["captures/deep-shadowing.test.tsx"],"names":[],"mappings":"AA2BO;IACD,MAAM,IAAI,GAAG,EAAE,CAAC;IAChB,OAAO,cAAC,CAAsB;AAChC,CAAC"}',
    ),
  );
});
