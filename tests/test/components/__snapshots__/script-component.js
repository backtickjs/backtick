import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A component tag written inside a client script. `Card` is a name no scope in
// the script binds, so it splices as the host binding, and what a splice holds
// that is a function is its expansion: the component run once against one
// opaque hole for the argument it takes, with a field read off that hole
// wherever it read a prop. The tag is a call of it.
//
// Each prop goes as a thunk and the drawing calls it where it reads it, which
// is what keeps a prop a prop: an argument is evaluated once where it is
// passed, and a prop has to be re-read whenever what it names changes.
async function Card(props) {
  return _jsx("h2", { children: props.title });
}
async function Badge() {
  return _jsx("span", { children: "new" });
}
it("scriptComponent", async (t) => {
  await snapshotCase(
    t,
    "scriptComponent",
    cs.create(
      "2ielk672xspgd:27:4",
      {
        params: [
          { kind: "tag", value: Card },
          { kind: "tag", value: Badge },
        ],
      },
      {
        code: 'import { template as _$template } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div>`);\nexport default ($0, $1) => {\n  return (() => {\n    var _el$ = _tmpl$();\n    _$insert(_el$, _$createComponent($0, {\n      title: "totals"\n    }), null);\n    _$insert(_el$, _$createComponent($1, {}), null);\n    return _el$;\n  })();\n};',
        map: '{"version":3,"mappings":";;;;eA0BO,CAAAA,EAAA,EAAAC,EAAA;EACD;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,QAAA,CAAAF,IAAA,EAAAG,iBAAA,CAEKL,EAAI;MAACM,KAAK;IAAA;IAAAF,QAAA,CAAAF,IAAA,EAAAG,iBAAA,CACVJ,EAAK;IAAA,OAAAC,IAAA;EAAA;AAGZ,CAAC","names":["$0","$1","_el$","_tmpl$","_$insert","_$createComponent","title"],"ignoreList":[],"sources":["script-component.test.tsx"]}',
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
          {
            from: "solid-js/web",
            range: [106, 174],
            bindings: [{ name: "createComponent", local: "_$createComponent" }],
          },
        ],
        exportAt: 222,
      },
    ),
  );
});
