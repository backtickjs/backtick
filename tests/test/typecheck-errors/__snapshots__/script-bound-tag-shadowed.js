import { cs } from "@backtickjs/core";
// The script between them binds `Badge` to a number, and the nearest binding is
// the one a tag names: the innermost `<Badge />` calls a number.
export default cs.create(
  "83k1lytjebk3:5:15",
  {
    params: [
      {
        kind: "splice",
        value: cs.create(
          "83k1lytjebk3:7:11",
          {
            params: [
              {
                kind: "splice",
                value: cs.create(
                  "83k1lytjebk3:10:13",
                  {
                    params: [{ kind: "capture", key: "Badge$83k1lytjebk3$2" }],
                  },
                  {
                    code: "export default ($0) => <$0 n={1}/>;",
                    map: '{"version":3,"file":"script-bound-tag-shadowed.test.jsx","sourceRoot":"","sources":["script-bound-tag-shadowed.test.tsx"],"names":[],"mappings":"eASgB,QAAA,CAAC,EAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAG"}',
                    imports: [],
                    exportAt: 0,
                  },
                ),
                bindings: ["Badge$83k1lytjebk3$2"],
              },
            ],
          },
          {
            code: "export default ($0) => {\n    const Badge = 5;\n    return $0(Badge);\n};",
            map: '{"version":3,"file":"script-bound-tag-shadowed.test.jsx","sourceRoot":"","sources":["script-bound-tag-shadowed.test.tsx"],"names":[],"mappings":"eAMc;IACV,MAAM,KAAK,GAAG,CAAC,CAAC;IAEhB,OAAO,SAAC,CAAsB;AAChC,CAAC"}',
            imports: [],
            exportAt: 0,
          },
        ),
        bindings: [],
      },
    ],
  },
  {
    code: 'export default ($0) => {\n    const Badge = (p) => <b>{"n " + p.n}</b>;\n    return $0();\n};',
    map: '{"version":3,"file":"script-bound-tag-shadowed.test.jsx","sourceRoot":"","sources":["script-bound-tag-shadowed.test.tsx"],"names":[],"mappings":"eAIkB;IAChB,MAAM,KAAK,GAAG,CAAC,CAAgB,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,GAAG,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;IACxD,OAAO,IAAC,CAIJ;AACN,CAAC"}',
    imports: [],
    exportAt: 0,
  },
);
