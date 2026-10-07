import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1ogam0l0oe8z0:37:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nconst web_4 = require("solid-js/web");\nconst web_5 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<div><img alt><span></span><span></span><span>`), _tmpl$3 = /*#__PURE__*/ (0, web_1.template)(`<span>`);\nexports.default = ($splice0, $splice1) => (() => {\n    var _el$ = _tmpl$();\n    (0, web_5.insert)(_el$, () => ($For => (0, web_4.createComponent)($For, {\n        get each() {\n            return $splice1();\n        },\n        children: order => (() => {\n            var _el$2 = _tmpl$2(), _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, _el$5 = _el$4.nextSibling, _el$6 = _el$5.nextSibling;\n            (0, web_5.insert)(_el$4, () => order.customer.name);\n            (0, web_5.insert)(_el$5, () => order.customer.city);\n            (0, web_5.insert)(_el$2, () => ($For => (0, web_4.createComponent)($For, {\n                get each() {\n                    return order.items;\n                },\n                children: item => (() => {\n                    var _el$7 = _tmpl$3();\n                    (0, web_5.insert)(_el$7, () => item.sku + " x" + item.qty);\n                    return _el$7;\n                })()\n            }))($splice0()), _el$6);\n            (0, web_5.insert)(_el$6, () => "$" + order.total);\n            (0, web_3.effect)(() => (0, web_2.setAttribute)(_el$3, "src", "https://img.example.com/" + order.id + ".png"));\n            return _el$2;\n        })()\n    }))($splice0()));\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;;;kBAoCO,CAAAA,QAAA,EAAAC,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QAEC,CAAAG,IAAA,IAAAC,yBAAA,EAACD,IAAI;QAAA,IAACE,IAAIA;YAAA,OAAEN,QAAA,EAAO;QAAA;QAAAO,QAAA,EACfC,KAAY;YAAA,IAAAC,KAAA,GAAAC,OAAA,IAAAC,KAAA,GAAAF,KAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAC,WAAA,EAAAE,KAAA,GAAAD,KAAA,CAAAD,WAAA;YAAAX,gBAAA,EAAAU,KAAA,QAMHL,KAAK,CAACS,QAAQ,CAACC,IAAI;YAAAf,gBAAA,EAAAY,KAAA,QACnBP,KAAK,CAACS,QAAQ,CAACE,IAAI;YAAAhB,gBAAA,EAAAM,KAAA,QAC1B,CAAAL,IAAA,IAAAC,yBAAA,EAACD,IAAI;gBAAA,IAACE,IAAIA;oBAAA,OAAEE,KAAK,CAACY,KAAK;gBAAA;gBAAAb,QAAA,EACnBc,IAAU;oBAAA,IAAAC,KAAA,GAAAC,OAAA;oBAAApB,gBAAA,EAAAmB,KAAA,QAAYD,IAAI,CAACG,GAAG,GAAG,IAAI,GAAGH,IAAI,CAACI,GAAG;oBAAA,OAAAH,KAAA;gBAAA;aAAQ,CACrD,EAFNvB,QAAA,EAAI,CAGL,EAAAiB,KAAA;YAAAb,gBAAA,EAAAa,KAAA,QAAO,GAAG,GAAGR,KAAK,CAACkB,KAAK;YAAAC,gBAAA,QAAAC,sBAAA,EAAAjB,KAAA,SARjB,0BAA0B,GAAGH,KAAK,CAACqB,EAAE,GAAG,MAAM;YAAA,OAAApB,KAAA;QAAA;KAUxD,CACI,EAfNV,QAAA,EAAI,CAgBP;IAAA,OAAAE,IAAA;AAAA,IACD","names":["$splice0","$splice1","_el$","_tmpl$","_$insert","$For","_$createComponent","each","children","order","_el$2","_tmpl$2","_el$3","firstChild","_el$4","nextSibling","_el$5","_el$6","customer","name","city","items","item","_el$7","_tmpl$3","sku","qty","total","_$effect","_$setAttribute","id"],"ignoreList":[],"sources":["jsx/large-data.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const orders = Array.from({ length: 5 }, (_, i) => ({
  id: `ord-${1000 + i}`,
  customer: {
    name: `Customer ${i}`,
    city: i % 2 === 0 ? "Montréal" : "Toronto",
  },
  items: [
    { sku: `SKU-${i}-A`, qty: (i % 3) + 1 },
    { sku: `SKU-${i}-B`, qty: 1 },
  ],
  total: 45.23 + i,
}));
// The dataset ships once and the list expands on the client: one card
// template with holes for each order's fields (and a nested item list),
// mapped at runtime. The bundle carries the data plus a single card, not five
// expanded copies. The root View stays static; only its children map on the
// client.
it("largeData", async (t) => {
  await snapshotCase(t, "largeData", cs.create($module0, [For, orders]));
});
