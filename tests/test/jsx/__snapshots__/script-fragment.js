import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A fragment a script writes: its children where it stands, and no node of its
// own — the same `Fragment` element the tree path writes for `<>`.
//
// And text as JSX reads it, which is not `trim()`. Across lines it is one
// sentence; on one line its spaces are its own; and the space between two
// expressions survives, where trimming would take it.
const listed = cs.create(
  "3pjkiwnta5gua:11:15",
  { params: [] },
  {
    code: 'import { template as _$template } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<span>a sentence across lines`),\n  _tmpl$2 = /*#__PURE__*/_$template(`<span> `);\nexport default () => name => [_tmpl$(), (() => {\n  var _el$2 = _tmpl$2(),\n    _el$3 = _el$2.firstChild;\n  _$insert(_el$2, name, _el$3);\n  _$insert(_el$2, name, null);\n  return _el$2;\n})()];',
    map: '{"version":3,"mappings":";;;;eAUkB,MAACA,IAAY,KAAAC,MAAA;EAAA,IAAAC,KAAA,GAAAC,OAAA;IAAAC,KAAA,GAAAF,KAAA,CAAAG,UAAA;EAAAC,QAAA,CAAAJ,KAAA,EAIxBF,IAAI,EAAAI,KAAA;EAAAE,QAAA,CAAAJ,KAAA,EAAGF,IAAI;EAAA,OAAAE,KAAA;AAAA,KAGjB","names":["name","_tmpl$","_el$2","_tmpl$2","_el$3","firstChild","_$insert"],"ignoreList":[],"sources":["script-fragment.test.tsx"]}',
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
    exportAt: 225,
  },
);
it("scriptFragment", async (t) => {
  await snapshotCase(
    t,
    "scriptFragment",
    _jsx("div", {
      children: cs.create(
        "3pjkiwnta5gua:21:48",
        { params: [{ kind: "splice", value: listed, bindings: [] }] },
        {
          code: 'export default $0 => $0()("x");',
          map: '{"version":3,"mappings":"eAoBmDA,EAAA,IAAAA,EAAA,EAAO,CAAC,GAAG,CAAC","names":["$0"],"ignoreList":[],"sources":["script-fragment.test.tsx"]}',
          imports: [],
          exportAt: 0,
        },
      ),
    }),
  );
});
