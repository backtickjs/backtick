import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
function outerBase(inner) {
  return cs.create(
    "8up2nb5o0inm:7:9",
    { params: [{ kind: "splice", value: middleBase(inner), bindings: [] }] },
    {
      code: "export default $0 => {\n  const base = 1;\n  return base + $0();\n};",
      map: '{"version":3,"mappings":"eAMYA,EAAA;EACR,MAAMC,IAAI,GAAG,CAAC;EACd,OAAOA,IAAI,GAAGD,EAAA,EAAC;AACjB,CAAC","names":["$0","base"],"ignoreList":[],"sources":["deep-shadowing.test.tsx"]}',
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
      code: "export default $0 => {\n  const base = 2;\n  return base * $0();\n};",
      map: '{"version":3,"mappings":"eAaYA,EAAA;EACR,MAAMC,IAAI,GAAG,CAAC;EACd,OAAOA,IAAI,GAAGD,EAAA,EAAM;AACtB,CAAC","names":["$0","base"],"ignoreList":[],"sources":["deep-shadowing.test.tsx"]}',
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
                  code: "export default $0 => $0;",
                  map: '{"version":3,"mappings":"eA6B4BA,EAAA,IAAAA,EAAI","names":["$0"],"ignoreList":[],"sources":["deep-shadowing.test.tsx"]}',
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
        code: "export default $0 => {\n  const base = 10;\n  return $0(base);\n};",
        map: '{"version":3,"mappings":"eA2BOA,EAAA;EACD,MAAMC,IAAI,GAAG,EAAE;EACf,OAAOD,EAAA,CAAAC,IAAA,CAAC;AACV,CAAC","names":["$0","base"],"ignoreList":[],"sources":["deep-shadowing.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
