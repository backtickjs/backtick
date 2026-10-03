import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
// An object with storage of its own, made by a client function: a signal holds
// what it is, arrows are what may be done to it, and the object hands them over
// together. Reading is a value, so it stands in a children position; writing is
// an action, so it stands in a handler.
const counter = cs.create(
  "3niob7u7a1w55:10:16",
  { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => initial => {\n    const [count, setCount] = $splice0()(initial);\n    return {\n        get: () => count(),\n        add: n => {\n            setCount(count() + n);\n        }\n    };\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBASmBA,QAAA,IAACC,OAAe;IACjC,MAAM,CAACC,KAAK,EAAEC,QAAQ,CAAC,GAAGH,QAAA,EAAa,CAACC,OAAO,CAAC;IAChD,OAAO;QACLG,GAAG,EAAEA,GAAA,GAAMF,KAAK,EAAE;QAClBG,GAAG,EAAGC,CAAS;YACbH,QAAQ,CAACD,KAAK,EAAE,GAAGI,CAAC,CAAC;QACvB;KACD;AACH,CAAC","names":["$splice0","initial","count","setCount","get","add","n"],"ignoreList":[],"sources":["state/stateful-object.test.tsx"]}',
  [],
);
it("statefulObject", async (t) => {
  await snapshotCase(
    t,
    "statefulObject",
    cs.create(
      "3niob7u7a1w55:24:4",
      { params: [{ kind: "splice", value: counter, bindings: [] }] },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<button>`);\nexports.default = $splice0 => {\n    const c = $splice0()(10);\n    return (() => {\n        var _el$ = _tmpl$();\n        _el$.$$click = () => {\n            c.add(5);\n        };\n        (0, web_3.insert)(_el$, () => c.get());\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAuBOA,QAAA;IACD,MAAMC,CAAC,GAAGD,QAAA,EAAQ,CAAC,EAAE,CAAC;IACtB;QAAA,IAAAE,IAAA,GAAAC,MAAA;QAAAD,IAAA,CAAAE,OAAA,GAEa;YACPH,CAAC,CAACI,GAAG,CAAC,CAAC,CAAC;QACV,CAAC;QAAAC,gBAAA,EAAAJ,IAAA,QAEAD,CAAC,CAACM,GAAG,EAAE;QAAA,OAAAL,IAAA;IAAA;AAGd,CAAC","names":["$splice0","c","_el$","_tmpl$","$$click","add","_$insert","get"],"ignoreList":[],"sources":["state/stateful-object.test.tsx"]}',
      ["solid-js/web"],
    ),
  );
});
