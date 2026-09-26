import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
function outerBase(inner) {
  return cs.create(
    "8up2nb5o0inm:7:9",
    { params: [{ kind: "splice", value: middleBase(inner), bindings: [] }] },
    {
      code: "export default ($0) => {\n    const base = 1;\n    return base + $0();\n};",
      map: '{"version":3,"file":"deep-shadowing.test.jsx","sourceRoot":"","sources":["deep-shadowing.test.tsx"],"names":[],"mappings":"eAMY;IACR,MAAM,IAAI,GAAG,CAAC,CAAC;IACf,OAAO,IAAI,GAAG,IAAC,CAAoB;AACrC,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
}
function middleBase(inner) {
  return cs.create(
    "8up2nb5o0inm:14:9",
    { params: [{ kind: "splice", value: inner, bindings: [] }] },
    {
      code: "export default ($0) => {\n    const base = 2;\n    return base * $0();\n};",
      map: '{"version":3,"file":"deep-shadowing.test.jsx","sourceRoot":"","sources":["deep-shadowing.test.tsx"],"names":[],"mappings":"eAaY;IACR,MAAM,IAAI,GAAG,CAAC,CAAC;IACf,OAAO,IAAI,GAAG,IAAM,CAAC;AACvB,CAAC"}',
      imports: [],
      exportAt: 0,
    },
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
                {
                  code: "export default ($0) => $0;",
                  map: '{"version":3,"file":"deep-shadowing.test.jsx","sourceRoot":"","sources":["deep-shadowing.test.tsx"],"names":[],"mappings":"eA6B4B,QAAA,EAAI"}',
                  imports: [],
                  exportAt: 0,
                },
              ),
            ),
            bindings: ["base$8up2nb5o0inm$2"],
          },
        ],
      },
      {
        code: "export default ($0) => {\n    const base = 10;\n    return $0(base);\n};",
        map: '{"version":3,"file":"deep-shadowing.test.jsx","sourceRoot":"","sources":["deep-shadowing.test.tsx"],"names":[],"mappings":"eA2BO;IACD,MAAM,IAAI,GAAG,EAAE,CAAC;IAChB,OAAO,QAAC,CAAsB;AAChC,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
