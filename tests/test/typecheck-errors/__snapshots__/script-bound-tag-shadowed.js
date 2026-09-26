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
                    code: 'import { createComponent as _$createComponent } from "solid-js/web";\nexport default $0 => _$createComponent($0, {\n  n: 1\n});',
                    map: '{"version":3,"mappings":";eASgBA,EAAA,IAAAC,iBAAA,CAACD,EAAK;EAACE,CAAC,EAAE;AAAC,EAAI","names":["$0","_$createComponent","n"],"ignoreList":[],"sources":["script-bound-tag-shadowed.test.tsx"]}',
                    imports: [
                      {
                        from: "solid-js/web",
                        range: [0, 68],
                        bindings: [
                          {
                            name: "createComponent",
                            local: "_$createComponent",
                          },
                        ],
                      },
                    ],
                    exportAt: 69,
                  },
                ),
                bindings: ["Badge$83k1lytjebk3$2"],
              },
            ],
          },
          {
            code: "export default $0 => {\n  const Badge = 5;\n  return $0(Badge);\n};",
            map: '{"version":3,"mappings":"eAMcA,EAAA;EACV,MAAMC,KAAK,GAAG,CAAC;EAEf,OAAOD,EAAA,CAAAC,KAAA,CAAC;AACV,CAAC","names":["$0","Badge"],"ignoreList":[],"sources":["script-bound-tag-shadowed.test.tsx"]}',
            imports: [],
            exportAt: 0,
          },
        ),
        bindings: [],
      },
    ],
  },
  {
    code: 'import { template as _$template } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<b>`);\nexport default $0 => {\n  const Badge = p => (() => {\n    var _el$ = _tmpl$();\n    _$insert(_el$, () => "n " + p.n);\n    return _el$;\n  })();\n  return $0();\n};',
    map: '{"version":3,"mappings":";;;eAIkBA,EAAA;EAChB,MAAMC,KAAK,GAAIC,CAAgB;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,QAAA,CAAAF,IAAA,QAAS,IAAI,GAAGD,CAAC,CAACI,CAAC;IAAA,OAAAH,IAAA;EAAA,IAAK;EACvD,OAAOH,EAAA,EAAC;AAKV,CAAC","names":["$0","Badge","p","_el$","_tmpl$","_$insert","n"],"ignoreList":[],"sources":["script-bound-tag-shadowed.test.tsx"]}',
    imports: [
      {
        from: "solid-js/web",
        range: [0, 54],
        bindings: [{ name: "template", local: "_$template" }],
      },
      {
        from: "solid-js/web",
        range: [55, 105],
        bindings: [{ name: "insert", local: "_$insert" }],
      },
    ],
    exportAt: 151,
  },
);
