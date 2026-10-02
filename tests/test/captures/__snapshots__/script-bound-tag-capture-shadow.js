import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A client component the host holds, and a binding of the same name an
// enclosing script holds. Scope decides: the nested script's `<Card>` is the
// captured function, and only the one outside every script binding it is the
// host's.
const Card = cs.create(
  "1frijc9i1kpaq:11:13",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<h2>`);\nexports.default = () => props => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, () => props.title);\n    return _el$;\n})();\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAUgB,MAACA,KAAwB;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QAAUD,KAAK,CAACI,KAAK;IAAA,OAAAH,IAAA;AAAA,IAAM","names":["props","_el$","_tmpl$","_$insert","title"],"ignoreList":[],"sources":["captures/script-bound-tag-capture-shadow.test.tsx"]}',
  ["solid-js/web"],
);
// Instantiated twice with different labels, so the enclosing script is
// polymorphic and its nested script's captures arrive through a thunk.
function labelled(label) {
  return cs.create(
    "1frijc9i1kpaq:16:9",
    {
      params: [
        { kind: "splice", value: label, bindings: [] },
        {
          kind: "splice",
          value: cs.create(
            "1frijc9i1kpaq:18:17",
            { params: [{ kind: "capture", key: "Card$1frijc9i1kpaq$1" }] },
            '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $capture0 => (0, web_1.createComponent)($capture0, {\n    n: 1\n});\n}',
            '{"version":3,"file":"module.jsx","mappings":";;;;kBAiBoBA,SAAA,IAAAC,yBAAA,EAACD,SAAI;IAACE,CAAC,EAAE;CAAC,CAAI","names":["$capture0","_$createComponent","n"],"ignoreList":[],"sources":["captures/script-bound-tag-capture-shadow.test.tsx"]}',
            ["solid-js/web"],
          ),
          bindings: ["Card$1frijc9i1kpaq$1"],
        },
      ],
    },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<i>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<p>`);\nexports.default = ($splice0, $splice1) => {\n    const Card = props => (() => {\n        var _el$ = _tmpl$();\n        (0, web_2.insert)(_el$, () => $splice0() + props.n);\n        return _el$;\n    })();\n    return (() => {\n        var _el$2 = _tmpl$2();\n        (0, web_2.insert)(_el$2, () => $splice1(Card));\n        return _el$2;\n    })();\n};\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAeY,CAAAA,QAAA,EAAAC,QAAA;IACR,MAAMC,IAAI,GAAIC,KAAoB;QAAA,IAAAC,IAAA,GAAAC,MAAA;QAAAC,gBAAA,EAAAF,IAAA,QAASJ,QAAA,EAAM,GAAGG,KAAK,CAACI,CAAC;QAAA,OAAAH,IAAA;IAAA,IAAK;IAChE;QAAA,IAAAI,KAAA,GAAAC,OAAA;QAAAH,gBAAA,EAAAE,KAAA,QAAWP,QAAA,CAAAC,IAAA,CAAqB;QAAA,OAAAM,KAAA;IAAA;AAClC,CAAC","names":["$splice0","$splice1","Card","props","_el$","_tmpl$","_$insert","n","_el$2","_tmpl$2"],"ignoreList":[],"sources":["captures/script-bound-tag-capture-shadow.test.tsx"]}',
    ["solid-js/web"],
  );
}
it("scriptBoundTagCaptureShadow", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagCaptureShadow",
    cs.create(
      "1frijc9i1kpaq:26:4",
      {
        params: [
          {
            kind: "splice",
            value: labelled(
              cs.create(
                "1frijc9i1kpaq:28:18",
                { params: [] },
                '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => "a";\n}',
                '{"version":3,"file":"module.jsx","mappings":";;;kBA2BqB,SAAG","names":[],"ignoreList":[],"sources":["captures/script-bound-tag-capture-shadow.test.tsx"]}',
                [],
              ),
            ),
            bindings: [],
          },
          {
            kind: "splice",
            value: labelled(
              cs.create(
                "1frijc9i1kpaq:29:18",
                { params: [] },
                '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => "b";\n}',
                '{"version":3,"file":"module.jsx","mappings":";;;kBA4BqB,SAAG","names":[],"ignoreList":[],"sources":["captures/script-bound-tag-capture-shadow.test.tsx"]}',
                [],
              ),
            ),
            bindings: [],
          },
          { kind: "tag", value: Card },
        ],
      },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>`);\nexports.default = ($splice0, $splice1, $tag2) => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, (0, web_3.createComponent)($tag2, {\n        title: "host"\n    }), null);\n    (0, web_2.insert)(_el$, $splice0, null);\n    (0, web_2.insert)(_el$, $splice1, null);\n    return _el$;\n})();\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAyBO,CAAAA,QAAA,EAAAC,QAAA,EAAAC,KAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAAAG,yBAAA,EACAJ,KAAI;QAACK,KAAK;KAAA;IAAAF,gBAAA,EAAAF,IAAA,EACVH,QAAA;IAAAK,gBAAA,EAAAF,IAAA,EACAF,QAAA;IAAA,OAAAE,IAAA;AAAA,IACG","names":["$splice0","$splice1","$tag2","_el$","_tmpl$","_$insert","_$createComponent","title"],"ignoreList":[],"sources":["captures/script-bound-tag-capture-shadow.test.tsx"]}',
      ["solid-js/web"],
    ),
  );
});
// Which tag names a function the script holds is the scope rule every name
// follows. Inside the arrow, `Card` is its parameter; outside it, the same
// name is the host's component.
it("scriptBoundTagScope", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagScope",
    cs.create(
      "1frijc9i1kpaq:41:4",
      { params: [{ kind: "tag", value: Card }] },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<section>`), _tmpl$3 = /*#__PURE__*/ (0, web_1.template)(`<i>`);\nexports.default = $tag0 => {\n    const twice = Card => (() => {\n        var _el$ = _tmpl$();\n        (0, web_2.insert)(_el$, (0, web_3.createComponent)(Card, {\n            n: 1\n        }), null);\n        (0, web_2.insert)(_el$, (0, web_3.createComponent)(Card, {\n            n: 2\n        }), null);\n        return _el$;\n    })();\n    return (() => {\n        var _el$2 = _tmpl$2();\n        (0, web_2.insert)(_el$2, (0, web_3.createComponent)($tag0, {\n            title: "host"\n        }), null);\n        (0, web_2.insert)(_el$2, () => twice(props => (() => {\n            var _el$3 = _tmpl$3();\n            (0, web_2.insert)(_el$3, () => "row " + props.n);\n            return _el$3;\n        })()), null);\n        return _el$2;\n    })();\n};\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAwCOA,KAAA;IACD,MAAMC,KAAK,GAAIC,IAA2C;QAAA,IAAAC,IAAA,GAAAC,MAAA;QAAAC,gBAAA,EAAAF,IAAA,EAAAG,yBAAA,EAErDJ,IAAI;YAACK,CAAC,EAAE;SAAC;QAAAF,gBAAA,EAAAF,IAAA,EAAAG,yBAAA,EACTJ,IAAI;YAACK,CAAC,EAAE;SAAC;QAAA,OAAAJ,IAAA;IAAA,IAEb;IAED;QAAA,IAAAK,KAAA,GAAAC,OAAA;QAAAJ,gBAAA,EAAAG,KAAA,EAAAF,yBAAA,EAEKN,KAAI;YAACU,KAAK;SAAA;QAAAL,gBAAA,EAAAG,KAAA,QACVP,KAAK,CAAEU,KAAoB;YAAA,IAAAC,KAAA,GAAAC,OAAA;YAAAR,gBAAA,EAAAO,KAAA,QACtB,MAAM,GAAGD,KAAK,CAACJ,CAAC;YAAA,OAAAK,KAAA;QAAA,IACrB,CAAC;QAAA,OAAAJ,KAAA;IAAA;AAGR,CAAC","names":["$tag0","twice","Card","_el$","_tmpl$","_$insert","_$createComponent","n","_el$2","_tmpl$2","title","props","_el$3","_tmpl$3"],"ignoreList":[],"sources":["captures/script-bound-tag-capture-shadow.test.tsx"]}',
      ["solid-js/web"],
    ),
  );
});
